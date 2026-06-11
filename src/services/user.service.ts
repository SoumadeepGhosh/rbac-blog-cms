import axios from "axios";

export async function getCurrentUser() {
  const response = await axios.get("/api/me");

  return response.data.data;
}

export async function getUsers(
  page = 1,
  search = ""
) {
  const res = await axios.get("/api/users", {
    params: {
      page,
      limit: 10,
      search,
    },
  });

  return res.data.data;
}

export async function getUser(id: string) {
  const res = await axios.get(`/api/users/${id}`);

  return res.data.data;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  roleId: string;
}) {
  const res = await axios.post("/api/users", data);

  return res.data;
}

export async function updateUser(id: string, data: unknown) {
  const res = await axios.put(`/api/users/${id}`, data);

  return res.data;
}

export async function deleteUser(id: string) {
  const res = await axios.delete(`/api/users/${id}`);

  return res.data;
}

