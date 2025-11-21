import "/src/index.css"; 

const Animations = () => {
    const boxes = [

        { name: "fadein", className: "animate-fadein" },
        { name: "fadeout", className: "animate-fadeout" },


        { name: "fadeindown", className: "animate-fadeindown" },
        { name: "fadeinup", className: "animate-fadeinup" },
        { name: "fadeinleft", className: "animate-fadeinleft" },
        { name: "fadeinright", className: "animate-fadeinright" },


        { name: "fadeoutdown", className: "animate-fadeoutdown" },
        { name: "fadeoutup", className: "animate-fadeoutup" },
        { name: "fadeoutleft", className: "animate-fadeoutleft" },
        { name: "fadeoutright", className: "animate-fadeoutright" },


        { name: "fadeouttopleft", className: "animate-fadeouttopleft" },
        { name: "fadeouttopright", className: "animate-fadeouttopright" },


        { name: "fadeinup2", className: "animate-fadeinup" },
        { name: "fadeinleft2", className: "animate-fadeinleft" },
        { name: "fadeinright2", className: "animate-fadeinright" },
        { name: "fadeoutdown2", className: "animate-fadeoutdown" },
        { name: "fadeoutup2", className: "animate-fadeoutup" },
        { name: "fadeoutleft2", className: "animate-fadeoutleft" },
        { name: "fadeoutright2", className: "animate-fadeoutright" },
    ];


    const shadowColors = [
        "shadow-red-500",
        "shadow-blue-500",
        "shadow-green-500",
        "shadow-yellow-500",
        "shadow-pink-500",
        "shadow-purple-500",
        "shadow-orange-500",
        "shadow-cyan-500",
        "shadow-lime-500",
        "shadow-amber-500",
        "shadow-emerald-500",
        "shadow-violet-500",
        "shadow-teal-500",
        "shadow-rose-500",
        "shadow-sky-500",
        "shadow-indigo-500",
        "shadow-fuchsia-500",
        "shadow-gray-500",
        "shadow-stone-500",
        "shadow-neutral-500",
        "shadow-zinc-500",
    ];

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-190 relative">
            {/* Title */}
            <div
                className="absolute text-center text-3xl  font-semibold tracking-wide top-6 md:top-90 z-20
        bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 
        bg-[length:200%_200%] animate-gradient text-transparent bg-clip-text "
            >
                Chatter AI
            </div>

            {/* Responsive Animation Grid */}
            <div
            className="grid 
            grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 
            gap-4 sm:gap-6 md:gap-8 
            p-4 md:p-6 lg:p-8
            justify-items-center
            w-full md:w-[100] mx-auto
        "
            >
                {boxes.map((box, index) => {
                    const shadowColor = shadowColors[index % shadowColors.length];

                    return (
                        <div
                            key={index}
                            className={`flex items-center justify-center 
                w-20 h-20 sm:w-20 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32  
                ${box.className}`}
                        >
                            <img
                                src="/img/icon/icon-removebg-preview.png"
                                alt={box.name}
                                className={`object-contain w-10 h-10 sm:w-20 sm:h-20 md:w-24 md:h-24 
                                opacity-90 hover:opacity-100 transition-all duration-700 
                                rounded-2xl shadow-2xl ${shadowColor} animate-violet-spectrum`}
                                onError={(e) => (e.target.src = "/img/avat4r.png")}
                            />
                    </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Animations;
