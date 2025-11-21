import axios from 'axios';
import { useEffect, useState } from 'react';
import { Zoom, ToastContainer } from 'react-toastify';
import { Send, X } from 'lucide-react';
import { showToast } from './Notification_sound.jsx';
import { getChatId } from './../../redux/chatID.js';
import { setActive } from './../../redux/chatSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { } from '../../redux/onlineUserSlice.js'
export default function MessageProfile() {
    const [chatProfile, setChatProfile] = useState([]);
    const userid = useSelector((state) => state.chatId.userId);
    const onlineUsers = useSelector((state) => state.online.onlineUsers);
    const dispatch = useDispatch();


    const getChatProfile = async () => {
        try {
            const res = await axios.get(`https://chatter-ai-box-backend.onrender.com/api/messages/chats/${userid}`, {
                withCredentials: true
            });
            setChatProfile(res.data);
        } catch (err) {
            console.error(err);
            showToast(err.response?.data?.msg || " internal server problem", "error");
        }
    };

    useEffect(() => {
        if (userid) {
            getChatProfile();
        }
    }, [userid]);


    const crossFunction = (value) => {
        dispatch(setActive(value));
        dispatch(getChatId(value));
        setChatProfile(null);
    };


    if (!chatProfile) return null;

    const isOnline =
        chatProfile?._id &&
        onlineUsers.includes(chatProfile._id.toString());


    return (
        <>
            {/* <div className="w-full mb-4 p-4 border-purple-800  rounded-2xl h-[650px] flex flex-col gap-2 overflow-y-auto "> */}

            {chatProfile && (
                <div className=" w-auto cursor-pointer  h-min-auto flex justify-between gap-3 p-2 bg-slate-700 rounded-2xl contrast-150 z-100">
                    <div className="flex items-center gap-2 p-2">
                        <div
                            className={`avatar ${isOnline ? "avatar-online" : ""} rounded-full ring-1 ring-offset-1
                                                ${isOnline ? "ring-success ring-offset-green-500" : "ring-gray-600 ring-offset-purple-800"}`}
                        >
                            <button className="size-15 rounded-full overflow-hidden relative group">
                                <img src={chatProfile?.profilePic || "/img/avatar.png"} alt="" className="object-cover size-full" />
                            </button>
                        </div>
                        <div className="p-2">
                            <h1 className="-mt-2 text-2xl font-semibold tracking-wide bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-[length:200%_200%] animate-gradient text-transparent bg-clip-text">
                                {chatProfile?.fullName}
                            </h1>
                            <p className="text-[13px] -mt-1 font-extralight opacity-60">{isOnline ? "online" : "offline"}</p>
                        </div>
                    </div>
                    <X
                        className="mr-6 mt-4 hover:animate-spin cursor-pointer text-purple-400 hover:text-purple-500"
                        onClick={() => crossFunction(null)}
                    />
                </div>
            )}
        </>
    )
}
