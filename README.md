<img src="https://cdn-icons-png.flaticon.com/512/4712/4712100.png" width="40" /> Chatter AI Box

Chatter AI Box is a real-time chat application built using the MERN stack, featuring AI-powered messaging, live translation, image sharing, secure JWT authentication, and email invitations using Resend.

Installation

Clone the project and install all dependencies for backend and frontend.

git clone https://github.com/awadi99/Chatter-Ai-Box.git

Backend
cd backend
npm install
npm start

Frontend
cd frontend
npm install
npm run dev

Usage
• Real-time chat using Socket.io
• AI assistant replies inside chat (Chatter AI)
• Real-time language translation
• Send & receive images
• Secure login/signup using JWT
• Create private & group chats
• User search and contact system
• Email invitations using Resend
• MongoDB storage for users, chats & messages

Folder Structure
backend/
 └── src/
      ├── config/
      ├── controllers/
      ├── middleware/
      ├── models/
      ├── routes/
      └── index.js

frontend/
 └── src/
      ├── components/
      ├── pages/
      ├── redux/
      ├── hook/
      ├── assets/
      └── main.jsx

Environment Variables

Create a .env file inside backend/:

MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
CHATTER_AI_KEY=your_api_key
RESEND_API_KEY=your_resend_key
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
CLIENT_URL=http://localhost:5173

Contributing

Pull requests are welcome.
For major updates, create an issue first to discuss what you would like to change.

Please update any related logic or tests where appropriate.

License

MIT
