import { model, models, Schema } from 'mongoose';

const affiliateSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add an affiliate name'],
      trim: true,
      maxlength: [100, 'Affiliate name cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    images: {
      type: [String],
      required: [false, 'Please add at least one image URL'],
    },
    status: {
      type: Number,
      required: [true, 'Please add a status'],
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Affiliate || model('Affiliate', affiliateSchema);
