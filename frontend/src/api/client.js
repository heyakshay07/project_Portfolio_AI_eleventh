import axios from "axios";

// In development, Vite proxies /api to the local FastAPI server. In deployed
// builds, set VITE_API_URL to the Render service URL plus its /api prefix.
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

export const sendContactMessage = (payload) => client.post("/contact", payload);
export const sendChatMessage = (payload) => client.post("/chat", payload);
export const fetchProjects = () => client.get("/projects");

export default client;
