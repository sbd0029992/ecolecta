import { model, models, Schema } from 'mongoose';

const productSchema = new Schema(
  {
    nameproduct: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
      maxlength: [100, 'Product name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    price_points: {
      type: Number,
      required: [true, 'Please add price points'],
    },
    status: {
      type: Number,
      required: [true, 'Please add a status'],
    },
    ammount: {
      type: Number,
      required: [true, 'Please add an amount'],
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

export default models.Product || model('Product', productSchema);
