from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.db.models import ChatLog
from app.schemas import ChatRequest, ChatResponse
from app.services.ai_service import get_ai_reply

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
async def chat(payload: ChatRequest, db: AsyncSession = Depends(get_db)):
    reply = await get_ai_reply(payload.session_id, payload.message)

    db.add(ChatLog(session_id=payload.session_id, role="user", content=payload.message))
    db.add(ChatLog(session_id=payload.session_id, role="assistant", content=reply))
    await db.commit()

    return ChatResponse(reply=reply)
