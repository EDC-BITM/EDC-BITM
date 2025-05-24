import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TestimonialSlider.css";

import Slider from "react-slick";
import vc from "./1.png";
import drie from "./3.jpeg";
import facad from "./2.png";

function Testimonialslider() {
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 2200,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768, // tablets and below
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480, // mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };
  // Testimonial data array
  const testimonials = [
    {
      text: "EDC is not like any other club. Its a breeding ground for future innovators and problem solvers. The culture, the mindest and the whole persona of the society is mind-boggling. The support and the push from the seniors that the juniors get is unreal.",
      image: vc,
      name: "Dr. Indranil Manna",
      title: "Vice Chancellor, BIT Mesra",
    },
    {
      text: "The Entrepreneurship Development Club has been a pivotal part of our development journey. Their well-organized events have enriched our skills and knowledge in various aspects. The club's dedication to fostering innovation, strategic thinking, and personal growth is truly commendable.",
      image: drie,
      name: "Dr. Raju Poddar",
      title: "Dean of RIE, BIT Mesra",
    },
    {
      text: "Welcome to the Entrepreneurship Development Cell (EDC), where innovation meets opportunity. Our mission is to inspire, guide, and equip students with the entrepreneurial skills and mindset to turn their ideas into impactful ventures.",
      image: facad,
      name: "Mr. Vishal H. Shah",
      title: "Faculty Advisor",
    },
  ];

  return (
    <div className="slider-container sm:max-w-2xl mx-auto sm:px-4 py-8">
      <Slider {...settings}>
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="flex flex-col h-full my-8 items-center p-6 md:p-10 "
          >
            <img
              loading="lazy"
              src={testimonial.image}
              alt={testimonial.name}
              className="w-24 h-24 md:w-32 mx-auto md:h-32 object-cover rounded-full border-4 border-yellow-300  mb-4"
            />
            <p className="text-gray-700 text-base md:text-lg italic mb-6 max-w-xl">
              &quot;{testimonial.text}&quot;
            </p>
            <div className="flex flex-col items-center">
              <h1 className="text-lg md:text-xl font-bold text-primary-700">
                {testimonial.name}
              </h1>
              <p className="text-sm md:text-base text-gray-500">
                {testimonial.title}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Testimonialslider;
