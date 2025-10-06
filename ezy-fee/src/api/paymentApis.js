import api from "./axios";

export const getLastDues =  async (data) => {
    try {
        const response =  await api.get(`/payment/getLastDues?nc=${data}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const paymentByNC =  async (data) => {
    try {
        const response =  await api.post("/payment/paymentByNC", data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getLastPayment =  async (data) => {
    try {
        const response =  await api.get(`/payment/getLastPayment?nc=${data}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getPaidMonths =  async (data) => {
    try {
        const response =  await api.get(`/payment/getPaidMonths?nc=${data}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}