import axios from "axios";

export async function getCurrentUser() {
  const response = await axios.get("/api/me");

  return response.data.data;
}