import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse
} from 'axios';
import merge from 'deepmerge';
import { NextApiRequest, NextApiResponse } from 'next';

import ExceptionHandler from '../exception-handler';

interface IParams {
    [key: string]: string;
}

export const paramsSerializer = (params: IParams): string => {
    let result = '';
    Object.keys(params).forEach(key => {
        result += `${key}=${encodeURIComponent(params[key])}&`;
    });
    return result.substr(0, result.length - 1);
};

const DEFAULT_AXIOS_CONFIG: AxiosRequestConfig = {
    baseURL: process.env.CHUCK_NORRIS_API_URL,
    timeout: 10000,
    paramsSerializer
};

class Gateway {
    public axios: AxiosInstance;

    constructor(
        req: NextApiRequest,
        res: NextApiResponse,
        config: AxiosRequestConfig = {}
    ) {
        this.axios = axios.create({
            ...merge(DEFAULT_AXIOS_CONFIG, config)
        });

        /* istanbul ignore next -- Interceptor available only in a real request */
        this.axios.interceptors.response.use((response: AxiosResponse) => {
            response.data.result = response.data.result.slice(0,2500);
            res.json(response.data);
            return response;
        },(error: AxiosError) => {
            ExceptionHandler.execute(req, res, error);
        });
    }
}

export default Gateway;