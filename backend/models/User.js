// models/User.js - Mongoose User Schema
const mongoose = require('mongoose');

// Define the schema (structure) for the User document in MongoDB
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,           // Removes leading/trailing whitespace
      minlength: [2, 'Name must be at least 2 characters'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,         // Ensures no two users share the same email
      lowercase: true,      // Converts email to lowercase before saving
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Export the model so it can be used in other files
module.exports = mongoose.model('User', userSchema);
