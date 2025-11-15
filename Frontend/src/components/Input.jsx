import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Zoom, ToastContainer } from 'react-toastify';
import { Send, X } from 'lucide-react';
import { getChatId } from './../../redux/chatID.js'
import { setActive } from './../../redux/chatSlice.js'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showToast } from './Notification_sound.jsx';


function Input() {

    const userid = useSelector((state) => state.chatId.userId);
    const dispatch = useDispatch();
    const [text, SetText] = useState({
        message: ""
    });

    const handleValue = (event) => {
        const { name, value } = event.target;
        SetText({ ...text, [name]: value });
    }

    const sendValue = async (e) => {
        e.preventDefault();
    }


    const [response, setResponse] = useState([]);
    const [chatProfile, setChatProfile] = useState([]);



    // get all message
    const getMessage = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/messages/${userid}`, {
                withCredentials: true
            });
            setResponse(res.data);
        } catch (err) {
            console.error(err);
            showToast(err.response?.data?.msg || "Internal server error", "error");
        }
    }




    // get ChatProfile '
    const [find, setFind] = useState([]);
    const getChatProfile = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/messages/chats/${userid}`, {
                withCredentials: true
            });
            setFind({ id: res.data._id })
            console.log("id =",res.data._id);

            setChatProfile(res.data);
        } catch (err) {
            console.error(err);
            showToast(err.response?.data?.msg || " internal server problem", "error");
        }
    }
    useEffect(() => {
        if (userid) {
            getMessage();
            getChatProfile();
        }
    }, [userid]);


    const crossFunction = (value) => {
        dispatch(setActive(value));
        dispatch(getChatId(value));
        setResponse([]);
        setChatProfile(null);
    }

    const [items, setItems] = useState();
    const [translate, setTranslate] = useState({});


    const translateText = async (text, targetLang) => {
        try {
            const res = await axios.get(
                "https://translate.googleapis.com/translate_a/single",
                {
                    params: {
                        client: "gtx",
                        sl: "auto",
                        tl: targetLang,
                        dt: "t",
                        q: text
                    }, withCredentials: false
                }
            );

            return res.data[0][0][0];

        } catch (err) {
            console.error("Translation error:", err);
            showToast("Translation failed", "error");
            return "";
        }
    };


    const handleTranslate = async (text, lang, index) => {
        setTranslate(prev => ({ ...prev, [index]: "Translating..." }));
        const output = await translateText(text, lang);
        setTranslate(prev => ({ ...prev, [index]: output }));
        setItems(null);
    };


    return (
        <>
            <div className="w-full  mb-4 p-4 border-purple-800 rounded-2xl h-[650px] flex flex-col gap-2">
                {chatProfile && (
                    <div className="cursor-pointer w-full h-min-auto flex justify-between gap-3 p-2 bg-slate-700 rounded-2xl contrast-150">
                        <div className="flex items-center gap-2 p-2">
                            <div className="avatar avatar-online ring-success ring-offset-black rounded-full ring-2 ring-offset-2">
                                <button className="size-15 rounded-full overflow-hidden relative group">
                                    <img src={chatProfile?.profilePic || "/img/avatar.png"} alt="" className="object-cover size-full" />
                                </button>
                            </div>
                            <div className="p-2">
                                <h1 className="-mt-2 text-2xl font-semibold tracking-wide bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-[length:200%_200%] animate-gradient text-transparent bg-clip-text">
                                    {chatProfile?.fullName}
                                </h1>
                                <p className="text-[13px] -mt-1 font-extralight opacity-60 hover:opacity-100 transition-all">
                                    online
                                </p>
                            </div>
                        </div>
                        <X
                            className="mr-6 mt-4 hover:animate-spin cursor-pointer text-purple-400 hover:text-purple-500 transition-transform duration-300 hover:scale-110"
                            onClick={() => crossFunction(null)}
                        />
                    </div>
                )}

                {response.map((ele, index) => (
                    <div
                        key={index}
                        className={`text-[22px] overflow-y-auto font-medium h-auto p-3 rounded-2xl max-w-[100%]
                        ${ele.role === "user" ? "text-purple-400 self-end" : "text-purple-400 self-start"}`}>

                        <div className='cursor-pointer fixed flex gap-3 justify-center items-center'>
                            <div className='apple-live bg-violet-600 inline-block px-6 py-4 text-lg font-medium'>
                                {
                                        (translate[index] ? translate[index] : ele.text)
                                }
                            </div>
                            <img
                                src="/img/icon/icon-removebg-preview.png"
                                className='object-cover h-10 w-auto cursor-pointer'
                                onClick={() => setItems(items === index ? null : index)}
                            />

                            {items === index && (
                                <div className="apple-live absolute z-20 bg-white shadow-lg rounded-xl p-2 flex flex-col gap-2 w-max max-w-[80vw] left-full ml-3 top-0 max-sm:left-0 max-sm:ml-0 max-sm:top-full max-sm:mt-2">

                                    <div className="p-2 px-4 hover:bg-gray-600 cursor-pointer rounded-md"
                                        onClick={() => handleTranslate(ele.text, 'mr', index)}>
                                        Marathi
                                    </div>

                                    <div className="p-2 px-4 hover:bg-gray-600 cursor-pointer rounded-md"
                                        onClick={() => handleTranslate(ele.text, 'hi', index)}>
                                        Hindi
                                    </div>

                                    <div className="p-2 px-4 hover:bg-gray-600 cursor-pointer rounded-md"
                                        onClick={() => handleTranslate(ele.text, 'en', index)}>
                                        English
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                
            </div>


            <div className="mt-24 ">
                <form onSubmit={sendValue}>
                    <div className="display flex flex-row justify-between text-[20px] w-full px-5 py-2 h-[40px] rounded-2xl border text-sm font-medium
                    border-violet-500 text-violet-400 transition-all hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-violet-500 ">

                        <input
                            type="text"
                            placeholder="Type your message"
                            className=" -mt-2.5 w-full text-[20px] px-5 py-2 h-[40px] rounded-2xl border text-sm font-medium
                            border-violet-500 text-violet-400 transition-all hover:text-white focus:outline-none border-none focus:ring-violet-500 "
                            value={text.message}
                            name="message"
                            onChange={handleValue}
                        />

                        <button className="hover:text-purple-600 transition-all animate-pulse mr-2" type="submit">
                            <Send />
                        </button>
                    </div>
                </form>

                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    theme="dark"
                    transition={Zoom}
                />
            </div>
        </>
    );
}

export default Input;
