"""
Thin wrapper around the Groq chat completion API, grounded with Akshay's
resume context so the portfolio's AI widget answers accurately about him.
"""
from groq import AsyncGroq

from app.config import settings
from app.resume_context import RESUME_CONTEXT

_client = AsyncGroq(api_key=settings.GROQ_API_KEY)

# Keep a short rolling history per session in memory (swap for Redis/DB if you
# need multi-instance / multi-worker consistency).
_session_history: dict[str, list[dict]] = {}
_MAX_TURNS = 6


async def get_ai_reply(session_id: str, user_message: str) -> str:
    history = _session_history.setdefault(session_id, [])
    history.append({"role": "user", "content": user_message})

    messages = [{"role": "system", "content": RESUME_CONTEXT}] + history[-_MAX_TURNS:]

    completion = await _client.chat.completions.create(
        model=settings.GROQ_MODEL,
        messages=messages,
        temperature=0.4,
        max_tokens=400,
    )
    reply = completion.choices[0].message.content.strip()

    history.append({"role": "assistant", "content": reply})
    _session_history[session_id] = history[-(_MAX_TURNS * 2):]
    return reply
