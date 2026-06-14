import axios from "axios";

export async function getSettings() {
  const res = await axios.get(
    "/api/settings",
  );

  return res.data.data;
}

export async function updateSettings(data: {
  name: string;
  email: string;
  avatar?: string;
}) {
  const res = await axios.put(
    "/api/settings",
    data,
  );

  return res.data;
}

export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  const res = await axios.put(
    "/api/settings/password",
    data,
  );

  return res.data;
}

export async function logoutAllDevices() {
  const res = await axios.post(
    "/api/settings/logout-all",
  );

  return res.data;
}

export async function deleteAccount() {
  const res = await axios.delete(
    "/api/settings/account",
  );

  return res.data;
}