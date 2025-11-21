import axios from "axios";
import { useSelector } from "react-redux";
import { logout } from '.././../redux/slice.js'
import { toggleSound } from "../../redux/soundSlice.js";
import { useDispatch } from "react-redux";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { LogOut, Volume2, VolumeOff } from "lucide-react";
import { useState, useRef } from "react";
import { showToast } from "./Notification_sound.jsx";
import { socket } from "../socket.js";
function Profile() {


    const user = useSelector((state) => state.auth.user);
    const isSoundEnabled = useSelector((state) => state.sound.isSoundEnabled);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = JSON.parse(localStorage.getItem("user"));

    const [Image, setImage] = useState(null);
    const fileInputRef = useRef(null);


    const playClickSound =()=>{
        if(!isSoundEnabled) return ;
        const s = new Audio("/sound/mouse-click.mp3");
        s.play().catch(()=>{});
    }

    const logOut1 = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/auth/logout");
            socket.disconnect();
            if (userLogin) {
                toast.success("Logout Successful", {
                    onClose: () => navigate('/login')
                });
            }
            dispatch(logout(res.data));
            playClickSound();

        } catch (err) {
            console.error("server error", err);
            showToast("Server error", "error");
        }
    }

    const toggleSoundHandler =()=>{
        dispatch(toggleSound());
        const s = new Audio("/sound/mouse-click.mp3");
        s.play().catch(()=>{});
    }


    const handValue = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            toast.error("Please select an image first");
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Image = reader.result;
            console.log(base64Image);
            setImage(base64Image);
            playClickSound();

            try {
                const res = await axios.put("http://localhost:3000/api/auth/update-profile",
                    { profilePic: base64Image },
                    { withCredentials: true }

                );
                toast.success(res.data || "Upload Success");
                setImage(null)
            } catch (err) {
                console.error(err);
                toast.error(err.response?.data?.msg || "Server Error");
            }
        }
    }
    return (
        <div className=" h-auto w-auto   rounded-2xl">
            <div className=" cursor-pointer w-full h-min-auto flex justify-between gap-3 p-2 bg-slate-700 rounded-2xl contrast-150">
                <div className=" flex items-center gap-2">
                    <div className="avatar avatar-online ring-success ring-offset-black rounded-full ring-2 ring-offset-2">
                        <button className="size-15 rounded-full overflow-hidden relative group" onClick={() => fileInputRef.current.click()}>
                            <img src={Image || user?.profilePic || userLogin?.profilePic || "/img/avatar.png"} alt="" className="object-cover size-full" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-white text-xs">Change</span>
                            </div>
                        </button>
                        <input type="file" accept="image/*" className="hidden" name="" id="" ref={fileInputRef} onChange={handValue} />
                    </div>
                    <div className="p-2">
                        <h1
                            className="-mt-2 text-[20px] font-semibold tracking-wide
                            bg-gradient-to-r from-purple-500 via-fuchsia-500 to-blue-500 
                            bg-[length:200%_200%] animate-gradient text-transparent bg-clip-text"
                        >
                            {user?.fullName || userLogin?.fullName}
                        </h1>
                        <p className="text-[13px] mt-1 font-extralight opacity-60 hover:opacity-100 transition-all">
                            online
                        </p>
                    </div>

                </div>
                <div className="flex justify-around gap-3">
                    <div className="p-1 translate-2 h-8 w-auto opacity-40 hover:opacity-100   rounded-[50%]  transition-all duration-600 cursor-pointer bg-gray-600 flex items-center justify-center">
                        <LogOut onClick={logOut1} />
                    </div>
                    <button className="mr-2 p-1 translate-2 h-8 w-auto opacity-40 hover:opacity-100   rounded-[50%]  transition-all duration-600 cursor-pointer bg-gray-600 flex items-center justify-center"
                        onClick={toggleSoundHandler}>
                        {isSoundEnabled ? <Volume2/> : <VolumeOff/>}
                    </button>
                </div>
            </div>
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
    )
}

export default Profile;