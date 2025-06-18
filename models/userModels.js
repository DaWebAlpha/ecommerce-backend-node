import mongoose from '../config/db.js';
import cuid from 'cuid';
import validator from 'validator';
import bcrypt from 'bcrypt';

const { isEmail, isAlphanumeric } = validator;

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
        message: props => `${props.value} contains invalid characters`
      },
      {
        validator: str => !/^admin$/i.test(str),
        message: () => 'Username "admin" is reserved'
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
  return {
    type: String,
    required: !!opts.required,
    validate: {
      validator: isEmail,
      message: props => `${props.value} is not a valid email address`
    }
  };
}


const UserSchema = new mongoose.Schema({
  _id: { type: String, default: cuid },
  username: usernameSchema(),
  password: { type: String, required: true, maxLength: 120 },
  email: emailSchema({ required: true }),

  // ✅ New field: Exam Type for Teachers
  examType: {
    type: String,
    enum: [
      'Principal Superintendent',
      'Assistant Director II',
      'Assistant Director I',
      'Deputy Director'
    ],
    required: true
  },

  // ✅ Add these two fields for password reset
  resetToken: { type: String },
  tokenExpiry: { type: Date }
});



UserSchema.methods.comparePassword = async function (plainTextPassword) {
  return await bcrypt.compare(plainTextPassword, this.password);
};

export const User = mongoose.model('User', UserSchema);
