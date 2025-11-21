import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../socket";
import { setOnlineUsers } from "../../redux/onlineUserSlice";

export default function AuthOnline() {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();   
        }

        socket.on("getOnlineUser", (users) => {
            dispatch(setOnlineUsers(users));
        });

        return () => {
            socket.off("getOnlineUser");
        };

    }, [dispatch]);

    return null;
}
