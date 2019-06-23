const mongoose = require('mongoose');

const userProfile = new mongoose.Schema({
  NAME: {
    type: String,
    required: [true, 'Name is required'],
    lowercase: true,
  },
  EMAIL: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    unique: true,
  },
  DOB: {
    type: String,
    required: [true, 'DOB is required'],
  },
  GENDER: {
    type: String,
    required: [true, 'Gender is required'],
    lowercase: true,
  },
  EXPERIENCE: {
    type: Number,
    required: [true, 'Experience is required'],
  },
  DOMAIN: {
    type: String,
    required: [true, 'Domain is required'],
    lowercase: true,
  },
  PASSWORD: {
    type: String,
    required: [true, 'Password is required'],
  },
  DESCRIPTION: {
    type: String,
    default: 'No description provided',
  },
  IMAGE_URL: {
    type: String,
    // required : true
  },
  IMAGE_ID: {
    type: String,
  },
  RATING: {
    type: Number,
    default: 1,
  },
  AVAILABLE: {
    type: Boolean,
    default: true,
  },
  RATING_COUNT: {
    type: Number,
    default: 1,
  },
  TOTAL_RATING: {
    type: Number,
    default: 1,
  },
  REQUEST_SENT: {
    type: Array,
  },
  REQUEST_RECEIVED: {
    type: Array,
  },
});

module.exports.userProfile = mongoose.model('userProfile', userProfile);
