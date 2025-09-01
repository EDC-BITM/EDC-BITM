import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import vc from "@assets/Home/testimonial/1.png?url&w=150&format=webp";
const drie = "/NewPic_DRIE.jpg";
import facad from "@assets/Home/testimonial/2.png?url&w=150&format=webp";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

function Testimonialslider() {
  const testimonials = [
    {
      text: "EDC is not like any other club. It's a breeding ground for future innovators and problem solvers. The culture, the mindset, and the whole persona of the society is mind-boggling. The support and the push from the seniors that the juniors get is unreal.",
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
      name: "Dr. Vishal H. Shah",
      title: "Faculty Advisor",
    },
  ];

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 bg-gradient-to-br from-white via-slate-50 to-gray-100 rounded-3xl shadow-xl overflow-hidden">
      <div className="absolute inset-0 blur-[90px] opacity-40 bg-gradient-to-br from-yellow-300 to-pink-300 -z-10" />
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          waitForTransition: true,
        }}
        speed={1200}
        loop={true}
        className="testimonial-swiper pb-12"
      >
        {testimonials.map((testimonial, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col items-center gap-6 text-center px-4 md:px-8 transition-all duration-300 ease-in-out">
              <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-400">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg max-w-3xl border border-gray-200 transition duration-300 ease-in-out">
                <p className="text-gray-800 text-base md:text-lg font-medium leading-relaxed italic tracking-tight">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>

              <div className="mt-4 mb-6">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {testimonial.title}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="slider-controler">
        <div className="swiper-button-prev animate-bounce hover:-translate-x-[17%] -translate-x-[17%] slider-arrow">
          <button className="bg-white/70 p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <FaArrowLeft className="w-6 h-6 text-gray-800" />
          </button>
        </div>
        <div className="swiper-button-next animate-bounce hover:translate-x-[17%] translate-x-[17%] slider-arrow">
          <button className="bg-white/70 p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <FaArrowRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Testimonialslider;
