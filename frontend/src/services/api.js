import axios from "axios";

export const getUsers = () => axios.get("/api/users");
export const deleteUser = (id) => axios.delete(`/api/users/${id}`);
