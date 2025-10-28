import api from "./axios";

export const getAllSchools =  async () => {
    try {
        const response =  await api.get("/school/getSchools");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const addNewSchool =  async (payload) => {
    try {
        const response =  await api.post("/school/addSchool", payload);
        return response.data;
    } catch(error) {
        return error.response.data;
    }
}