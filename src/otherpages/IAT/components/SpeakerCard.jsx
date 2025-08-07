// const SpeakerCard = () => {
//   return (
//     <div
//       className="flex flex-col sm:flex-row w-full max-w-full sm:max-w-2xl lg:max-w-3xl rounded-xl overflow-hidden p-3 sm:p-4 lg:p-6 gap-3 sm:gap-4 lg:gap-8 items-center"
//       style={{
//         borderRadius: "1rem",
//         border: "1px solid rgba(209, 170, 215, 0.10)",
//         background: "rgba(255, 255, 255, 0.05)",
//         boxShadow:
//           "0 24px 48px 1px rgba(199, 211, 234, 0.05) inset, 0 1px 1px 1px rgba(199, 211, 234, 0.12) inset",
//       }}
//     >
//       <div className="flex items-center justify-center bg-opacity-20 rounded-full w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 shadow-md flex-shrink-0">
//         <img
//           src="https://avatar.iran.liara.run/public"
//           alt="Speaker"
//           className="rounded-full w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40 object-cover"
//         />
//       </div>
//       <div className="flex flex-col gap-2 text-center sm:text-left w-full">
//         <div
//           className="text-[#D1AAD7] font-inter text-sm sm:text-lg lg:text-xl font-semibold tracking-wide"
//           style={{ fontFamily: "Inter, sans-serif" }}
//         >
//           Tech Talk
//         </div>
//         <div
//           className="text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-tight sm:leading-relaxed"
//           style={{
//             fontFamily: "Raleway, sans-serif",
//             textShadow: "0 2px 8px rgba(0,0,0,0.15)",
//           }}
//         >
//           Navigating an AI-Enabled Future
//         </div>
//         <div
//           className="font-inter mt-4 sm:mt-6 lg:mt-8 font-medium text-sm sm:text-base lg:text-lg"
//           style={{
//             color: "rgba(255, 255, 255, 0.7)",
//             fontFamily: "Inter, sans-serif",
//           }}
//         >
//           By Eric Johnson
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpeakerCard;

import React from "react";
import { FaQuestion } from "react-icons/fa6";

const SpeakerCard = () => {
  return (
    <div
      className="flex flex-col sm:flex-row w-full max-w-full sm:max-w-2xl lg:max-w-3xl rounded-xl overflow-hidden p-3 sm:p-4 lg:p-6 gap-3 sm:gap-4 lg:gap-8 items-center relative group hover:scale-[1.02] transition-all duration-300"
      style={{
        borderRadius: "1rem",
        border: "1px solid rgba(209, 170, 215, 0.10)",
        background: "rgba(255, 255, 255, 0.05)",
        boxShadow:
          "0 24px 48px 1px rgba(199, 211, 234, 0.05) inset, 0 1px 1px 1px rgba(199, 211, 234, 0.12) inset",
      }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

      {/* Speaker Avatar Placeholder */}
      <div className="flex items-center justify-center bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 shadow-md flex-shrink-0 relative overflow-hidden group-hover:shadow-lg transition-all duration-300">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

        {/* Question mark icon */}
        <div className="text-white/60 text-3xl sm:text-4xl lg:text-6xl font-light">
          <FaQuestion className="animate-pulse" />
        </div>

        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-pulse"></div>
      </div>

      <div className="flex flex-col gap-2 text-center sm:text-left w-full relative z-10">
        {/* Event Type Badge */}
        <div className="flex items-center justify-center sm:justify-start">
          <span
            className="text-[#D1AAD7] font-inter text-sm sm:text-lg lg:text-xl font-semibold tracking-wide px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/20"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Tech Talk
          </span>
        </div>

        {/* Title */}
        <div
          className="text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-tight sm:leading-relaxed italic opacity-70 blur-xs animate-pulse"
          style={{
            fontFamily: "Raleway, sans-serif",
            textShadow: "0 2px 8px rgba(0,0,0,0.15)",
            letterSpacing: "0.01em",
          }}
        >
          Comming Soon:
        </div>

        {/* Speaker Status */}
        <div className="flex items-center justify-center sm:justify-start gap-2 mt-4 sm:mt-6 lg:mt-8">
          <div className="flex items-center gap-2">
            {/* Animated dots */}
            <div className="flex gap-1">
              <div
                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>

            <span
              className="font-inter font-medium text-sm sm:text-base lg:text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300"
              style={{
                fontFamily: "Inter, sans-serif",
              }}
            >
              Speaker Coming Soon
            </span>
          </div>
        </div>

        {/* Additional info */}
        <div
          className="font-inter text-xs sm:text-sm opacity-60 mt-2"
          style={{
            color: "rgba(255, 255, 255, 0.5)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Stay tuned for exciting announcements
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-400/10 to-transparent rounded-bl-3xl"></div>
    </div>
  );
};

export default SpeakerCard;