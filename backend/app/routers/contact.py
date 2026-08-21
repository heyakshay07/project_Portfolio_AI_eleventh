from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_db
from app.db.models import ContactMessage
from app.schemas import ContactCreate, ContactOut

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("", response_model=ContactOut)
async def submit_contact(payload: ContactCreate, db: AsyncSession = Depends(get_db)):
    entry = ContactMessage(
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
    )
    db.add(entry)
    await db.commit()
    await db.refresh(entry)
    return ContactOut(id=str(entry.id))
