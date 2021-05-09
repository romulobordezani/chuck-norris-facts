import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse):Promise<void> => {
    const { query } = req.query;
    const outerRequest = await axios.get(`${process.env.CHUCK_NORRIS_API_URL}/search?query=${query}`);
    res.status(outerRequest.status).json(outerRequest.data);
};