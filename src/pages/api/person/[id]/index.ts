import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'server/database';
import Person from 'server/models/person';

dbConnect();

const handleSinglePerson = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { method, query } = req;
    const { id } = query;

    if (method === 'GET') {
        try {
            const person = await Person.findById(id);
            return res.status(200).json({
                success: true,
                data: person,
                message: '',
            });
        } catch (error) {
            const { message } = error as Error;
            return res.status(400).json({
                success: false,
                data: null,
                message: message,
            });
        }
    } else {
        return res.status(404).json({
            success: false,
            data: null,
            message: '404, Not Found',
        });
    }
};

export default handleSinglePerson;
