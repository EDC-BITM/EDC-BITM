import { useRef, useEffect } from "react";
import CldImageData from "@/data/CldImage.json";

const Sponsors = () => {
  const sponsors = [
    ...CldImageData.Home.sponsors,
    ...CldImageData.Home.sponsors,
    ...CldImageData.Home.sponsors,
  ];

  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);

  const speed = 0.5;

  const startMarquee = (wrapperRef, direction) => {
    let x = 0;

    const animate = () => {
      if (wrapperRef.current) {
        x += direction === "left" ? -speed : speed;
        wrapperRef.current.style.transform = `translateX(${x}px)`;

        const contentWidth = wrapperRef.current.scrollWidth / 2;
        if (Math.abs(x) >= contentWidth) {
          x = 0;
        }
      }
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    startMarquee(marquee1Ref, "left");
    startMarquee(marquee2Ref, "right");
  }, []);

  const renderSponsors = () =>
    sponsors.map((s, i) => (
      <div
        key={i}
        className="h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 flex justify-center items-center shrink-0"
      >
        <img
          src={`https://res.cloudinary.com/dmjoxb8pe/image/upload/w_300,f_webp,q_auto,e_bgremoval/${s.publicId}.webp`}
          alt={`Sponsor ${i + 1}`}
          className="object-contain w-full h-full"
          loading="lazy"
        />
      </div>
    ));

  return (
    <section className="w-full py-8 sm:py-10 overflow-hidden px-4">
      <h2
        className="text-center text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-normal leading-tight sm:leading-[5.56rem] tracking-tight sm:tracking-[-0.0556rem] bg-gradient-to-r from-[#2461E2] via-[#2461E2] to-[#FDA011] bg-clip-text text-transparent mb-4 sm:mb-0"
        style={{
          backgroundImage:
            "linear-gradient(86deg, #2461E2 24.3%, #FDA011 83.39%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Our Sponsors
      </h2>

      <div className="mt-6 sm:mt-10 space-y-3 sm:space-y-4">
        {/* Marquee 1 - left */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={marquee1Ref}
            className="flex gap-4 sm:gap-6 lg:gap-12 whitespace-nowrap will-change-transform"
          >
            {renderSponsors()}
            {renderSponsors()}
          </div>
        </div>

        {/* Marquee 2 - right */}
        <div className="relative w-full overflow-hidden">
          <div
            ref={marquee2Ref}
            className="flex gap-4 sm:gap-6 lg:gap-12 whitespace-nowrap will-change-transform"
          >
            {renderSponsors()}
            {renderSponsors()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
