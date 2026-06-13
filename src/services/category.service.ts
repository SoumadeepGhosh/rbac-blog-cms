import axios from "axios";

export async function getCategories(
  page = 1,
  search = ""
) {
  const res = await axios.get(
    `/api/categories?page=${page}&limit=10&search=${search}`
  );

  return res.data.data;
}

export async function getCategory(
  id: string
) {
  const res = await axios.get(
    `/api/categories/${id}`
  );

  return res.data.data;
}

export async function createCategory(
  data: {
    name: string;
    slug: string;
    description?: string;
  }
) {
  const res = await axios.post(
    "/api/categories",
    data
  );

  return res.data;
}

export async function updateCategory(
  id: string,
  data: unknown
) {
  const res = await axios.put(
    `/api/categories/${id}`,
    data
  );

  return res.data;
}

export async function deleteCategory(
  id: string
) {
  const res = await axios.delete(
    `/api/categories/${id}`
  );

  return res.data;
}