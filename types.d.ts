import { ObjectId } from 'mongoose';

export interface IPerson extends Document {
    _id?: string;
    name: string;
    email: string;
    password: string;
}

export interface IVehicle {
    _id?: string;
    brand: string;
    model: string;
    ownerId: ObjectId;
}
