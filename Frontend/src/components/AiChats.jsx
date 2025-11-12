import axios from 'axios';
import React, { useState } from 'react'
import { toast, Zoom, ToastContainer } from 'react-toastify';
import { Send, X } from 'lucide-react';
import { getChatId } from './../../redux/chatID.js'
import { setActive } from './../../redux/chatSlice.js'
import { useDispatch } from 'react-redux';

export function AiChats() {
    const [text, SetText] = useState({
        message: ""
    });

    const [message, setMessage] = useState([]);

    const handleValue = (event) => {
        const { name, value } = event.target;
        SetText({ ...text, [name]: value });
    }

    const sendValue = async (e) => {
        e.preventDefault();
        if (!text.message.trim()) return;

        setMessage(prev => [...prev, { role: "user", content: text.message }]);
        try {
            const res = await axios.post("http://localhost:3000/api/messages/ai", {
                message: text.message,
            })
            setMessage(prev => [...prev, { role: "ai", content: res.data.reply }]);
            SetText({
                message: ""
            });
            toast.success("Message sent!");
            console.log(res.data.reply);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data.reply || "something went wrong");
        }
    }

    const dispatch = useDispatch();
    const crossFunction = (value) => {
        dispatch(setActive(value));
        dispatch(getChatId(value));
    }

    return (
        <>
        <div className='h-[650px]'>
            <div
                className={` p-3 mt-2 w-auto rounded-2xl cursor-pointer text-violet-400
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
            <div className="w-full  mb-4 p-4  border-purple-800 rounded-2xl     h-[400px] sm:h-[500px] md:h-[564px]  overflow-y-scroll flex flex-col gap-2">
                {message.map((ele, index) => (
                    <div
                        key={index}
                        className={` font-medium  h-auto p-3 rounded-2xl max-w-[70%] ${ele.role === "user"
                            ? " text-purple-400 self-end"
                            : " text-purple-400 self-start"
                            }`}
                    >
                        {ele.content}
                    </div>
                ))}
            </div>
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