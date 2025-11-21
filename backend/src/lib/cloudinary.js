import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const name = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_CLOUD_API_KEY;
const apiSecret  = process.env.CLOUDINARY_CLOUD_API_SECRET;



cloudinary. config({
cloud_name:name,
api_key:apiKey,
api_secret:apiSecret
});

export default cloudinary;