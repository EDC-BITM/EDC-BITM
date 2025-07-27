import SpeakerCard from "./SpeakerCard";

const FeaturedSpeaker = () => {
  return (
    <div className="relative mb-16 flex  justify-center">
      <div className="flex flex-col items-center">
        <h2
          className="text-center text-4xl sm:text-6xl md:text-8xl font-normal leading-tight sm:leading-[5.56rem] tracking-tight sm:tracking-[-0.0556rem] bg-gradient-to-r from-[#2461E2] via-[#2461E2] to-[#FDA011] bg-clip-text text-transparent"
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
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {Array.from({ length: 2 }).map((_, index) => (
            <SpeakerCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSpeaker;
