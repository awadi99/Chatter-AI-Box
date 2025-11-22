# <img src="https://cdn-icons-png.flaticon.com/512/4712/4712100.png" width="40" /> Chatter AI Box

Chatter AI Box is a real-time chat application built using the MERN stack.  
It supports AI-powered messaging, real-time translation, image sharing, JWT authentication, and email invitations.

## 🚀 Installation

Clone the project and install all dependencies.

```bash
git clone https://github.com/awadi99/Chatter-Ai-Box.git
```

## 🔗 Live Demo
**👉 Try the Live App:** 
```bash
https://chatter-ai-box-frontend.onrender.com/
```


## ⚙️ Backend Setup
```bash
cd backend
npm install
npm start
```
## 💻 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## ✨ Features

💬 Real-time chat using Socket.io
Messages update instantly without refresh.

🤖 AI Chatbot (Chatter AI Integration)
Ask questions inside chat and get smart AI responses.

🌍 Real-time Translation
Messages automatically translate to the user's selected language.

🖼️ Image Sharing
Users can upload and send images in chats.

🔐 JWT Authentication
Secure login/signup using token-based authentication.

👥 Group Chat Features
Create groups, add members, and remove members.

✉️ Email Invitations (Resend)
Invite users to join via email invite link.




## 📂 Folder Structure
```bash
backend/
 └── src/
      ├── config/          # DB connection, cloudinary, jwt
      ├── controllers/     # All backend logic
      ├── middleware/      # Auth and validation middleware
      ├── models/          # MongoDB schemas
      ├── routes/          # API routes
      └── index.js         # Entry point

frontend/
 └── src/
      ├── components/      # UI components
      ├── pages/           # Main screens (Login, ChatPage, GroupPage)
      ├── redux/           # Store & slices
      ├── hook/            # Custom hooks (sounds, auth)
      ├── assets/          # Images/icons
      └── main.jsx         # React entry file
```

## 📄 License

MIT License

Copyright (c) 2025 aditya waghmare

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


