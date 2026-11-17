import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchProjects } from "../api/client.js";
import { projects as fallbackProjects } from "../data/projects.js";

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    fetchProjects()
      .then((res) => setProjects(res.data))
      .catch(() => setProjects(fallbackProjects)); // backend offline — keep static data
  }, []);

  return (
    <section id="work" className="px-6 max-w-6xl mx-auto py-16">
      <p className="eyebrow mb-2">selected work</p>
      <h2 className="section-heading text-2xl text-ink mb-10">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ borderColor: "#7CFFB2" }}
            className="border border-line rounded-lg p-6 bg-panel/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-lg text-ink">{p.title}</h3>
              <div className="flex shrink-0 gap-3">
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-display text-signal hover:underline"
                  >
                    live ↗
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-display text-signal hover:underline"
                  >
                    code ↗
                  </a>
                )}
              </div>
            </div>
            <p className="text-sm text-muted mt-1">{p.tagline}</p>
            <ul className="mt-4 space-y-1.5">
              {p.highlights.map((h) => (
                <li key={h} className="text-sm text-ink/80 flex gap-2">
                  <span className="text-signal">▸</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="text-[11px] font-display px-2 py-0.5 rounded border border-line/70 text-muted">
                  {s}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
