import type { NextApiRequest, NextApiResponse } from 'next';
import { Gateway } from '@services';

export default async (req: NextApiRequest, res: NextApiResponse):Promise<void> => {
    const gateway = new Gateway(req, res);

    return await gateway.axios.get(
        `/search`,
        {
            params: req.query
        }
    );
};