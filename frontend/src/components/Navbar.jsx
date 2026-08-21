import { motion } from "framer-motion";

const links = [
  { href: "#work", label: "work" },
  { href: "#skills", label: "skills" },
  { href: "#experience", label: "experience" },
  { href: "#contact", label: "contact" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 inset-x-0 z-40 border-b border-line/60 bg-base/80 backdrop-blur-md"
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-sm text-ink flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-signal node-dot animate-pulse" />
          akshay<span className="text-signal">.</span>patil
        </a>
        <ul className="hidden sm:flex items-center gap-8 font-display text-xs text-muted">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-signal transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="mailto:akshaypatil880537@gmail.com"
          className="font-display text-xs px-3 py-1.5 border border-signal/40 text-signal rounded hover:bg-signal/10 transition-colors"
        >
          say hi ↗
        </a>
      </nav>
    </motion.header>
  );
}
