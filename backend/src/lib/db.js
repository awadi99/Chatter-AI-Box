import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const mongoURL = process.env.MONGO_URI;

if (!mongoURL) {
  console.error("MONGO_URI is not defined in your .env!");
  process.exit(1);
}

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(" MongoDB Connection Error:", err);
    process.exit(1);
  }
};
