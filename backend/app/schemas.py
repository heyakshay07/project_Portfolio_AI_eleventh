from pydantic import BaseModel, EmailStr, Field


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    subject: str = Field(default="", max_length=200)
    message: str = Field(min_length=1, max_length=4000)


class ContactOut(BaseModel):
    id: str
    status: str = "received"


class ChatRequest(BaseModel):
    session_id: str
    message: str = Field(min_length=1, max_length=2000)


class ChatResponse(BaseModel):
    reply: str


class ProjectOut(BaseModel):
    slug: str
    title: str
    tagline: str
    stack: list[str]
    highlights: list[str]
    github: str | None = None
    demo: str | None = None
