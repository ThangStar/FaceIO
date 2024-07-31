"use client"
import React, { useEffect } from "react";
import gsap from "gsap";
// import Logo from "../svg/Logo";

const PreLoader: React.FC = () => {
    useEffect(() => {
        const tl = gsap.timeline();

        // Preloader Animation
        const preLoaderAnim = () => {
            tl
                .set(".t1", { y: 100, x: -100 })
                .set(".t2", { y: 100, })
                .set(".t3", { x: 200, })
                .set(".t3", { x: 200, })
                .from(".t1", { duration: 1 })
                .set(".initial", { display: "block" })
                .to(".t1", { rotation: 360, x: 0, y: 0, duration: 0.8 })
                .to(".t2", { y: 0, duration: 0.8 })
                .to(".t3", { x: 0, duration: 0.8 })
                .to(".t3", { x: 0, duration: 0.8 })

                .to(".t1", { y: 100, duration: 0.2 })
                .to(".t2", { y: 100, duration: 0.2 })
                .to(".t3", { y: 100, duration: 0.2 })
                .to(".anim-c", { y: '-100%', opacity: 0.8, display: 'none', duration: 1})
        }
        preLoaderAnim();
        return () => { 
            tl.clear()
        }
    }, []);

    return (
        <div className="anim-c w-screen h-screen absolute z-30">
            <div className="h-screen w-screen bg-base-100 z-10 absolute"></div>
            <div className="h-screen initial w-screen bg-base-100 z-20 hidden fixed">
                <div className="flex justify-center items-center h-full">
                    <div>
                        <div className="flex justify-center items-center overflow-hidden px-12 py-8 text-3xl ">
                            <span className="t1">Hi,</span>
                            <span className="t2 pr-2">Welcome</span>
                            <span className="t3">Back!</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PreLoader;