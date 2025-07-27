const SpeakerCard = () => {
  return (
    <div
      className="flex flex-col md:flex-row max-w-full md:max-w-3xl rounded-xl overflow-hidden p-4 md:p-6 gap-4 md:gap-8 items-center"
      style={{
        borderRadius: "1rem",
        border: "1px solid rgba(209, 170, 215, 0.10)",
        background: "rgba(255, 255, 255, 0.05)",
        boxShadow:
          "0 24px 48px 1px rgba(199, 211, 234, 0.05) inset, 0 1px 1px 1px rgba(199, 211, 234, 0.12) inset",
      }}
    >
      <div className="flex items-center justify-center bg-opacity-20 rounded-full w-32 h-32 md:w-48 md:h-48 shadow-md">
        <img
          src="https://avatar.iran.liara.run/public"
          alt="Speaker"
          className="rounded-full size-28 md:w-40 md:h-40 object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 text-center md:text-left w-full">
        <div
          className="text-[#D1AAD7] font-inter text-lg md:text-xl font-semibold tracking-wide"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Tech Talk
        </div>
        <div
          className="text-white"
          style={{
            fontFamily: "Raleway, sans-serif",
            fontSize: "1.5rem",
            lineHeight: "2rem",
            textShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <span className="md:text-3xl" style={{ fontSize: "inherit" }}>
            Navigating an AI-Enabled Future
          </span>
        </div>
        <div
          className="font-inter mt-8 font-medium text-base md:text-lg"
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
