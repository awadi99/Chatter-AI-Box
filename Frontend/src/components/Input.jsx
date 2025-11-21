import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { Zoom, ToastContainer } from 'react-toastify';
import { Send, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { showToast } from './Notification_sound.jsx';
import useKeyboardSound from '../../hook/useSoundHook.jsx';
import MessageProfile from './MessageProfile.jsx';
import MessageBubble from './MessageBubble.jsx';
import ScrollAnimation from './ScrollAnimation.jsx';
import MultiMedia from './MultiMedia.jsx';
import { socket } from '../socket.js';

function Input() {
    const userid = useSelector((state) => state.chatId.userId);
    const isSoundEnabled = useSelector((state) => state.sound.isSoundEnabled);

    const { playRandomKeyStrokeSound } = useKeyboardSound();

    const [text, SetText] = useState({ message: "" });
    const [response, setResponse] = useState([]);

    const [imagePreview, setImagePreview] = useState(null);
    const [selectedImageBase64, setSelectedImageBase64] = useState(null);

    const bottomRef = useRef(null);

    const playReceiveSound = () => {
        if (!isSoundEnabled) return;
        const s = new Audio("/sound/notification.mp3");
        s.play().catch(() => { });
    };

    const handleValue = (event) => {
        const { name, value } = event.target;
        SetText({ ...text, [name]: value });

        if (isSoundEnabled) playRandomKeyStrokeSound();
    };

    const sendValue = async (e) => {
        e.preventDefault();
        try {
            if (!text.message.trim() && !selectedImageBase64) return;

            const res = await axios.post(
                `https://chatter-ai-box-backend.onrender.com/api/messages/send/${userid}`,
                {
                    text: text.message,
                    image: selectedImageBase64
                },
                { withCredentials: true }
            );

            socket.emit("sendMessage", res.data);

            SetText({ message: "" });
            setImagePreview(null);
            setSelectedImageBase64(null);

        } catch (err) {
            console.error(err);
            showToast("Error sending message", "error");
        }
    };

    const getMessage = async () => {
        try {
            const res = await axios.get(
                `https://chatter-ai-box-backend.onrender.com/api/messages/${userid}`,
                { withCredentials: true }
            );
            setResponse(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (userid) getMessage();
    }, [userid]);

    useEffect(() => {
        if (!userid) return;

        const HandleNewMessage = ((msg) => {
            const myId = String(userid);
            const sender = String(msg.senderId);
            const receiver = String(msg.receiverId);

            if (sender === myId || receiver === myId) {
                setResponse(prev => [...prev, msg]);
                playReceiveSound();
            }
        });

        socket.on("newMessage", HandleNewMessage);
        return () => socket.off("newMessage");

    }, [userid, isSoundEnabled]);

    const [items, setItems] = useState();
    const [translate, setTranslate] = useState({});
    const [show, setShow] = useState(null);

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
                    },
                    withCredentials: false
                }
            );
            return res.data[0][0][0];
        } catch {
            showToast("Translation failed", "error");
            return "";
        }
    };

    const handleTranslate = async (text, lang, ele) => {
        setTranslate(prev => ({ ...prev, [ele._id]: "Translating..." }));
        const output = await translateText(text, lang);
        setTranslate(prev => ({ ...prev, [ele._id]: output }));
        setItems(null);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [response]);

    return (
        <div className="p-2 w-full flex flex-col justify-between h-[775px]">

            {/* TOP PROFILE */}
            <MessageProfile />

            {/* CHAT MESSAGES AREA */}
            <ScrollAnimation className="h-full mt-4 w-full p-4 border-purple-800 h-full rounded-2xl">
                <div className="flex flex-col gap-2">
                    {response.map(ele => (
                        <MessageBubble
                            key={ele._id}
                            ele={ele}
                            translate={translate}
                            show={show}
                            setShow={setShow}
                            items={items}
                            setItems={setItems}
                            handleTranslate={handleTranslate}
                        />
                    ))}
                    <div ref={bottomRef}></div>
                </div>
            </ScrollAnimation>

            {/* MESSAGE INPUT */}
            <div className="mt-6 relative w-full">

                {imagePreview && (
                    <div className="absolute -top-28 left-4 w-fit shadow-2xl shadow-violet-600">
                        <img
                            src={imagePreview}
                            className="w-24 h-24 rounded-xl object-cover border-2 border-purple-500 shadow-lg"
                        />
                        <button
                            onClick={() => {
                                setImagePreview(null);
                                setSelectedImageBase64(null);
                            }}
                            className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full p-1 hover:bg-red-600"
                        >
                            <X size={14} />
                        </button>
                    </div>
                )}

                <form onSubmit={sendValue}>
                    <div className="flex flex-row items-center justify-between text-[20px] w-full px-5 py-2 min-h-[40px] rounded-2xl border border-violet-500 text-violet-400">
                        <input
                            type="text"
                            placeholder="Type your message"
                            className="w-full text-[20px] font-medium px-2 bg-transparent border-none focus:outline-none"
                            value={text.message}
                            name="message"
                            onChange={handleValue}
                        />

                        <div className="mr-2">
                            <MultiMedia
                                imagePreview={imagePreview}
                                setImagePreview={setImagePreview}
                                setSelectedImageBase64={setSelectedImageBase64}
                            />
                        </div>

                        <button
                            className={`hover:text-purple-600 transition ${text.message || selectedImageBase64 ? "animate-pulse text-purple-500" : "text-gray-500"}`}
                            type="submit"
                            disabled={!text.message && !selectedImageBase64}
                        >
                            <Send size={22} />
                        </button>
                    </div>
                </form>

                <ToastContainer position="top-center" autoClose={1000} theme="dark" transition={Zoom} />
            </div>
        </div>
    );
}

export default Input;
