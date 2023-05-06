import { model, models, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add a first name'],
      trim: true,
      maxlength: [50, 'First name cannot be more than 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add a last name'],
      trim: true,
      maxlength: [50, 'First last name cannot be more than 50 characters'],
    },
    secondLastName: {
      type: String,
      trim: true,
      maxlength: [50, 'Second last name cannot be more than 50 characters'],
    },
    ci: {
      type: String,
      required: [true, 'Please add a CI'],
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, 'Please add a phone number'],
      unique: true,
    },
    birthdate: {
      type: Date,
      required: [true, 'Please add a birthdate'],
    },
    gender: {
      type: String,
      enum: ['M', 'F', 'O'], // Assuming M for Male, F for Female, and O for Other
      required: [false, 'Please add a gender'],
    },
    location: {
      type: {
        latitude: Number,
        longitude: Number,
      },
      _id: false,
      required: [false, 'Please add a location'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      trim: true,
      maxlength: [50, 'Email cannot be more than 50 characters'],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    license: {
      type: String,
      maxlength: [30, 'License cannot be more than 30 characters'],
    },
    photos: {
      type: [String],
      required: [false, 'Please add at least one image URL'],
    },
    truck: {
      type: Schema.Types.ObjectId,
      ref: 'Truck',
    },
    points: {
      type: Number,
      default: 0,
    },
    buckets: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: 'user_normal',
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters long'],
      optional: true,
    },
    status: {
      type: String,
      default: '1',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.User || model('User', userSchema);
