import { model, models, Schema } from 'mongoose';

const shopSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    point: {
      type: Schema.Types.ObjectId,
      ref: 'Point',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    images: {
      type: [String],
      required: [false, 'Please add at least one image URL'],
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Shop || model('Shop', shopSchema);
