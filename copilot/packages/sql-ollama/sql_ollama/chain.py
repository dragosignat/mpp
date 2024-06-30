from pathlib import Path
import os

from langchain.memory import ConversationBufferMemory
from langchain_community.chat_models import ChatOllama
from langchain_community.utilities import SQLDatabase
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.pydantic_v1 import BaseModel
from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from sqlalchemy import except_

# Add the LLM downloaded from Ollama
ollama_llm_model = "llama3"
llm = ChatOllama(model=ollama_llm_model, temperature=0)

DB_URL = os.getenv("DB_URL")
db = SQLDatabase.from_uri(DB_URL, sample_rows_in_table_info=0)

def get_schema(_):
    return db.get_table_info()


def run_query(query):
    # Run the query, and return the results, if the results are empty, return a no response message
    try:
        results = db.run(query)
        if not results:
            return "No response"
        return results
    except:
        return "No response"



SQL_SYSTEM_MESSAGE = """You are an agent designed to interact with a SQL database.
Given an input question, create a syntactically correct SQLite query to run, then look at the results of the query and return the answer.
Unless the user specifies a specific number of examples they wish to obtain, always limit your query to at most 5 results.
You can order the results by a relevant column to return the most interesting examples in the database.
Never query for all the columns from a specific table, only ask for the relevant columns given the question.
You have access to tools for interacting with the database.
Only use the below tools. Only use the information returned by the below tools to construct your final answer.
You MUST double check your query before executing it. If you get an error while executing a query, rewrite the query and try again.

DO NOT make any DML statements (INSERT, UPDATE, DELETE, DROP etc.) to the database.

To start you should ALWAYS look at the tables in the database to see what you can query.
Do NOT skip this step.
Then you should query the schema of the most relevant tables.
ONLY RETURN THE SQL QUERY, NOTHING ELSE, NO PRE-AMBLE, JUST THE SQL.
"""

# Prompt

template = """Based on the table schema below, write a SQL query that would answer the user's question:
{schema}

Question: {question}
SQL Query:"""  # noqa: E501
prompt = ChatPromptTemplate.from_messages(
    [
        # ("system", "Given an input question, convert it to a SQL query. No pre-amble."),
        ("system", SQL_SYSTEM_MESSAGE), 
        MessagesPlaceholder(variable_name="history"),
        ("human", template),
    ]
)

memory = ConversationBufferMemory(return_messages=True)

# Chain to query with memory

sql_chain = (
    RunnablePassthrough.assign(
        schema=get_schema,
        history=RunnableLambda(lambda x: memory.load_memory_variables(x)["history"]),
    )
    | prompt
    | llm.bind(stop=["\nSQLResult:"])
    | StrOutputParser()
)


def save(input_output):
    output = {"output": input_output.pop("output")}
    memory.save_context(input_output, output)
    return output["output"]


sql_response_memory = RunnablePassthrough.assign(output=sql_chain) | save

# Chain to answer
template = """Based on the table schema below, question, sql query, and sql response, write a natural language response, if the response if empty, write 'No response'. Please do not include any pre-amble, just the answer in a nice format with a simple explanation of the data, if 
nothing is after SQL Response, write 'No response'. DO NOT CREATE DATA THAT IS NOT IN THE RESPONSE. ONLY USE THE RESPONSE DATA.:
{schema}

Question: {question}
SQL Query: {query}
SQL Response: {response}"""  # noqa: E501
prompt_response = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "Given an input question and SQL response, convert it to a natural "
            "language answer. NO PRE-AMBLE. If the response is empty, write 'No response'. DO NOT UNDER ANY CIRCUMSTANCE HAVE A PRE-AMBLE, JUST THE ANSWER. DO NOT CREATE DATA THAT IS NOT IN THE RESPONSE. ONLY USE THE RESPONSE DATA.",
        ),
        ("human", template),
    ]
)


# Supply the input types to the prompt
class InputType(BaseModel):
    question: str


chain = (
    RunnablePassthrough.assign(query=sql_response_memory).with_types(
        input_type=InputType
    )
    | RunnablePassthrough.assign(
        schema=get_schema,
        # response=lambda x: db.run(x["query"]),
        response=lambda x : run_query(x["query"]),
    )
    | prompt_response
    | llm
)
