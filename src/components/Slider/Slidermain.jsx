import React from "react";
import Slider from "./Slider";
import blob from "../../assets/blobs.png"
import blobR from "../../assets/blobR.png"


function Slidermain() {

    const handleClick = () => {
        window.open(
            "https://drive.google.com/drive/folders/1UR_3rWjMEXwj9dTGYKmUvXwDJIsesuMg?usp=sharing",
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
            <div className="w-screen sm:p-0 p-4 mt-4">
            <div className="glass-morphic lg:m-20 p-4 lg:p-12 shadow-2xl rounded-2xl">
            <div className="flex flex-row justify-start items-center">
                        <div className="h-[50px] w-[50px] bg-[#FED853]"></div>
                        <h1 className="text-[25px] ml-[-35px] font-bold">Gallery</h1>
                    </div>
                    <div className="mt-6 sm:mt-12">
                        <h1 className="text-[25px] sm:text-[35px] font-bold">Captured Moments</h1>
                    </div>
                    <div className="flex justify-center items-center mt-8 sm:mt-0">
                        <Slider />
                    </div>

                    <div className="flex items-center justify-center">

                        <a href="https://drive.google.com/drive/folders/1UR_3rWjMEXwj9dTGYKmUvXwDJIsesuMg?usp=sharing" target="_blank">
                            <button className="transition ease-in-out hover:scale-110 sm:mt-0 mt-8 p-4 rounded-xl bg-[#FED853] font-bold" onClick={handleClick}>View More</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Slidermain