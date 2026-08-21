import { motion } from "framer-motion";
import { skillGroups } from "../data/profile.js";

export default function Skills() {
  return (
    <section id="skills" className="px-6 max-w-6xl mx-auto py-16">
      <p className="eyebrow mb-2">stack</p>
      <h2 className="section-heading text-2xl text-ink mb-10">What I build with</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="border border-line rounded-lg p-5 bg-panel/40"
          >
            <p className="font-display text-xs text-amber mb-3">{group.label}</p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-xs font-display px-2 py-1 rounded border border-line text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
