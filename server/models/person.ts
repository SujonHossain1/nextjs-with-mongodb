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
});

export default models.Person || model<IPerson>('Person', personSchema);
