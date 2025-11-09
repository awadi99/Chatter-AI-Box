import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setActive } from '../../redux/chatSlice.js';
import { useDispatch } from 'react-redux';

export default function Chats() {
    const [chats, setChats] = useState([]);
    const dispatch = useDispatch();
    const data = JSON.parse(localStorage.getItem("user"));
    const id = data._id;
    console.log(id);
    useEffect(() => {
        const getChat = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/messages/chats`, {
                    withCredentials: true
                });
                console.log("Chats:", res.data);
                setChats(res.data);
            } catch (err) {
                console.error("Error fetching chats:", err);
                toast.error(err.response?.data?.msg || "Something went wrong");
            }
        };
        getChat();
    }, []);


    const sendActive = () => {
        let a = dispatch(setActive("ai"));
        console.log(a);
    }

    return (
        <div className="h-150">
            <h3 className="text-lg mb-2 text-violet-400 text-left p-0.2">Chats</h3>
            <div className="overflow-y-scroll h-full space-y-2">
                <div
                    className={`mt-2 w-auto rounded-2xl cursor-pointer text-violet-400
                    transition-all hover:text-purple-500 active:border border-purple-800`}
                    onClick={sendActive}
                >
                    <div className="w-full flex justify-between gap-3 p-2 bg-slate-700 rounded-2xl contrast-150">
                        <div className="flex items-center gap-2 p-1">
                            <img
                                className="bg-cover h-15 rounded-2xl ring-success ring-offset-base-100 ring ring-offset-2"
                                src="/img/icon/icon-removebg-preview.png"
                                alt=""
                            />
                            <div className="p-1">
                                <h1 className="text-[21px] font-medium animate-pulse">Chatter Ai</h1>
                            </div>
                        </div>
                    </div>
                </div>
                {chats.length > 0 &&
                    chats.map((ele, index) => (
                        <div key={index} className="mt-2 w-auto rounded-2xl">
                            <div className="cursor-pointer w-full flex justify-between gap-3 p-2 bg-slate-700 rounded-2xl contrast-150">
                                <div className="flex items-center gap-2 p-1">
                                    <div className="avatar ring-offset-purple-900  rounded-full ring-2 ring-offset-2 ">
                                        <div className="size-15 rounded-full overflow-hidden relative group">
                                            <img src={ele.profilePic || "/img/avatar.png"} alt="" className="object-cover size-full" />
                                        </div>
                                    </div>
                                    <div className="p-1">
                                        <h1 className="text-[21px] font-light">{ele.fullName}</h1>
                                        <p className="text-[13px] mt-1 font-extralight opacity-60 hover:opacity-100 transition-all">
                                            online
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>

    );
}

