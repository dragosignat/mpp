from transformers import AutoTokenizer
from transformers import AutoModelForSequenceClassification
import pandas as pd
from scipy.special import softmax
from .dto import Reviews
from langchain_community.utilities import SQLDatabase
import os


MODEL = f"cardiffnlp/twitter-roberta-base-sentiment"
THRESHOLD = 0.5
DB_URL = os.getenv("DB_URL")

def polarity_scores_roberta(example):
    tokenizer = AutoTokenizer.from_pretrained(MODEL)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL)
    encoded_text = tokenizer(example, return_tensors='pt')
    output = model(**encoded_text)
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)
    scores_dict = {
        'neg' : scores[0],
        'neu' : scores[1],
        'pos' : scores[2]
    }
    return scores_dict


def analyze_sentiment(reviews: Reviews):
    # map the text to the sentiment
    df = pd.DataFrame(columns=["text", "sentiment"])
    df['text'] = reviews.reviews
    # get the sentiment scores
    df['scores'] = df['text'].apply(polarity_scores_roberta)
    # get the largest
    df['sentiment'] = df['scores'].apply(lambda x: max(x, key=x.get))
    return df

def write_review_to_db(review: str, sentiment: str, campaign_id: int, db: SQLDatabase):
    query = "INSERT INTO review (review, sentiment, campaign_id) VALUES (:review, :sentiment, :campaign_id)"
    db.run(query, parameters={"review": review, "sentiment": sentiment, "campaign_id": campaign_id}) 

def handle_sentiment(reviews: Reviews):
    try:
        db = SQLDatabase.from_uri(DB_URL, sample_rows_in_table_info=0)
        df = analyze_sentiment(reviews)

        # Go through the reviews and add them to the database with the sentiment
        df.apply(lambda x: write_review_to_db(x['text'], x['sentiment'], reviews.campaign_id, db), axis=1)

        db.run(f"UPDATE campaign SET is_processing = FALSE WHERE id = {reviews.campaign_id}")
        return {"status": "success"}
    except Exception as e:
        return {"status": "error", "message": str(e)}







