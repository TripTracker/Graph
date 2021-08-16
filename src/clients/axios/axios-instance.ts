import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import { Store } from "../../token-management/token-store";
import { handleFailedRequest } from "./handle-failed-requests";

const instance: AxiosInstance = axios.create();

instance.interceptors.request.use(config => {
    const token = Store.accessToken;
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
},
error => {
    Promise.reject(error)
});

instance.interceptors.response.use((response: AxiosResponse) => {
    return response
 }, 
 async (error: AxiosError) => {
    return await handleFailedRequest(instance, error);
});

export default instance;

