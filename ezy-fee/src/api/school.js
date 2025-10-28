import api from "./axios";

export const getAllSchools =  async () => {
    try {
        const response =  await api.get("/school/getSchools");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}