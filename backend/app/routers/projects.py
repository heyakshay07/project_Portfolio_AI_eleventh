from fastapi import APIRouter

from app.schemas import ProjectOut

router = APIRouter(prefix="/api/projects", tags=["projects"])

PROJECTS: list[ProjectOut] = [
    ProjectOut(
        slug="orchestrai",
        title="OrchestrAI",
        tagline="Multi-agent autonomous job application system",
        stack=["LangGraph", "FastAPI", "Groq", "PostgreSQL+pgvector", "Redis", "Celery", "React Flow"],
        highlights=[
            "5-agent LangGraph supervisor pattern with shared state & checkpointing",
            "Human-in-the-loop approval gates before outreach actions",
            "Live React Flow dashboard visualizing agent orchestration",
        ],
        github="https://github.com/heyakshay07",
    ),
    ProjectOut(
        slug="taskflow-agent",
        title="TaskFlow Agent",
        tagline="Autonomous single-agent system with a ReAct loop",
        stack=["LangGraph", "FastAPI", "Groq function-calling", "PostgreSQL", "React", "WebSockets"],
        highlights=[
            "ReAct (Reason-Act-Observe) loop with tool orchestration",
            "Live WebSocket streaming of agent thoughts/actions",
            "Postgres-backed run persistence for resumable execution",
        ],
        github="https://github.com/heyakshay07",
    ),
    ProjectOut(
        slug="voxshell",
        title="VoxShell",
        tagline="JWT-authenticated voice assistant CLI",
        stack=["FastAPI", "Groq Whisper", "Groq LLM", "Edge-TTS", "PostgreSQL", "JWT"],
        highlights=[
            "Fully spoken Q&A from the terminal (STT -> LLM -> TTS)",
            "Per-user, multi-turn conversation history in PostgreSQL",
            "Secure JWT auth protecting all voice endpoints",
        ],
        github="https://github.com/heyakshay07",
    ),
    ProjectOut(
        slug="docuchat-ai",
        title="DocuChat AI",
        tagline="RAG-based document Q&A",
        stack=["FastAPI", "PostgreSQL+pgvector", "Groq LLaMA-3.3-70B", "React"],
        highlights=[
            "Grounded Q&A over uploaded PDFs/DOCX with source citations",
            "Embeddings + pgvector similarity search for retrieval",
            "Streaming responses in a chat UI",
        ],
        github="https://github.com/heyakshay07",
    ),
]


@router.get("", response_model=list[ProjectOut])
async def list_projects():
    return PROJECTS
