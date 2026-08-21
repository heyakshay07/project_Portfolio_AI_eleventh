import { motion } from "framer-motion";
import { experience, education, certifications } from "../data/profile.js";

export default function Experience() {
  return (
    <section id="experience" className="px-6 max-w-4xl mx-auto py-16">
      <p className="eyebrow mb-2">career</p>
      <h2 className="section-heading text-2xl text-ink mb-10">Experience</h2>

      <div className="space-y-10">
        {experience.map((job, i) => (
          <motion.div
            key={job.role}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="grid sm:grid-cols-[140px_1fr] gap-4"
          >
            <p className="font-display text-xs text-muted">{job.period}</p>
            <div>
              <h3 className="font-display text-ink">{job.role}</h3>
              <p className="text-sm text-signal mb-3">
                {job.org} · {job.type}
              </p>
              <ul className="space-y-1.5">
                {job.points.map((pt) => (
                  <li key={pt} className="text-sm text-muted leading-relaxed">
                    — {pt}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 grid sm:grid-cols-2 gap-10">
        <div>
          <p className="eyebrow mb-3">education</p>
          <ul className="space-y-3">
            {education.map((e) => (
              <li key={e.degree}>
                <p className="text-ink text-sm font-medium">{e.degree}</p>
                <p className="text-xs text-muted">{e.school} · {e.period}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">certifications</p>
          <ul className="space-y-2">
            {certifications.map((c) => (
              <li key={c} className="text-sm text-muted">— {c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
