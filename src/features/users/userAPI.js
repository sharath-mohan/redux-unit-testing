import { axiosConfig } from "../../config/config";

function fetchUsers() {
  return axiosConfig.get("/users");
}
export const userAPI = { fetchUsers };
