import { ObjectId } from 'mongoose';

export interface IPerson {
    _id?: string;
    name: string;
    email: string;
}

export interface IVehicle {
    _id?: string;
    brand: string;
    model: string;
    ownerId: ObjectId;
}
