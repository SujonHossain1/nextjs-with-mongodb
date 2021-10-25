import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'server/database';
import Person from 'server/models/person';

dbConnect();

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    if (method === 'POST') {
        const { email, password } = body;
        const person = await Person.findOne({ email: email }).select('-__v');
        const isPasswordMatch = bcrypt.compare(password, person.password);

        if (!isPasswordMatch) {
            return res.status(400).send({ message: 'Invalid Credentials' });
        }
        const jwt = sign(
            { sub: person._id },
            '43fee761-96c4-4ab7-9384-fe614fe2229f',
            { expiresIn: '1h' }
        );
        return res.status(200).json({
            success: true,
            data: {
                authToken: jwt,
            },
            message: 'Login successful',
        });
    } else {
        res.status(405).json({
            success: false,
            data: null,
            message: '405 Method Not Allowed',
        });
    }
};

// async function findUser(query: FilterQuery<IPerson>, options = {lean: true} ) {
//     return Person.findOne(query, null, options)
// }

export default login;
