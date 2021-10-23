import { model, models, Schema } from 'mongoose';
import { IVehicle } from 'types';

const vehicleSchema = new Schema<IVehicle>({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: true,
    },
});

export default models.Person || model<IVehicle>('Person', vehicleSchema);
