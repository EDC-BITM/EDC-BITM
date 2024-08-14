import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TestimonialSlider.css"; // Your custom CSS file

import React from "react";
import Slider from "react-slick";
import img from "./Ellipse.png";
import vc from './1.png'
import drie from './3.png'
import facad from './2.png'

function Testimonialslider() {
	const settings = {
		dots: true,
		lazyLoad: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		initialSlide: 2,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 1800,
		cssEase: "linear",
	};
	return (
		<div className="slider-container">
			<Slider {...settings}>
				<div className="flex flex-col justify-center items-center text-center p-16">
					<p>
						Engaging in Entrepreneurship Development Club's events like Ancient
						Entrepreneurship, Quiz Trivia, and Stock Stoicism has been
						incredibly enriching. These events offered insights into historical
						business practices, tested our knowledge, and taught valuable
						financial strategies.
					</p>
					<div className="flex flex-row justify-center items-center mt-8 gap-2">
						<img src={vc} alt="" className="w-28 h-28 object-cover" />
						<div className="flex flex-col mx-8">
							<h1>Dr. Indranil Manna</h1>
							<p>Vice Chancellor, BIT Mesra</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-center items-center text-center p-16">
					<p>
						The Entrepreneurship Development Club has been a pivotal part of our
						development journey. Their well-organized events, such as Startup
						Mela, IPL Auction, Bit Thon etc. have enriched our skills and
						knowledge in various aspects. The club's dedication to fostering
						innovation, strategic thinking, and personal growth is truly
						commendable.
					</p>
					<div className="flex flex-row justify-center items-center mt-8 gap-2">
						<img src={drie} alt="" className="w-28 h-28 object-cover" />
						<div className="flex flex-col mx-8">
							<h1> Dr. C. Jeganathan</h1>
							<p>Dean of RIE, BIT Mesra</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-center items-center text-center p-16">
					<p>
						EDC is not like any other club. Its a breeding ground for future
						innovators and problem solvers. The culture, the mindest and the
						whole persona of the society is mind-boggling. The support and the
						push from the seniors that the juniors get is unreal.
					</p>
					<div className="flex flex-row justify-center items-center mt-8 gap-2">
						<img src={facad} alt="" className="w-28 h-28 object-cover" />
						<div className="flex flex-col mx-8">
							<h1> Mr. Vishal H. Shah</h1>
							<p>Faculty Advisor </p>
						</div>
					</div>
				</div>
			</Slider>
		</div>
	);
}

export default Testimonialslider;
