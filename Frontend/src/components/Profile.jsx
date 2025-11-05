import axios from "axios";
import { useSelector } from "react-redux";
import { logout } from '.././../redux/slice.js'
import { useDispatch } from "react-redux";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { LogOut, Volume2 } from "lucide-react";
function Profile() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin =JSON.parse(localStorage.getItem("user"));

    const logOut1 = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/auth/logout");
            if (userLogin) {
                toast.success("Logout Successful", {
                    onClose: () => navigate('/login')
                });
            }
            dispatch(logout(res.data));
        } catch (err) {
            console.error("server error", err);
            toast.error("Server error");
        }
    }

    return (
        <div className=" h-auto w-auto   rounded-2xl">
            <div className=" cursor-pointer w-full h-min-auto flex justify-between gap-3 p-2 bg-slate-700 rounded-2xl contrast-150">
                <div className=" flex items-center gap-2">
                    <img className=" bg-cover h-15 rounded-full ring-success ring-offset-base-100 ring ring-offset-2"  src="/img/avatar.png" alt="" />
                    <div className="p-1">
                        <h1 className="text-[21px] font-light ">{user?.fullName || userLogin?.fullName}</h1>
                        <p className="text-[13px] mt-1 font-extralight opacity-60 hover:opacity-100 transition-all">online  </p>
                    </div>
                </div>
                <div className="flex justify-around gap-3">
                    <div className="p-1 translate-2 h-8 w-auto opacity-40 hover:opacity-100   rounded-[50%]  transition-all duration-600 cursor-pointer bg-gray-600 flex items-center justify-center">
                        <LogOut onClick={logOut1} />
                    </div>
                    <div className="mr-2 p-1 translate-2 h-8 w-auto opacity-40 hover:opacity-100   rounded-[50%]  transition-all duration-600 cursor-pointer bg-gray-600 flex items-center justify-center">
                        <Volume2 />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;