import axios from "axios";
import { useEffect, useState } from "react";
import ScrollAnimation from "./ScrollAnimation";
import { showToast } from "./Notification_sound";
import { useSelector } from "react-redux";
import { getChatId } from "./../../redux/chatID.js";
import { setActive } from "../../redux/chatSlice.js";
import { useDispatch } from "react-redux";



export default function Contacts() {
    const [userData, setData] = useState([]);
    const onlineUsers = useSelector((state) => state.online.onlineUsers || []);
    const dispatch = useDispatch();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const getContacts = async () => {
            try {
                const res = await axios.get("https://chatter-ai-box-backend.onrender.com/api/messages/contacts");
                setData(res.data);
            } catch (err) {
                showToast(err.response?.data?.msg || "Something went wrong", "error");
            }
        };

        getContacts();
    }, []);



    const sendContactUserId=(userid)=>{
        dispatch(setActive("Contact"));
        dispatch(getChatId(userid));
    }



    return (
        <>
            <div>
                <h3 className="z-100 text-lg mb-2 text-violet-400 text-left p-0.2">My contacts</h3>
            </div>

            <ScrollAnimation className="h-160 rounded-2xl bg-transparent">
                <div className="h-full" onClick={setActive}>
                    {userData.length > 0 &&
                        userData.map((ele) => {
                            const isOnline = onlineUsers.includes(ele._id.toString());
                            return (
                                <div key={ele._id} className="mt-2 w-auto rounded-2xl" onClick={()=>sendContactUserId(ele._id)}>
                                    <div className="cursor-pointer w-full h-min-auto flex justify-between gap-3 p-2 bg-slate-700 rounded-2xl contrast-150">
                                        <div className="flex items-center gap-2 p-1">
                                            <div
                                                className={`avatar ${isOnline ? "avatar-online" : ""} rounded-full ring-1 ring-offset-1
                                                ${isOnline ? "ring-success ring-offset-green-500" : "ring-gray-600 ring-offset-purple-500"}`}
                                            >
                                                <div className="size-15 rounded-full overflow-hidden">
                                                    {isOnline ? (
                                                        <img
                                                            src={ele.profilePic || "/img/avatar.png"}
                                                            alt=""
                                                            className="object-cover size-full"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={ele.profilePic || "/img/avatar.png"}
                                                            alt=""
                                                            className="object-cover size-full"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="p-2">
                                                <h1
                                                    className="-mt-2 text-[20px] font-semibold tracking-wide bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-[length:200%_200%] animate-gradient text-transparent bg-clip-text"
                                                >
                                                    {ele.fullName}
                                                </h1>

                                                <p className="text-[13px] mt-1 font-extralight opacity-60 hover:opacity-100 transition-all">
                                                    {isOnline ? "Online" : "Offline"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </ScrollAnimation>
        </>
    );
}
