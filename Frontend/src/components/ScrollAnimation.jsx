import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function ScrollAnimation({ children, className = "" }) {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (!scrollRef.current) return;

        const lenis = new Lenis({
            wrapper: scrollRef.current,
            content: scrollRef.current.querySelector("[data-lenis-content]"),
            smooth: true,
            smoothWheel: true,
            smoothTouch: true,
            lerp: 0.5, // smaller = smoother (default 0.1)
            wheelMultiplier: 1, // reduce wheel speed
            touchMultiplier: 1, // control mobile scroll
            orientation: "vertical",
        });

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return (
        <div
            ref={scrollRef}
            className={`overflow-hidden transition-all duration-700 ease-out ${className}`}
        >
            <div data-lenis-content>{children}</div>
        </div>
    );
}
