import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env explicitly
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // adjust path to your backend root

if (!process.env.RESEND_API_KEY) {
  console.error("RESEND_API_KEY is missing!");
  process.exit(1);
}

export const resendClient = new Resend(process.env.RESEND_API_KEY);

export const sender = {
  email: process.env.EMAIL_FROM,
  name: process.env.EMAIL_FROM_NAME,
};

console.log("RESEND_API_KEY inside resend.js:", process.env.RESEND_API_KEY);
