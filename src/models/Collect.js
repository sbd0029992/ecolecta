import { model, models, Schema } from 'mongoose';

const collectSchema = new Schema(
  {
    recolector: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    status: {
      type: Number,
      required: [false, 'Please add a status'],
      default: 1,
    },
    points: {
      type: Number,
      required: [false, 'Please add points'],
    },
    buckets: {
      type: Number,
      required: [false, 'Please add buckets'],
    },
    description: {
      type: String,
      required: [false, 'Please add a description'],
      trim: false,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    time: {
      type: Number,
      required: [false, 'Please add time'],
    },
    fault: {
      type: Number,
      default: 0,
    },
    imagecheck: [{ type: String }],
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default models.Collect || model('Collect', collectSchema);
