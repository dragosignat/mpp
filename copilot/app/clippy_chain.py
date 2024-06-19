
from langchain_community.chat_models import ChatOllama
from langchain_community.tools.sql_database.tool import QuerySQLCheckerTool, QuerySQLDataBaseTool
from langchain_community.utilities import SQLDatabase
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.pydantic_v1 import BaseModel
from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from langchain.memory import ConversationBufferMemory
from langchain_core.messages import SystemMessage
from langchain_community.agent_toolkits import SQLDatabaseToolkit
from langchain_core.messages import HumanMessage
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
import os

# Use the LLM downloaded from Ollama
ollama_llm = "llama3"
# llm = ChatOllama(model=ollama_llm)
llm = ChatOpenAI(
    api_key="ollama",
    model="llama3",
    temperature=0,
    base_url="http://localhost:11434/v1",
)

# Handle the database connection
DB_URL = os.getenv("DB_URL")
db_conn = SQLDatabase.from_uri(DB_URL, sample_rows_in_table_info=0)


toolkit = SQLDatabaseToolkit(db=db_conn, llm=llm)

tools = toolkit.get_tools()


SQL_PREFIX = """You are an agent designed to interact with a SQL database.
Given an input question, create a syntactically correct PostgreSQL query to run, then look at the results of the query and return the answer.
Unless the user specifies a specific number of examples they wish to obtain, always limit your query to at most 5 results.
You can order the results by a relevant column to return the most interesting examples in the database.
Never query for all the columns from a specific table, only ask for the relevant columns given the question.
You have access to tools for interacting with the database.
Only use the below tools. Only use the information returned by the below tools to construct your final answer.
You MUST double check your query before executing it. If you get an error while executing a query, rewrite the query and try again.

DO NOT make any DML statements (INSERT, UPDATE, DELETE, DROP etc.) to the database.

To start you should ALWAYS look at the tables in the database to see what you can query.
Do NOT skip this step.
Then you should query the schema of the most relevant tables."""

system_message = SystemMessage(content=SQL_PREFIX)

agent_executor = create_react_agent(llm, tools, messages_modifier=system_message)

