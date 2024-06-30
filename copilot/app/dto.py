from pydantic import BaseModel

class Reviews(BaseModel):
    campaign_id: int
    reviews: list[str]

