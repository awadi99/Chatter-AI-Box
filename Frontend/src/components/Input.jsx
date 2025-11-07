import axios from 'axios';
import React, { useState } from 'react'
import { toast, Zoom, ToastContainer } from 'react-toastify';
import { Send } from 'lucide-react';

function Input() {
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

    return (
        <>

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