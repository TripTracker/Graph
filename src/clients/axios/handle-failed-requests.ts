import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { requestNewTokenAndRetry } from "./request-new-token";

export const handleFailedRequest = async (instance: AxiosInstance, error: AxiosError): Promise<AxiosResponse> => {
    if (error.response.status === 401) { 
        return await requestNewTokenAndRetry(instance, error.config);
    } else{ 
        console.error('Request failed');
        return Promise.reject();
    };
}


