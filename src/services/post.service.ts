import axios from "axios";

export async function getPosts(
  page = 1,
  search = ""
) {
  const res = await axios.get(
    `/api/posts?page=${page}&limit=10&search=${search}`
  );

  return res.data.data;
}

export async function getPost(
  id: string
) {
  const res = await axios.get(
    `/api/posts/${id}`
  );

  return res.data.data;
}

export async function createPost(
  data: unknown
) {
  const res = await axios.post(
    "/api/posts",
    data
  );

  return res.data;
}

export async function updatePost(
  id: string,
  data: unknown
) {
  const res = await axios.put(
    `/api/posts/${id}`,
    data
  );

  return res.data;
}

export async function deletePost(
  id: string
) {
  const res = await axios.delete(
    `/api/posts/${id}`
  );

  return res.data;
}
