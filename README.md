# Akshay Patil — Portfolio (React + FastAPI + PostgreSQL + AI)

An animated, full-stack developer portfolio that doubles as a live demo of
your own stack: a React frontend with Framer Motion animations, a FastAPI +
PostgreSQL backend, and a Groq-powered AI assistant grounded on your resume
(the same "grounded generation" pattern as DocuChat AI).

## What's actually implemented right now

| Feature | Status | Where |
|---|---|---|
| Animated hero with a live "agent graph" signature (SVG + Framer Motion, echoes OrchestrAI) | ✅ built | `frontend/src/components/Hero.jsx` |
| About / Skills / Experience / Education sections, scroll-reveal animations | ✅ built | `frontend/src/components/{About,Skills,Experience}.jsx` |
| Projects grid — fetches `GET /api/projects`, falls back to static data if backend is offline | ✅ built | `frontend/src/components/Projects.jsx` + `backend/app/routers/projects.py` |
| Contact form — `POST /api/contact`, saves to PostgreSQL | ✅ built | `frontend/src/components/Contact.jsx` + `backend/app/routers/contact.py` |
| Floating AI chat widget — `POST /api/chat`, Groq LLM grounded on your resume, logs to PostgreSQL | ✅ built | `frontend/src/components/AIChatWidget.jsx` + `backend/app/routers/chat.py` + `backend/app/services/ai_service.py` |
| PostgreSQL tables: `contact_messages`, `chat_logs` (auto-created on backend startup) | ✅ built | `backend/app/db/models.py` |
| Docker Compose (Postgres + backend + frontend) | ✅ built | `docker-compose.yml` |
| Resume PDF download link | ⚠️ stub — drop your resume PDF into `frontend/public/Akshay_Patil_Resume.pdf` | `frontend/src/components/Hero.jsx` |
| Deployment (Render/Vercel/Neon) | 🔲 not done — see "Next steps" below | — |
| Alembic migrations (currently using `create_all` on startup) | 🔲 not done | — |

## Folder structure

```
akshay-portfolio/
├── backend/                         # FastAPI + PostgreSQL API
│   ├── app/
│   │   ├── main.py                  # FastAPI app, CORS, router wiring, /api/health
│   │   ├── config.py                # env-driven settings (pydantic-settings)
│   │   ├── schemas.py               # Pydantic request/response models
│   │   ├── resume_context.py        # grounding text fed to the AI assistant
│   │   ├── db/
│   │   │   ├── database.py          # async SQLAlchemy engine/session
│   │   │   └── models.py            # ContactMessage, ChatLog tables
│   │   ├── routers/
│   │   │   ├── contact.py           # POST /api/contact
│   │   │   ├── chat.py              # POST /api/chat
│   │   │   └── projects.py          # GET  /api/projects
│   │   └── services/
│   │       └── ai_service.py        # Groq call, grounded on resume_context.py
│   ├── requirements.txt
│   ├── .env.example                 # copy to .env and fill in GROQ_API_KEY
│   └── Dockerfile
│
├── frontend/                        # React + Vite + Tailwind + Framer Motion
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx             # signature animated agent-graph SVG
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx         # OrchestrAI, TaskFlow Agent, VoxShell, DocuChat AI
│   │   │   ├── Experience.jsx       # + education + certifications
│   │   │   ├── Contact.jsx
│   │   │   ├── AIChatWidget.jsx     # floating "ask about Akshay" chatbot
│   │   │   └── Footer.jsx
│   │   ├── data/
│   │   │   ├── projects.js          # static fallback for the Projects API
│   │   │   └── profile.js           # skills / experience / education content
│   │   ├── api/client.js            # axios instance + typed request helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css                # Tailwind + terminal-style theme tokens
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js               # dev proxy: /api -> http://localhost:8000
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml                # postgres (5434) + backend (8000) + frontend (5173)
├── .gitignore
└── README.md                         # you are here
```

## Design direction (why it looks the way it does)

Dark, terminal-inspired palette (`#0B0F14` base, signal green `#7CFFB2`,
amber `#FFB454`) with `JetBrains Mono` for headings and `Inter` for body
text — meant to read like a CLI/agent-dashboard, tying directly into
VoxShell and the OrchestrAI live dashboard rather than a generic template.
The hero's signature element is an animated 5-node graph modeled on
OrchestrAI's Supervisor → Resume Analyzer / Job Search / Tailoring →
Outreach pipeline, with pulsing "message" dots traveling along the edges.

## Local setup (matches your Windows / Python 3.12 / Postgres-5434 workflow)

**1. Database (Docker)**
```powershell
docker run -d --name portfolio-pg -p 5434:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=portfolio_db postgres:16
```

**2. Backend**
```powershell
cd backend
py -3.12 -m venv venv
venv\Scripts\activate
$env:TEMP = "S:\temp"; $env:TMP = "S:\temp"
python -m pip install -r requirements.txt
copy .env.example .env
# edit .env -> paste your real GROQ_API_KEY
python -m uvicorn app.main:app --reload
```
Backend runs at `http://localhost:8000` — check `http://localhost:8000/api/health`.

**3. Frontend**
```powershell
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173` and proxies `/api/*` to the backend.

**4. Or run everything with Docker Compose**
```powershell
docker compose up --build
```

## Next steps (recommended order)

1. Drop your resume PDF into `frontend/public/Akshay_Patil_Resume.pdf`.
2. Get a free Groq API key at console.groq.com and put it in `backend/.env`.
3. Swap `create_all` for Alembic migrations before deploying.
4. Deploy: backend + Postgres → Render/Neon (Docker), frontend → Vercel.
5. Optional: wire `AIChatWidget` up to a real vector store (pgvector) over
   your project READMEs instead of the fixed `resume_context.py` string —
   turns the assistant itself into a live DocuChat AI demo.
