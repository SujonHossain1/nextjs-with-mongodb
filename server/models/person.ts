import bcrypt from 'bcryptjs';
import { model, models, Schema } from 'mongoose';
import { IPerson } from 'types';

const personSchema = new Schema<IPerson>({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
});

personSchema.pre('save', async function (next) {
    const person = this;
    if (person.isModified('password')) {
        person.password = await bcrypt.hash(person.password, 10);
    }
    next();
});

export default models.Person || model<IPerson>('Person', personSchema);
