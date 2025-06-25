import Eventsection from "./components/Home/Eventsection/Eventssection.jsx";
import Speakers from "./components/Home/speakers/speakers.jsx";
import Sponser from "./components/Home/Sponser/Sponser.jsx";
import Wave from "./components/Home/wave/wave.jsx";
import Slidermain from "./components/Home/Slider/Slidermain.jsx";
import Testimonial from "./components/Home/Testimonial/Testimonial.jsx";
import Socials from "./components/Home/socials/socials.jsx";
import Stats from "./components/Home/Stats/Stats.jsx";
import Hero from "./components/Home/Hero/Hero.jsx";
import About_us from "./components/Home/AboutUs/AboutUs.jsx";

function Home() {
  return (
    <div>
      <Hero />
      <About_us />

      <Stats />
      <Slidermain />
      <Eventsection />
      <Speakers />
      <Sponser />
      <Wave />
      <Socials />
      <Testimonial />
    </div>
  );
}

export default Home;
