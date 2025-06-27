import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TestimonialSlider.css";

import Slider from "react-slick";
import vc from "@assets/Home/testimonial/1.png?url&w=150&format=webp";
import drie from "@assets/Home/testimonial/3.jpeg?url&w=150&format=webp";
import facad from "@assets/Home/testimonial/2.png?url&w=150&format=webp";

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
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

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
    <div className="slider-container max-w-4xl mx-auto px-4 py-12 bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-lg">
      <Slider {...settings}>
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="flex flex-col h-full items-center p-6 md:p-10 transition-all duration-300"
          >
            <div className="relative mb-8 flex justify-center">
              <img
                loading="lazy"
                src={testimonial.image}
                alt={testimonial.name}
                className="w-28 h-28 md:w-36 md:h-36 relative z-10 object-cover rounded-full border-4 border-yellow-400 shadow-lg"
              />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto mb-6">
              <p className="text-gray-700 text-base md:text-lg italic leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-lg md:text-xl font-bold text-primary-700">
                {testimonial.name}
              </h1>
              <p className="text-sm md:text-base text-gray-600 font-medium">
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
