import React from "react";
import img from '../Apppage/header1.png'

function Apppage() {
    return (
        <>
            <div className="h-16 w-screen" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
            <div className=" flex flex-col justify-center items-center ">
                <div data-aos="zoom-out" data-aos-anchor-placement="center-bottom">
                    <div className=" flex flex-col justify-center items-center p-20 font-bold">
                        <img className="h-[400px] w-auto" src={img} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Apppage