import Background from "./components/background";
import Hero from "./components/Hero";
import Timeline from "./components/timeline";
import Footer from "./components/footer";
import FeaturedSpeaker from "./components/FeaturedSpeaker";
import Sponsors from "./components/sponsors";

const IATPage = () => {
  return (
    <>
      <div className="relative min-h-screen w-full overflow-x-hidden">
        <Background className="fixed -z-20 inset-0" />
        <div className="text-white w-full max-w-full">
          <Hero />
          <Timeline />
          <FeaturedSpeaker />
          <Sponsors />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default IATPage;
