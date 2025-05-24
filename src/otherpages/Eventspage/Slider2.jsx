import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import card1 from './card1.png';
import card2 from './card2.png';
import card3 from './card3.png';



function Slider() {
  return (
    <div className="container">
      <div className='lg:p-20'>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'2'}
        breakpoints={{
          768: {
            slidesPerView: 3.5,
          },
        }}
        coverflowEffect={{
          rotate: 15,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
          <img src={card1} alt="slide_image" class="rounded-lg"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={card2} alt="slide_image" class="rounded-lg"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={card3} alt="slide_image" class="rounded-lg"/>
        </SwiperSlide>
        
        <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow ml-[-1%] animate-bounce">
          <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow mr-[-1%] animate-bounce">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
      </div>
    </div>
  );
}

export default Slider2