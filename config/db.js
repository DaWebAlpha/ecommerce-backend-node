// config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)


export default mongoose;
/* mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});


mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
}); */



