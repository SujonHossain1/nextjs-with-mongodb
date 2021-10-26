import bcrypt from 'bcryptjs';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'server/database';
import Person from 'server/models/person';

dbConnect();
const jwt_secret: string = process.env.JWT_SECRET as string;

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;

    if (method === 'POST') {
        const { email, password } = body;

        const person = await Person.findOne({ email: email }).select('-__v');
        const isPasswordMatch = bcrypt.compare(password, person?.password);

        if (person && isPasswordMatch) {
            const jwt = sign({ sub: person._id }, jwt_secret, {
                expiresIn: '1h',
            });
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('authorization', jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 3600,
                    path: '/',
                })
            );
            return res.status(200).json({
                success: true,
                data: null,
                message: 'Login successful',
            });
        } else {
            return res.status(400).send({ message: 'Invalid Credentials' });
        }
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
