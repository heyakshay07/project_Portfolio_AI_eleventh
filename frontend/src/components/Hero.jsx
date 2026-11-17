import { motion } from "framer-motion";

const AGENTS = [
  { id: "supervisor", label: "Supervisor", cx: 210, cy: 60, color: "#7CFFB2" },
  { id: "resume", label: "Resume Analyzer", cx: 70, cy: 150, color: "#FFB454" },
  { id: "search", label: "Job Search", cx: 210, cy: 180, color: "#7CFFB2" },
  { id: "tailor", label: "Tailoring", cx: 350, cy: 150, color: "#FFB454" },
  { id: "outreach", label: "Outreach", cx: 210, cy: 300, color: "#7CFFB2" },
];

const EDGES = [
  ["supervisor", "resume"],
  ["supervisor", "search"],
  ["supervisor", "tailor"],
  ["search", "outreach"],
  ["tailor", "outreach"],
];

const byId = Object.fromEntries(AGENTS.map((a) => [a.id, a]));

export default function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-24 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="eyebrow mb-4">AI/ML · Agentic AI · Full Stack</p>
        <h1 className="section-heading text-4xl sm:text-5xl leading-tight text-ink">
          Akshay Patil builds
          <br />
          systems that <span className="text-signal">reason</span>,
          <br />
          not just respond.
        </h1>
        <p className="mt-6 text-muted max-w-md leading-relaxed">
          I design and ship RAG pipelines, ReAct agents, and multi-agent
          orchestration platforms — grounded in production-ready FastAPI
          backends, PostgreSQL, and React frontends. Currently building
          AI-ML systems at Hexaweb Solutions, Pune.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#work"
            className="font-display text-sm px-5 py-2.5 bg-signal text-base rounded font-medium hover:opacity-90 transition-opacity"
          >
            view work →
          </a>
          <a
            href="/Akshay_Patil_Resume.pdf"
            className="font-display text-sm px-5 py-2.5 border border-line text-ink rounded hover:border-signal/50 transition-colors"
          >
            download résumé
          </a>
          <a
            href="/Akshay_Patil_Cover_Letter.pdf"
            download
            className="font-display text-sm px-5 py-2.5 border border-line text-ink rounded hover:border-signal/50 transition-colors"
          >
            download cover letter
          </a>
        </div>
      </motion.div>

      {/* Signature element: animated agent-orchestration graph, echoing OrchestrAI's
          live React Flow dashboard — the active node pulses like a running agent. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative rounded-lg border border-line bg-panel/60 p-4"
      >
        <p className="eyebrow mb-2 px-2">live://agent-graph</p>
        <svg viewBox="0 0 420 340" className="w-full h-auto">
          {EDGES.map(([from, to], i) => {
            const a = byId[from];
            const b = byId[to];
            return (
              <motion.line
                key={i}
                x1={a.cx}
                y1={a.cy}
                x2={b.cx}
                y2={b.cy}
                stroke="#1E2833"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
              />
            );
          })}
          {EDGES.map(([from, to], i) => {
            const a = byId[from];
            const b = byId[to];
            return (
              <motion.circle
                key={`pulse-${i}`}
                r="3"
                fill="#7CFFB2"
                initial={{ opacity: 0 }}
                animate={{
                  cx: [a.cx, b.cx],
                  cy: [a.cy, b.cy],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              />
            );
          })}
          {AGENTS.map((a, i) => (
            <g key={a.id}>
              <motion.circle
                cx={a.cx}
                cy={a.cy}
                r="26"
                fill="#111820"
                stroke={a.color}
                strokeWidth="1.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
              <motion.circle
                cx={a.cx}
                cy={a.cy}
                r="26"
                fill="none"
                stroke={a.color}
                strokeWidth="1.5"
                animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.3, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
              />
              <text
                x={a.cx}
                y={a.cy + 42}
                textAnchor="middle"
                fill="#8B9AAB"
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
              >
                {a.label}
              </text>
            </g>
          ))}
        </svg>
      </motion.div>
    </section>
  );
}
