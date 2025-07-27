import SpeakerCard from "./SpeakerCard";

const FeaturedSpeaker = () => {
  return (
    <div className="relative mb-16 flex justify-center px-4">
      <div className="flex flex-col items-center w-full max-w-7xl">
        <h2
          className="text-center text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-normal leading-tight sm:leading-[5.56rem] tracking-tight sm:tracking-[-0.0556rem] bg-gradient-to-r from-[#2461E2] via-[#2461E2] to-[#FDA011] bg-clip-text text-transparent mb-4 sm:mb-0"
          style={{
            backgroundImage:
              "linear-gradient(86deg, #2461E2 24.3%, #FDA011 83.39%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Featured Speaker
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6 lg:mt-8 w-full justify-center items-center">
          {Array.from({ length: 2 }).map((_, index) => (
            <SpeakerCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSpeaker;
