import axios from "axios";

export async function getRoles(
  page = 1,
  search = ""
) {
  const res = await axios.get(
    `/api/roles?page=${page}&limit=10&search=${search}`
  );

  return res.data.data;
}

export async function getRole(
  id: string
) {
  const res = await axios.get(
    `/api/roles/${id}`
  );

  return res.data.data;
}

export async function createRole(data: {
  name: string;
  slug: string;
  description?: string;
  permissionIds: string[];
}) {
  const res = await axios.post(
    "/api/roles",
    data
  );

  return res.data;
}

export async function updateRole(
  id: string,
  data: unknown
) {
  const res = await axios.put(
    `/api/roles/${id}`,
    data
  );

  return res.data;
}

export async function deleteRole(
  id: string
) {
  const res = await axios.delete(
    `/api/roles/${id}`
  );

  return res.data;
}