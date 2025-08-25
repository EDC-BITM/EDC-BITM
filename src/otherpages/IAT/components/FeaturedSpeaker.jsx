import SpeakerCard from "./SpeakerCard";
import striver from "./IatImages/striver.jpg";

const FeaturedSpeaker = () => {
  return (
    <div id = "speakers" className="relative mb-16 flex justify-center px-4">
      <div className="flex flex-col items-center w-full max-w-7xl">
        <h2
          className="text-center text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-normal leading-tight sm:leading-[5.56rem] tracking-tight sm:tracking-[-0.0556rem] bg-clip-text text-transparent mb-4 sm:mb-0"
          style={{
            backgroundImage: "linear-gradient(90deg, #6366F1 0%, #8B5CF6 25%, #EC4899 75%, #F59E0B 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Featured Speakers
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6 lg:mt-8 w-full justify-center items-center">
          
            <SpeakerCard
            title="Renowned math educator with millions of followers, known for making complex concepts simple and accessible"
            name = "By Dr.Gajendra Purohit"
  eventType="Tech Talk"
  statusText="Confirmed Speaker"
  subtitle="Date - 29th August, 2025 | Venue - BIT Mesra"
  imageSrc="https://res.cloudinary.com/dmjoxb8pe/image/upload/v1755164240/gp_w0vg3u.jpg"
  imageAlt="Mentor"
             />
             <SpeakerCard
            title="Founder of Take U Forward, guiding thousands of students to ace coding interviews through clear, structured guidance"
  eventType="Tech Talk"
  name="By Striver (Raj Vikramaditya)"
  statusText="Confirmed Speaker"
  subtitle="Date - 31st August, 2025 | Venue - BIT Mesra"
  imageSrc="https://res.cloudinary.com/dmjoxb8pe/image/upload/v1755164252/striver_nnyfgi.jpg"
  imageAlt="Striver "
             />
          
        </div>
      </div>
    </div>
  );
};

export default FeaturedSpeaker;
