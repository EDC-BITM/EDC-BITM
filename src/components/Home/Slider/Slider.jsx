import { Swiper, SwiperSlide } from "swiper/react";
import "./style.css";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import cldImageData from "@/data/CldImage.json";
import CldImage from "@/components/Images/CldImage";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

function Slider() {
  const slides = cldImageData.Home.slider;
  return (
    <div className="container">
      <div className="lg:p-20">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={1} // Default to 1 slide per view
          breakpoints={{
            // Large screens
            1024: {
              slidesPerView: 3.5,
            },
            // Medium screens
            768: {
              slidesPerView: 2.5,
            },
            // Small screens
            470: {
              slidesPerView: 1.5,
            },
          }}
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{
            dynamicBullets: true,
            dynamicMainBullets: 3,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {slides.map((img, idx) => (
            <SwiperSlide className="mb-10 relative" key={idx}>
              <CldImage
                src={img.publicId}
                alt={img.alt}
                height={img.height}
                width={img.width}
                className="rounded-lg overflow-hidden w-full"
              />
            </SwiperSlide>
          ))}

          <div className="slider-controler">
            <div className="swiper-button-prev animate-bounce -translate-y-[40%] hover:-translate-y-[40%] slider-arrow">
              <button className="bg-white/70  p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <FaArrowLeft className="w-6 h-6 text-gray-800" />
              </button>
            </div>
            <div className="swiper-button-next animate-bounce -translate-y-[40%] hover:-translate-y-[40%] slider-arrow">
              <button className="bg-white/70 p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <FaArrowRight className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Slider;
