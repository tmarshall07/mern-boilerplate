const mongoose = require('mongoose');
const keygen = require('../lib/keygen');

const { Schema } = mongoose;

// Recipe subdocument
const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

/**
 * Validates the entered password against the stored password hash
 *
 * @param {String} password
 * @returns
 */
function validatePassword(password) {
  return keygen.compare(password, this.password);
}

User.methods.validatePassword = validatePassword;

/**
 * Hook that's called before a User object is saved
 *  - Update the user's password hash
 *
 * @param {Function} next
 */
function onBeforeSave(next) {
  if (this.isNew || this.isNewPassword) {
    const passwordHash = keygen.encrypt(this.password);
    this.password = passwordHash;
  }

  next();
}

User.pre('save', onBeforeSave);

module.exports = mongoose.model('User', User);
