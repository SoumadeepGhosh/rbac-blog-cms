import axios from "axios";

export async function getPermissions() {
  const res = await axios.get(
    "/api/permissions"
  );

  return res.data.data;
}