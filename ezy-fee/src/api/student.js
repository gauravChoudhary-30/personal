import api from "./axios";

export const getStudentByNC =  async (data) => {
    try {
        const response =  await api.get(`/student/getStudentByNC?nc=${data}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getAllStudents =  async () => {
    try {
        const response =  await api.get("/student/getAllStudents");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}