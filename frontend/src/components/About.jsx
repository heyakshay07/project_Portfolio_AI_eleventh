import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="px-6 max-w-4xl mx-auto py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="border-l-2 border-signal/40 pl-6"
      >
        <p className="eyebrow mb-3">about</p>
        <p className="text-lg text-ink leading-relaxed">
          I'm an AI/ML and Full Stack Developer based in Pune, India, with a
          full-stack engineering foundation (React, FastAPI) and a self-driven
          pivot into Generative and Agentic AI — RAG pipelines, autonomous
          single-agent systems, and multi-agent orchestration platforms.
        </p>
        <p className="mt-4 text-muted leading-relaxed">
          Every project on this site solves a real engineering problem I ran
          into: multi-agent state coordination, human-in-the-loop workflow
          design, async event-loop conflicts, and vector-store retrieval
          tuning. I hold an MCA from Sinhgad Institute and a Udemy
          certification in Full Stack Generative and Agentic AI with Python.
        </p>
      </motion.div>
    </section>
  );
}
