import { ToastContainer, Zoom } from "react-toastify";
import Profile from "../components/Profile.jsx";
import Contacts from "../components/Contacts.jsx";
// import Chats from "../components/Chats.jsx";
import { } from '../../redux/slice.js';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Chats from "../components/Chats.jsx";

export default function ChatPage() {
  const user = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [active, setActive] = useState("contacts");
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (

    <div className="animate-border relative w-auto max-w-6xl h-auto ">

      <div className="w-full relative max-w-6xl flex flex-col md:flex-row h-auto p-2">
        {/* Left Section (Form) */}
        <div className="">
          <Profile />
          <div className="mt-5 flex flex-row gap-3 ">
            <button onClick={() => setActive("contacts")}
              className="w-full border border-violet-500  text-sm font-medium text-violet-400 px-3 py-2 rounded-2xl text-center transition-all hover:bg-violet-600 hover:text-white hover:border-amber-50 ">
              Contacts
            </button>
            <button onClick={() => setActive("chats")}
              className="w-full  border border-violet-500 text-violet-400 text-sm font-medium px-3 py-2 rounded-2xl text-center transition-all hover:bg-violet-600 hover:text-white hover:border-amber-50">
              Chats
            </button>
          </div>
          <div className="mt-4 ">
            {active === "contacts" && <Contacts />}
            {active === "chats" && <Chats />}
          </div>
        </div>




        {/* <Chats/> */}

        <div className="p-1 md:border-r border-gray-600/50">
          <div className="w-full max-w-md">
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
        </div>

        {/* Right Section (Image) */}
        <div className="w-full md:w-[60%] flex justify-center items-center mt-6 md:mt-0">
          <img
            src="/img/login.png"
            alt="Chat Illustration"
            className="w-full h-auto rounded-2xl opacity-90 hover:opacity-100 transition duration-500"
          />
        </div>
      </div>
    </div>
  );
}
