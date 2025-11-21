import { ToastContainer, toast, Zoom } from "react-toastify"

const notification = new Audio("/sound/notification.mp3");
notification.volume = 1;

export const showToast = (msg, type = "success",options={}) => {
    notification.currentTime = 0;
    notification.play().catch(()=>{});
    if (type === "success") {
        toast.success(msg,options)
    }
    else {
        toast.error(msg,options);
    }
}

function Notification_sound() {

    return (
        <>
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
        </>
    )
}

export default Notification_sound