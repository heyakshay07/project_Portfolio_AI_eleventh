import axios from "axios";

// In dev, Vite proxies /api -> http://localhost:8000 (see vite.config.js)
const client = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export const sendContactMessage = (payload) => client.post("/contact", payload);
export const sendChatMessage = (payload) => client.post("/chat", payload);
export const fetchProjects = () => client.get("/projects");

export default client;
