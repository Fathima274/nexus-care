import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const register = async ({ name, email, password }) => {
  const res = await axios.post(`${API}/auth/register`, { name, email, password });
  return res.data;
};

export const login = async ({ email, password }) => {
  const res = await axios.post(`${API}/auth/login`, { email, password });
  return res.data;
};

export const saveToken = (token) => localStorage.setItem("nc_token", token);
export const getToken = () => localStorage.getItem("nc_token");
export const saveUser = (user) => localStorage.setItem("nc_user", JSON.stringify(user));
export const getUser = () => JSON.parse(localStorage.getItem("nc_user") || "null");
export const logout = () => { localStorage.removeItem("nc_token"); localStorage.removeItem("nc_user"); };
