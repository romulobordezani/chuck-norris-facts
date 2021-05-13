import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse
} from 'axios';
import merge from 'deepmerge';
import { NextApiRequest, NextApiResponse } from 'next';

import ExceptionHandler from '../exception-handler';

const DEFAULT_AXIOS_CONFIG: AxiosRequestConfig = {
    baseURL: process.env.CHUCK_NORRIS_API_URL,
    timeout: 30000
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
            res.json(response.data);
            return response;
        },(error: AxiosError) => {
            ExceptionHandler.execute(req, res, error);
        });
    }
}

export default Gateway;