import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // use your ngrok link if testing online
});

export const getPizzas = () => API.get("/pizza");
