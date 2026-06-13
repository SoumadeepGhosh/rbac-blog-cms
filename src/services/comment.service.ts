import axios from "axios";

export async function getComments(page = 1, search = "") {
  const res = await axios.get("/api/comments", {
    params: {
      page,
      limit: 10,
      search,
    },
  });

  return res.data.data;
}

export async function updateComment(
  id: string,
  data: {
    isApproved: boolean;
  },
) {
  const res = await axios.put(`/api/comments/${id}`, data);

  return res.data;
}

export async function deleteComment(id: string) {
  const res = await axios.delete(`/api/comments/${id}`);

  return res.data;
}
