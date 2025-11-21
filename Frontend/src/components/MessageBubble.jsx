import React, { memo } from "react";

function MessageBubble({ ele, translate, show, setShow, items, setItems, handleTranslate }) {

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;
    const isSender = String(ele.senderId) === String(userId);

    return (
        <div
            className={`h-auto text-[22px] font-medium p-3 rounded-2xl max-w-[70%] 
                ${isSender ? "self-end" : "self-start"}
            `}
        >

            <div className="relative flex gap-2">

                {/* MESSAGE BUBBLE */}
                <div
                    className="apple-live bg-violet-600 px-6 py-4 text-lg font-medium rounded-xl cursor-pointer"
                    onClick={() => setShow(show === ele._id ? null : ele._id)}
                >
                    {ele.image && (
                        <div className="object-cover p-0.5 rounded-2xl">
                            <img src={ele?.image} alt="" className="rounded-2xl max-h-[250px]" />
                        </div>
                    )}
                    {translate[ele._id] ? translate[ele._id] : ele.text}
                </div>

                {/* ICON SHOULD NOT MOVE */}
                {!isSender && show === ele._id && (
                    <img
                        src="/img/icon/icon-removebg-preview.png"
                        className="h-10 w-auto cursor-pointer"
                        onClick={() => setItems(items === ele._id ? null : ele._id)}
                    />
                )}

                {/* TRANSLATE MENU SHOWS BELOW BUBBLE */}
                {!isSender && items === ele._id && (
                    <div className="apple-live absolute top-full mt-3 left-0 z-20 bg-gray-900 text-white shadow-lg rounded-xl p-2 flex flex-col gap-2 w-max">

                        <div
                            className="p-2 px-4 hover:bg-gray-700 cursor-pointer rounded-md"
                            onClick={() => handleTranslate(ele.text, "mr", ele)}
                        >
                            Marathi
                        </div>

                        <div
                            className="p-2 px-4 hover:bg-gray-700 cursor-pointer rounded-md"
                            onClick={() => handleTranslate(ele.text, "hi", ele)}
                        >
                            Hindi
                        </div>

                        <div
                            className="p-2 px-4 hover:bg-gray-700 cursor-pointer rounded-md"
                            onClick={() => handleTranslate(ele.text, "en", ele)}
                        >
                            English
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}

export default memo(MessageBubble);
