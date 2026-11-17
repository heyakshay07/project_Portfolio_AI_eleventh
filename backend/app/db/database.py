"""
Async SQLAlchemy engine + session dependency for PostgreSQL.
"""
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.engine import make_url
from sqlalchemy.orm import DeclarativeBase

from app.config import settings

database_url = make_url(settings.DATABASE_URL)
if database_url.drivername in {
    "postgres",
    "postgresql",
    "postgresql+psycopg",
    "postgresql+psycopg2",
}:
    database_url = database_url.set(drivername="postgresql+asyncpg")

engine = create_async_engine(database_url, echo=False, future=True)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)


class Base(DeclarativeBase):
    pass


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


async def init_db():
    """Create tables on startup (swap for Alembic migrations in production)."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
