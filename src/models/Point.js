import { model, models, Schema } from 'mongoose';

const pointSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
      maxlength: [50, 'Point name cannot be more than 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please add price points'],
    },
    value: {
      type: Number,
      required: [true, 'Please add price points'],
    },
    status: {
      type: Number,
      required: [true, 'Please add a status'],
    },
    images: {
      type: [String],
      required: [false, 'Please add at least one image URL'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Point || model('Point', pointSchema);
