import React, { useState } from 'react'

function Input() {
    const [text, SetText] = useState({
        message: ""
    });

    const handleValue=(event)=>{
        const {name,value}=event.target;
        SetText({ ...text, [name]: value });
    }


    return (
        <div className=''>
            <input
                type="text"
                className={`text-[20px] w-full px-4 py-2 h-[40px] rounded-2xl border text-sm font-medium
                border-violet-500 text-violet-400
                transition-all  hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500`}
                placeholder="Type your message"
                value={text.message}
                name="message"
                onChange={handleValue}
            /> </div>
    )
}

export default Input