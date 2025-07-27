const SpeakerCard = () => {
  return (
    <div
      className="flex flex-col sm:flex-row w-full max-w-full sm:max-w-2xl lg:max-w-3xl rounded-xl overflow-hidden p-3 sm:p-4 lg:p-6 gap-3 sm:gap-4 lg:gap-8 items-center"
      style={{
        borderRadius: "1rem",
        border: "1px solid rgba(209, 170, 215, 0.10)",
        background: "rgba(255, 255, 255, 0.05)",
        boxShadow:
          "0 24px 48px 1px rgba(199, 211, 234, 0.05) inset, 0 1px 1px 1px rgba(199, 211, 234, 0.12) inset",
      }}
    >
      <div className="flex items-center justify-center bg-opacity-20 rounded-full w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 shadow-md flex-shrink-0">
        <img
          src="https://avatar.iran.liara.run/public"
          alt="Speaker"
          className="rounded-full w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40 object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 text-center sm:text-left w-full">
        <div
          className="text-[#D1AAD7] font-inter text-sm sm:text-lg lg:text-xl font-semibold tracking-wide"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Tech Talk
        </div>
        <div
          className="text-white text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-tight sm:leading-relaxed"
          style={{
            fontFamily: "Raleway, sans-serif",
            textShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          Navigating an AI-Enabled Future
        </div>
        <div
          className="font-inter mt-4 sm:mt-6 lg:mt-8 font-medium text-sm sm:text-base lg:text-lg"
          style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          By Eric Johnson
        </div>
      </div>
    </div>
  );
};

export default SpeakerCard;
