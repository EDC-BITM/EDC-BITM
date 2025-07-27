import React from "react";

export default function Register() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-10 sm:py-16 md:py-20 bg-transparent">
      <h1
        className="
          font-michroma font-normal 
          text-4xl sm:text-5xl md:text-6xl lg:text-[88.83px]
          leading-tight md:leading-[100px]
          tracking-tight md:tracking-[-4px]
          text-center align-middle mb-6 md:mb-8
          max-w-[90%]
        "
        style={{
          backgroundImage: "linear-gradient(90deg, #2F80ED 0%, #BB6BD9 50%, #F2994A 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        IAT Igniting Tomorrow’s<br />
        Tech Today.
      </h1>
      <button
        className="
          mt-6 md:mt-8 
          px-6 sm:px-8 md:px-10 
          py-2 sm:py-3 md:py-4
          rounded-full 
          bg-[#3A3A4E]
          font-orbitron font-semibold 
          text-lg sm:text-xl md:text-[25px]
          leading-[20px] tracking-normal 
          align-middle border border-[#4B4475]
          hover:scale-105 transition-transform
        "
      >
        <span
          style={{
            backgroundImage: "linear-gradient(90deg, #2F80ED 0%, #BB6BD9 50%, #F2994A 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          REGISTER
        </span>
      </button>
    </section>
  );
}
