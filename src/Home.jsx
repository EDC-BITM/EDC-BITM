import React from "react"
import About_us from "./components/About_us.jsx"
import Body from "./components/Body/body.jsx"
import Eventsection from "./components/Eventsection/Eventssection.jsx"
import Speakers from "./components/speakers/speakers.jsx"
import Sponser from "./components/Sponser/Sponser.jsx"
import Hero from "./components/Hero/Hero.jsx"
import Wave from "./components/wave/wave.jsx"
import Slidermain from "./components/Slider/Slidermain.jsx"
import Testimonial from "./components/Testimonial/Testimonial.jsx"
import Socials from "./components/socials/socials.jsx"

function Home() {
  return(
    <div>
      <Body/>
      <About_us/>
      <Hero/>
      <Slidermain/>
      <Eventsection/>
      <Speakers />
      <Sponser/>
      <Wave />
      <Socials />
      <Testimonial/>
    </div>
  )
}

export default Home