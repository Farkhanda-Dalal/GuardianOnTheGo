import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const childProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  photo: {
    type: String, // URL or base64 encoded image path
    default: null
  },
  emergencyContacts: [
    {
      name: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
      },
      relationship: {
        type: String,
        required: true
      }
    }
  ],
  medicalCondition: {
    type: String,
    default: 'None',
    trim: true
  },
  identificationMarks: {
    type: [String],
    default: []
  }
});

const ChildProfile = mongoose.model('ChildProfile', childProfileSchema);

export default ChildProfile;
