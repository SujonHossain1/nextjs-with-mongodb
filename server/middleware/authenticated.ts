import { verify } from 'jsonwebtoken';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { jwt_secret } from 'server/secret';

const authenticated =
    (fn: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const decoded = verify(req.cookies.authorization!, jwt_secret);
            if (decoded) {
                return await fn(req, res);
            }
        } catch (error) {
            return res.status(401).send({
                success: false,
                data: null,
                message: 'Sorry you are not authenticated',
            });
        }
    };

export default authenticated;
