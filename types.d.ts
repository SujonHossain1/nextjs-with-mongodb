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

export interface IProduct {
    _id: string;
    title: string;
    url: string;
    shortDescription: string;
    previousPrice: number;
    stock: number;
    price: number;
    productKey: string;
    alt: string;
    image1: string;
}
