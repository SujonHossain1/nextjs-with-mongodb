import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'server/database';
import authenticated from 'server/middleware/authenticated';
import Person from 'server/models/person';

dbConnect();

const createPerson = authenticated(
    async (req: NextApiRequest, res: NextApiResponse) => {
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
        } else if (req.method === 'GET') {
            const persons = await Person.find({}).select({
                password: 0,
                __v: 0,
            });
            res.status(200).json({
                success: true,
                data: {
                    persons,
                },
                message: '',
            });
        } else {
            res.status(404).json({
                message: '404, Not Found',
            });
        }
    }
);

export default createPerson;
