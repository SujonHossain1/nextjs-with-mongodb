import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'server/database';
import Person from 'server/models/person';

dbConnect();

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const person = await Person.create(req.body);
            return res.status(201).json({
                success: true,
                data: person,
                message: 'user create successfully.',
            });
        } catch (error) {
            const { message } = error as Error;
            return res.status(201).json({
                success: true,
                data: null,
                message,
            });
        }
    } else {
        return res.status(404).json({
            message: '404, Page Not Found',
        });
    }
};

export default signup;
