import { jwtDecode } from "jwt-decode";

export const getUserId = () => {
  try {
    const token = localStorage.getItem("token");
    const { role, _id } = jwtDecode(token);

    return { _id, role };
  } catch (error) {
    return {
      _id: false,
    };
  }
};
