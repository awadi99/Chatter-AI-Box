import axios from 'axios';
import React, { useState,useRef,useEffect } from 'react'
import { Zoom, ToastContainer } from 'react-toastify';
import { Send, X } from 'lucide-react';
import { getChatId } from './../../redux/chatID.js'
import { setActive } from './../../redux/chatSlice.js'
import { useDispatch } from 'react-redux';
import { showToast } from './Notification_sound.jsx';
import useKeyboardSound from '../../hook/useSoundHook.jsx';
import ScrollAnimation from './ScrollAnimation.jsx';



export function AiChats() {
    const [text, SetText] = useState({
        message: ""
    });

    const [message, setMessage] = useState([]);
    const { playRandomKeyStrokeSound } = useKeyboardSound();

    const handleValue = (event) => {
        const { name, value } = event.target;
        SetText({ ...text, [name]: value });
        playRandomKeyStrokeSound();
    }

    const sendValue = async (e) => {
        e.preventDefault();
        if (!text.message.trim()) return;
        setMessage(prev => [...prev, { role: "user", content: text.message }]);
        const userMessage = text.message;
        SetText({ message: "" });
        try {
            const res = await axios.post("https://chatter-ai-box-backend.onrender.com/api/messages/ai", {
                message: userMessage,
            });
            const reply = res.data.reply;
            setMessage(prev => [...prev, { role: "ai", content: "" }]);
            let index = 0;
            const interval = setInterval(() => {
                setMessage(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1].content = reply.slice(0, index);
                    return updated;
                });
                index++;
                if (index > reply.length) {
                    clearInterval(interval);
                }
            }, 20);
        } catch (error) {
            console.error(error);
            showToast(error.response?.data?.reply || "something went wrong", "error");
        }
    };
    const dispatch = useDispatch();
    const crossFunction = (value) => {
        dispatch(setActive(value));
        dispatch(getChatId(value));
    }

    const bottomRef = useRef(null);
    useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [message]);

    return (
        <>
            <div className='h-[775px] w-full p-2 '>
                <div
                    className={` p-3 mt-2 w-full rounded-2xl cursor-pointer text-violet-400
                    transition-all hover:text-purple-500`}
                >
                    <div className="w-full flex justify-between gap-3 p-3 bg-slate-700 rounded-2xl contrast-150">
                        <div className="flex items-center gap-2 p-1">
                            <img
                                className="bg-cover h-15 rounded-2xl ring-success ring-offset-base-100 ring ring-offset-2"
                                src="/img/icon/icon-removebg-preview.png"
                                alt=""
                            />
                            <h1 className="p-6 absolute left-20 top-1 text-2xl font-semibold tracking-wide
                                bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 
                                bg-[length:200%_200%] animate-gradient text-transparent bg-clip-text">
                                Chatter AI
                            </h1>
                        </div>
                        <X
                            className="mr-6 mt-4  hover:animate-spin cursor-pointer text-purple-400 hover:text-purple-500 transition-transform duration-300 hover:scale-110"
                            onClick={() => crossFunction(null)}
                        />
                    </div>
                </div>

                {/* Chat display */}
                <ScrollAnimation className="mt-4 w-full mb-4 p-4 border-purple-800 h-[550px] rounded-2xl ">
                    <div className="flex flex-col gap-4">
                        {message.map((ele, index) => (
                            <div
                                key={index}
                                className={`apple-live px-4 py-3 text-[18px] rounded-2xl max-w-[70%] break-words ${ele.role === "user"
                                        ? "bg-violet-600 text-white self-end"
                                        : "bg-gray-700 text-white self-start"
                                    }`}
                            >
                                {ele.content}
                            </div>
                        ))}

                        {/* Normal auto-scroll anchor */}
                        <div ref={bottomRef} />
                    </div>
                </ScrollAnimation>


                <div className="mt-15">
                    <form aciton="" onSubmit={sendValue}>
                        <div className={`display flex flex-row justify-between text-[20px] w-full px-5 py-2 h-[40px] rounded-2xl border text-sm font-medium
                border-violet-500 text-violet-400 
                transition-all  hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-violet-500`}>
                            <input
                                type="text"
                                placeholder="Type your message"
                                className="  -mt-2.5 w-full text-[20px]  px-5 py-2 h-[40px] rounded-2xl border text-sm font-medium
                border-violet-500 text-violet-400
                transition-all  hover:text-white focus:outline-none border-none  focus:ring-violet-500 "
                                value={text.message}
                                name="message"
                                onChange={handleValue}
                            />

                            <button className="hover:text-purple-600 transition-all animate-pulse mr-2 " type="submit"><Send /></button>
                        </div>
                    </form>
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
        </>
    )
}
