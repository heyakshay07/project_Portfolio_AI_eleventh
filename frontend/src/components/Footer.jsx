export default function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-line mt-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-display text-muted">
        <p>© {new Date().getFullYear()} Akshay Rajendra Patil — built with React + FastAPI + PostgreSQL</p>
        <div className="flex gap-4">
          <a href="https://github.com/heyakshay07" target="_blank" rel="noreferrer" className="hover:text-signal">
            github
          </a>
          <a href="https://linkedin.com/in/akshay-patil" target="_blank" rel="noreferrer" className="hover:text-signal">
            linkedin
          </a>
          <a href="mailto:akshaypatil880537@gmail.com" className="hover:text-signal">
            email
          </a>
        </div>
      </div>
    </footer>
  );
}
