import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sendChatMessage } from "../api/client.js";

const SESSION_KEY = "portfolio_session_id";

function getSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey! I'm Akshay's portfolio assistant. Ask me about his projects, stack, or experience." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await sendChatMessage({ session_id: getSessionId(), message: text });
      setMessages((m) => [...m, { role: "assistant", content: res.data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "The AI backend isn't reachable right now — try the Contact form instead." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-80 sm:w-96 h-[26rem] bg-panel border border-line rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-line flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
              <p className="font-display text-xs text-ink">ai-assistant · grounded on résumé</p>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`text-sm leading-relaxed max-w-[85%] px-3 py-2 rounded-lg ${
                    m.role === "user"
                      ? "ml-auto bg-signal/15 text-ink"
                      : "bg-base border border-line text-muted"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && <p className="text-xs text-muted font-display">thinking…</p>}
            </div>
            <div className="p-3 border-t border-line flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about a project, stack…"
                className="flex-1 bg-base border border-line rounded px-3 py-2 text-sm outline-none focus:border-signal transition-colors"
              />
              <button
                onClick={send}
                className="font-display text-xs px-3 py-2 bg-signal text-base rounded font-medium hover:opacity-90 transition-opacity"
              >
                send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-full bg-signal text-base flex items-center justify-center shadow-lg font-display text-xs"
      >
        {open ? "✕" : "AI"}
      </motion.button>
    </div>
  );
}
