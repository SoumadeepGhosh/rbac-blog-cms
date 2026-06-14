import axios from "axios";

export async function getDashboard() {
  const res = await axios.get("/api/dashboard");

  return res.data.data;
}