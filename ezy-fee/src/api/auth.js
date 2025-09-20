import api from "./axios";


export const login = async (data) => {
  try {
    console.log(data);
    const response = await api.post('/auth/sign-in', data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}