// models/userModels.js
import mongoose from '../database/db.js';
import cuid from 'cuid';
import validator from 'validator';
import bcrypt from 'bcrypt'; // ✅ Required for password comparison


const { isEmail, isAlphanumeric } = validator;

// --- Schema Helpers ---

 const isUnique = async function (doc, username) {
  const existing = await User.findOne({ username });
  return !existing || doc._id === existing._id;
};


function usernameSchema() {
  return {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minLength: 3,
    maxLength: 16,
    validate: [
      {
        validator: isAlphanumeric,
        message: props => `${props.value} contains special characters`
      },
      {
        validator: str => !/^admin$/i.test(str),
        message: () => 'Invalid username'
      },
      {
        validator: async function (username) {
          return await isUnique(this, username);
        },
        message: () => 'Username is taken'
      }
    ]
  };
}

function emailSchema(opts = {}) {
  const { required } = opts;
  return {
    type: String,
    required: !!required,
    validate: {
      validator: isEmail,
      message: props => `${props.value} is not a valid email address`
    }
  };
}

// --- User Schema ---

const UserSchema = new mongoose.Schema({
  _id: { type: String, default: cuid },
  username: usernameSchema(),
  password: { type: String, maxLength: 120, required: true },
  email: emailSchema({ required: true })
});

// ✅ Add method to compare plaintext password to hashed one
UserSchema.methods.comparePassword = async function (plainTextPassword) {
  return await bcrypt.compare(plainTextPassword, this.password);
};

export const User = mongoose.model('User', UserSchema);
