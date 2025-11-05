import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Contacts() {
    const [userData ,setData]=useState([]);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const getContacts = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/messages/contacts");
                console.log("Contacts:", res.data);
                setData(res.data);
            } catch (err) {
                console.error("Error fetching contacts:", err);
                toast.error(err.response?.data?.msg || "Something went wrong");
            }
        };

        getContacts();
    }, []);

    return (
        <div className="h-120">
            <h3 className="text-lg mb-2 text-violet-400 text-left p-0.2 ">My contacts</h3>
            <div className="overflow-y-scroll h-full ">{userData.length>0&&userData.map((ele, index) => (
                <div className="mt-2 w-auto  rounded-2xl">
                    <div className=" cursor-pointer w-full h-min-auto flex justify-between gap-3 p-2 bg-slate-700 rounded-2xl contrast-150">
                        <div className=" flex items-center gap-2 p-1">
                            <img className=" bg-cover h-15 rounded-full ring-success ring-offset-base-100 ring ring-offset-2" src="/img/avatar.png" alt="" />
                            <div className="p-1">
                                <h1 className="text-[21px] font-light "key={index}>{ele.fullName}</h1>
                                <p className="text-[13px] mt-1 font-extralight opacity-60 hover:opacity-100 transition-all">online  </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>

        </div>
    );
}
