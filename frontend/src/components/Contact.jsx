import { useState } from "react";
import { motion } from "framer-motion";
import { sendContactMessage } from "../api/client.js";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendContactMessage(form);
      setStatus("sent");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="px-6 max-w-2xl mx-auto py-20">
      <p className="eyebrow mb-2">get in touch</p>
      <h2 className="section-heading text-2xl text-ink mb-2">Let's build something.</h2>
      <p className="text-muted mb-8 text-sm">
        Hiring, collaborating, or just want to talk agentic AI — drop a message.
      </p>

      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            required
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Your name"
            className="bg-panel border border-line rounded px-4 py-3 text-sm outline-none focus:border-signal transition-colors"
          />
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Your email"
            className="bg-panel border border-line rounded px-4 py-3 text-sm outline-none focus:border-signal transition-colors"
          />
        </div>
        <input
          name="subject"
          value={form.subject}
          onChange={onChange}
          placeholder="Subject (optional)"
          className="w-full bg-panel border border-line rounded px-4 py-3 text-sm outline-none focus:border-signal transition-colors"
        />
        <textarea
          required
          name="message"
          value={form.message}
          onChange={onChange}
          rows={5}
          placeholder="Message"
          className="w-full bg-panel border border-line rounded px-4 py-3 text-sm outline-none focus:border-signal transition-colors resize-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="font-display text-sm px-6 py-3 bg-signal text-base rounded font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === "sending" ? "sending…" : "send message →"}
        </button>

        {status === "sent" && (
          <p className="text-sm text-signal">Message sent — I'll reply soon.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-amber">
            Couldn't reach the server — email me directly at akshaypatil880537@gmail.com.
          </p>
        )}
      </motion.form>
    </section>
  );
}
