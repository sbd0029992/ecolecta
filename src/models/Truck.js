import { model, models, Schema } from 'mongoose';

const truckSchema = new Schema(
  {
    plate: {
      type: String,
      required: [true, 'Please add a truck plate'],
      trim: true,
      maxlength: [20, 'Plate cannot be more than 20 characters'],
      unique: true,
    },
    chasis: {
      type: String,
      required: [true, 'Please add a chasis'],
      trim: true,
      maxlength: [30, 'Chasis cannot be more than 30 characters'],
      unique: true,
    },
    model: {
      type: String,
      required: [true, 'Please add a model'],
      trim: true,
      maxlength: [10, 'Model cannot be more than 10 characters'],
    },
    brand: {
      type: String,
      required: [true, 'Please add a brand'],
      trim: true,
      maxlength: [30, 'Brand cannot be more than 30 characters'],
    },
    status: {
      type: Number,
      required: [true, 'Please add a status'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Truck || model('Truck', truckSchema);
