import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Chats() {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const getChat = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/messages/chats", {
                    withCredentials: true
                });
                console.log("Chats:", res.data);
                setChats(res.data);
            } catch (err) {
                console.error("Error fetching chats:", err);
                toast.error(err.response?.data?.msg || "Something went wrong");
            }
        };
        getChat();
    }, []);

    return (
        <div>
            <h2>Chats</h2>
            {chats.length > 0 ? (
                chats.map((chat, index) => (
                    <div key={index}>{chat.content}</div> // or chat.message depending on API
                ))
            ) : (
                <p>No chats available</p>
            )}
        </div>
    );
}
