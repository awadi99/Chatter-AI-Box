import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast, Zoom, ToastContainer } from 'react-toastify';
import { Send ,X} from 'lucide-react';
import { getChatId } from './../../redux/chatID.js'
import { setActive } from './../../redux/chatSlice.js'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


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
            const res = await axios.get(`http://localhost:3000/api/messages/${userid}`,{
                withCredentials:true
            });
            setResponse(res.data);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.msg);
        }
    }

    // get ChatProfile 
    const getChatProfile = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/messages/chats/${userid}`);
            setChatProfile(res.data);
            console.log("profile",res);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.msg);
        }
    }
    useEffect(() => {
        if (userid) {
            getMessage();
            getChatProfile();
        }
    }, [userid]);


    const crossFunction=(value)=>{
    dispatch(setActive(value));  
    dispatch(getChatId(value));
    setResponse([]);             
    setChatProfile(null);        
    }  


    return (
        <>
            <div className="w-full  mb-4 p-4  border-purple-800 rounded-2xl h-[650px] overflow-y-scroll flex flex-col gap-2">
                {chatProfile && (
                    <div  className="cursor-pointer w-full h-min-auto flex justify-between gap-3 p-2 bg-slate-700 rounded-2xl contrast-150">
                        <div className=" flex items-center gap-2 p-2">
                            <div className="avatar avatar-online ring-success ring-offset-black rounded-full ring-2 ring-offset-2">
                                <button className="size-15 rounded-full overflow-hidden relative group">
                                    <img src={chatProfile?.profilePic || "/img/avatar.png"} alt="" className="object-cover size-full"  onError={(e) => (e.target.src = "/img/avat4r.png")}/>
                                </button>
                            </div>
                            <div className="p-1">
                                <h1 className="text-[21px] font-light hover:text-purple-400 transition-colors ">{chatProfile?.fullName}</h1>
                                <p className="text-[13px] mt-1 font-extralight opacity-60 hover:opacity-100 transition-all">online  </p>
                            </div>
                        </div>
                        <div className='opacity-40 p-3 hover:opacity-100 hover:animate-pulse transition-all'><X onClick={()=>crossFunction(null)}/></div>
                    </div>
                )}
                {response.map((ele, index) => (
                    <div
                        key={index}
                        className={` font-medium  h-auto p-3 rounded-2xl max-w-[70%] ${ele.role === "user"
                            ? " text-purple-400 self-end"
                            : " text-purple-400 self-start"
                            }`}
                    > 
                        {ele.text}
                    </div>
                ))}
            </div>
            <div className=''>
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
        </>
    )
}

export default Input