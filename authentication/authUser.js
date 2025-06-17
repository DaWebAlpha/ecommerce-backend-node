import bcrypt from 'bcrypt';
import { autoCatchFn } from '../lib/autoCatchFn.js';
import { User } from '../models/userModels.js';


const SALT_ROUNDS = 10;

export const get = async function (username) {
  const user = await User.findOne({ username });
  console.log(`🔍 Looking for: ${username}`);
  console.log(`✅ Found user:`, user);
  return user;
};



export const list = async function (opts = {}) {
  const { offset = 0, limit = 100 } = opts;
  const users = await User.find().sort({ _id: 1 }).skip(offset).limit(limit);
  return users || []; // 🔧 ensures it's never undefined
};


export const remove = autoCatchFn(async function (username) {
  await User.deleteOne({ username });
});

// ✅ FIXED: Removed autoCatchFn from here
export const create = async function (fields) {
  if (!fields || !fields.username || !fields.password || !fields.email) {
    throw new Error('Missing required fields');
  }

  const user = new User(fields);
  await hashPassword(user);
  await user.save();
  return user;
};

// ✅ FIXED: Removed autoCatchFn from here
export const edit = async function (username, change) {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');

  Object.keys(change).forEach(key => {
    user[key] = change[key];
  });

  if (change.password) await hashPassword(user);
  await user.save();
  return user;
};

// ✅ FIXED: Removed autoCatchFn from here
export const isUnique = async function (doc, username) {
  const existing = await User.findOne({ username });
  return !existing || doc._id === existing._id;
};

export const hashPassword = async function (user) {
  if (!user.password) {
    throw user.invalidate('password', 'password is required');
  }
  if (user.password.length < 8) {
    throw user.invalidate('password', 'password must be at least 8 characters');
  }
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
};

