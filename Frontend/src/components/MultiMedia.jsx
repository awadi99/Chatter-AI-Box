import React, { useRef } from "react";
import { ImagePlus } from "lucide-react";

function MultiMedia({ setImagePreview, setSelectedImageBase64 }) {
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setSelectedImageBase64(reader.result);
        };

        reader.readAsDataURL(file);
    };

    return (
        <>
        <div className="flex justify-center items-center mr-2">
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            <button
    
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className=" animate-pulse text-purple-400 transition-all"
            >
                <ImagePlus size={22}/>
            </button>
            </div>
        </>
    );
}

export default MultiMedia;
