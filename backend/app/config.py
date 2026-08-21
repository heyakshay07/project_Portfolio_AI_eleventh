"""
Central app configuration.
All secrets come from environment variables (.env) — never hardcoded.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # --- App ---
    APP_NAME: str = "Akshay Patil Portfolio API"
    ENV: str = "development"
    FRONTEND_ORIGIN: str = "http://localhost:5173"

    # --- Database (Postgres) ---
    # Local dev default matches your existing Docker convention (5434 free port).
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5434/portfolio_db"

    # --- AI (Groq) ---
    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "openai/gpt-oss-120b"

    # --- Contact form (optional email relay) ---
    CONTACT_NOTIFY_EMAIL: str = "akshaypatil880537@gmail.com"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
