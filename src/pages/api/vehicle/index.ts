import { Error } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from 'server/database';
import Vehicle from 'server/models/vehicle';

dbConnect();

const handleVehicle = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === 'GET') {
        try {
            const vehicles = await Vehicle.find({});
            res.status(200).json({
                success: true,
                data: vehicles,
                message: 'get vehicles successfully',
            });
        } catch (error) {
            const { message } = error as Error;
            res.status(400).json({
                success: false,
                data: null,
                message: '404, Page Not Found',
            });
        }
    } else if (method === 'POST') {
        try {
            const vehicle = await Vehicle.create(req.body);
            res.status(200).json({
                success: true,
                data: vehicle,
                message: 'Vehicle Create successfully',
            });
        } catch (error) {
            const { message } = error as Error;
            res.status(400).json({
                success: true,
                data: null,
                message,
            });
        }
    }
};

export default handleVehicle;
