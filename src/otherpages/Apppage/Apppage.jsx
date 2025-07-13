import React from "react";
import img from '../Apppage/header1.png'


function Apppage() {
    return (
        <>
            <div className="h-16 w-screen" style={{ backdropFilter: 'blur(50px)', backgroundColor: 'rgba(1, 1, 1, 1)' }}></div>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center p-20 font-bold">
                    {/* Shadow with darker color to avoid white edges */}
                    <img 
                        className="h-[400px] w-auto shadow-xl rounded-md" 
                        src={img} 
                        alt="" 
                        style={{ 
                            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.7)',  // Darker shadow to avoid white appearance
                            borderRadius: '30px'  // Optional: round corners to soften edges
                        }} 
                    />
                </div>
                </div>
        </>
    )
}

export default Apppage;