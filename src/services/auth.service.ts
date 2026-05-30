import axios from "axios";

export const login = async (
  email: string,
  password: string
) => {
  const response = await axios.post(
    "/api/auth/login",
    {
      email,
      password,
    }
  );

  return response.data;
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await axios.post(
    "/api/auth/register",
    {
      name,
      email,
      password,
    }
  );

  return response.data;
};


export async function logout() {
  const response = await axios.post(
    "/api/auth/logout"
  );

  return response.data;
}

