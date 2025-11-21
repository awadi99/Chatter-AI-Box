import React, { useEffect, useState } from "react";
import axios from "axios";
import { setActive } from "../../redux/chatSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { getChatId } from "./../../redux/chatID.js";
import ScrollAnimation from "./ScrollAnimation.jsx";
import { showToast } from "./Notification_sound.jsx";

export default function Chats() {
    const [chats, setChats] = useState([]);
    const dispatch = useDispatch();
    const onlineUsers = useSelector((state) => state.online.onlineUsers);

    useEffect(() => {
        const getChat = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/messages/chats", {
                    withCredentials: true,
                });
                setChats(res.data);
            } catch (err) {
                showToast(err.response?.data?.msg || "Something went wrong", "error");
            }
        };
        getChat();
    }, []);

    const sendActive = () => {
        dispatch(setActive("ai"));
    };

    const sendActiveChatId = (useid) => {
        dispatch(setActive("user"));
        dispatch(getChatId(useid));
    };

    return (
        <>
            <div>
                <h3 className="text-lg mb-2 text-violet-400 text-left p-0.2">Chats</h3>
            </div>
            <div className="h-160">
                <ScrollAnimation className="h-full space-y-2">
                    <div
                        className="mt-2 w-auto rounded-2xl cursor-pointer text-violet-400
                        transition-all hover:text-purple-500 active:border border-purple-800"
                        onClick={sendActive}
                    >
                        <div className="w-full flex justify-between gap-3 p-2 bg-slate-700 rounded-2xl contrast-150">
                            <div className="flex items-center">
                                <img
                                    className="bg-cover h-15 rounded-2xl ring-success ring-offset-base-100 ring ring-offset-2"
                                    src="/img/icon/icon-removebg-preview.png"
                                    alt=""
                                />
                                <h1
                                    className="p-4 absolute left-20 top-1 text-2xl font-semibold tracking-wide
                                        bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 
                                        bg-[length:200%_200%] animate-gradient text-transparent bg-clip-text"
                                >
                                    Chatter AI
                                </h1>
                            </div>
                        </div>
                    </div>

                    {chats.length > 0 &&
                        chats.map((ele) => {
                            const isOnline = onlineUsers.includes(ele._id.toString());

                            return (
                                <div
                                    key={ele._id}
                                    className="mt-2 w-auto rounded-2xl"
                                    onClick={() => sendActiveChatId(ele._id)}
                                >
                                    <div className="cursor-pointer w-full flex justify-between gap-3 p-2 bg-slate-700 rounded-2xl contrast-150">
                                        <div className="flex items-center gap-2 p-1">

                                            <div
                                                className={`avatar ${isOnline ? "avatar-online" : ""} rounded-full ring-1 ring-offset-1
                                                ${isOnline ? "ring-success ring-offset-green-500" : "ring-gray-600 ring-offset-purple-800"}`}
                                            >
                                                <div className="size-15 rounded-full overflow-hidden">
                                                    <img
                                                        src={ele.profilePic || "/img/avatar.png"}
                                                        alt=""
                                                        className="object-cover size-full"
                                                    />
                                                </div>
                                            </div>

                                            <div className="p-2">
                                                <h1
                                                    className="-mt-2 text-[20px] font-semibold tracking-wide
                                                        bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 
                                                        bg-[length:200%_200%] animate-gradient text-transparent bg-clip-text"
                                                >
                                                    {ele?.fullName}
                                                </h1>
                                                <p className="text-[13px] mt-1 font-extralight opacity-60 hover:opacity-100 transition-all">
                                                    {isOnline ? "online" : "offline"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </ScrollAnimation>
            </div>
        </>
    );
}
