import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'server/database';
import Person from 'server/models/person';

dbConnect();

const getPersons = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET': {
            try {
                const person = await Person.find({});
                return res.status(200).json({
                    success: true,
                    data: person,
                    message: '',
                });
            } catch (err) {
                const { message } = err as Error;
                return res.status(500).json({
                    success: false,
                    data: null,
                    message: message,
                });
            }
        }
        case 'POST': {
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
        }

        default: {
            res.status(404).json({
                success: false,
                data: null,
                message: '404 Not Found',
            });
        }
    }
};

export default getPersons;
