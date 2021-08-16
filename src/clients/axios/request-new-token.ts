import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Store } from "../../token-management/token-store";

const config = require('../../../config.js');
const querystring = require('querystring');


export const requestNewTokenAndRetry = async (instance: AxiosInstance, originalRequest: AxiosRequestConfig) : Promise<AxiosResponse> => {
    const res = await instance.post(`${config.identityUrl}/connect/token`, querystring.stringify
    ({
        "client_id": "graph",
        "client_secret": "fake_secret",
        "scope": "trip-api location-api",
        "grant_type": "client_credentials"
    }));

    if (res.status === 200) {
        Store.accessToken = res.data.access_token;

        return await instance(originalRequest);
    }
}