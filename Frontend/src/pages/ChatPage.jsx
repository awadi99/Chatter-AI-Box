import { ToastContainer, Zoom } from "react-toastify";
import Profile from "../components/Profile.jsx";
import Contacts from "../components/Contacts.jsx";
import { } from '../../redux/slice.js';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Chats from "../components/Chats.jsx";
import Input from "../components/Input.jsx";
import { AiChats } from "../components/AiChats.jsx";
import Animations from "../components/Animation.jsx";


export default function ChatPage() {
  const user = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [active, setAct] = useState("contacts");
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  const Activity = useSelector((state) => state.Activity.activity);
  return (
    <div className="animate-border relative w-full max-w-6xl h-[190]  mx-auto p-2">
      <div className="flex flex-col md:flex-row h-full ">

        {/* Left Section */}
        <div className="w-auto flex flex-col gap-3 h-full">
          <Profile />

          <div className="flex gap-3">
            <button
              onClick={() => setAct("contacts")}
              className={`w-full border text-sm font-medium px-3 py-2 rounded-2xl text-center transition-all
            ${active === "contacts" ? "bg-violet-500 text-white" : "border-violet-500 text-violet-400"}
            hover:bg-violet-600 hover:text-white`}
            >
              Contacts
            </button>
            <button
              onClick={() => setAct("chats")}
              className={`w-full border text-sm font-medium px-3 py-2 rounded-2xl text-center transition-all
            ${active === "chats" ? "bg-violet-500 text-white" : "border-violet-500 text-violet-400"}
            hover:bg-violet-600 hover:text-white`}
            >
              Chats
            </button>
          </div>

          {/* Scrollable content */}
          <div className="mt-3 overflow-clip ">
            {active === "contacts" && <Contacts />}
            {active === "chats" && <Chats />}
          </div>
        </div>

        {/* Middle Section */}
        <div className="p-1 border-b md:border-b-0 md:border-r border-gray-600/50">
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Zoom}
          />
        </div>

        {/* Right Section */}
        <div className="p-4 h-full md:w-[950px] flex flex-col justify-center">
          <div>
            {active === "chats" && Activity === "ai" ? (
              <AiChats />
            ) : active === "chats" && Activity === "user" ? (
              <Input />
            ) : active === "contacts" && Activity === "Contact" ? (
              <Input />
            ) : active === "contacts" || active==="chats" ? (
              <Animations/>
            ) : null}
          </div>
        </div>


      </div>
    </div>

  );
}
