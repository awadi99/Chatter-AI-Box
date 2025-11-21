import { ToastContainer, Zoom } from "react-toastify";
import Profile from "../components/Profile.jsx";
import Contacts from "../components/Contacts.jsx";
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
  const Activity = useSelector((state) => state.Activity.activity);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="animate-border w-full max-w-6xl min-h-auto mx-auto p-3 z-100">

      <div className="flex flex-col md:flex-row h-full gap-2 ">

        {/* LEFT SECTION */}
        <div className="w-full md:w-[310px] flex flex-col gap-3 ">

          <Profile />

          {/* Toggle Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setAct("contacts")}
              className={`w-full border text-sm font-medium px-3 py-2 rounded-2xl text-center transition-all
              ${active === "contacts"
                  ? "bg-violet-500 text-white"
                  : "border-violet-500 text-violet-400"
                } hover:bg-violet-600 hover:text-white`}
            >
              Contacts
            </button>

            <button
              onClick={() => setAct("chats")}
              className={`w-full border text-sm font-medium px-3 py-2 rounded-2xl text-center transition-all
              ${active === "chats"
                  ? "bg-violet-500 text-white"
                  : "border-violet-500 text-violet-400"
                } hover:bg-violet-600 hover:text-white`}
            >
              Chats
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto pr-1">
            {active === "contacts" ? <Contacts /> : <Chats />}
          </div>

        </div>

        {/* MIDDLE SECTION */}
        <div className="md:flex items-start justify-center px-2 border-b md:border-b-0 md:border-r border-gray-600/50">
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

        {/* RIGHT SECTION */}
        <div className="flex-1 flex justify-center items-center overflow-hidden ">

          <div className="p-3 w-full md:w-[900px] lg:w-[950px] min-h-[600px] md:min-h-[650px] overflow-hidden flex justify-center items-center relative">

            {active === "chats" && Activity === "ai" ? (
              <AiChats />
            ) : active === "chats" && Activity === "user" ? (
              <Input />
            ) : active === "contacts" && Activity === "Contact" ? (
              <Input />
            ) : (
              <Animations />
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
