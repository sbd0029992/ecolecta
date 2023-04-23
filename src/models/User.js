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
      type: Number,
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
    location: {
      type: {
        latitude: Number,
        longitude: Number,
      },
      _id: false,
      required: [true, 'Please add a location'],
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
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters long'],
      optional: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    type: {
      type: String,
      enum: ['user_normal', 'user_superior'],
      default: 'user_normal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.User || model('User', userSchema);
