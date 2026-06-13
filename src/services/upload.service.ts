import axios from "axios";

export async function uploadImage(
  file: File
) {
  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const res =
    await axios.post(
      "/api/upload",
      formData
    );

  return res.data.data;
}