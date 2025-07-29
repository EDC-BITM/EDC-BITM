import React from "react";
import CircularGallery from "./CircularGallery/CircularGallery";

const cloudImages = [
  {
    image:
      "https://res.cloudinary.com/dqjpac04m/image/upload/f_auto,q_auto,w_400/IATGallery1_jcm0uq.jpg",
    text: "",
  },
  {
    image:
      "https://res.cloudinary.com/dqjpac04m/image/upload/f_auto,q_auto,w_400/IATGallery2_uthgp7.jpg",
    text: "",
  },
  {
    image:
      "https://res.cloudinary.com/dqjpac04m/image/upload/f_auto,q_auto,w_500/IATGallery12_jdwyhz.jpg",
    text: "",
  },
  {
    image:
      "https://res.cloudinary.com/dqjpac04m/image/upload/f_auto,q_auto,w_500/IATGallery10_vmy4gx.jpg",
    text: "",
  },
  {
    image:
      "https://res.cloudinary.com/dqjpac04m/image/upload/f_auto,q_auto,w_500/IATGallery9_zhad3w.jpg",
    text: "",
  },
  {
    image:
      "https://res.cloudinary.com/dqjpac04m/image/upload/f_auto,q_auto,w_500/IATGallery8_rchrnu.jpg",
    text: "",
  },
  {
    image:
      "https://res.cloudinary.com/dqjpac04m/image/upload/f_auto,q_auto,w_500/IATGallery3_fdttjt.jpg",
    text: "",
  },
  {
    image:
      "https://res.cloudinary.com/dqjpac04m/image/upload/f_auto,q_auto,w_500/IATGallery7_mihlxc.jpg",
    text: "",
  },
  {
    image:
      "https://res.cloudinary.com/dqjpac04m/image/upload/f_auto,q_auto,w_500/IATGallery6_frrrmy.jpg",
    text: "",
  },
  {
    image:
      "https://res.cloudinary.com/dqjpac04m/image/upload/f_auto,q_auto,w_500/IATGallery11_ktyunk.jpg",
    text: "",
  },
  {
    image:
      "https://res.cloudinary.com/dqjpac04m/image/upload/f_auto,q_auto,w_500/IATGallery5_bchqhn.jpg",
    text: "",
  },
  {
    image:
      "https://res.cloudinary.com/dqjpac04m/image/upload/f_auto,q_auto,w_500/IATGallery13_xfah5a.jpg",
    text: "",
  },
  {
    image:
      "https://res.cloudinary.com/dqjpac04m/image/upload/f_auto,q_auto,w_500/IATGallery4_lrgpey.jpg",
    text: "",
  },
];

const Gallery = () => {
  return (
    <div
      id="gallery"
      className="flex -space-y-12 my-4 flex-col items-center justify-center w-full max-w-7xl mx-auto"
    >
      <h2
        className="text-3xl sm:text-4xl lg:text-8xl tracking-tight bg-gradient-to-r from-blue-500 to-yellow-400 bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #6366F1 0%, #8B5CF6 25%, #EC4899 55%, #F59E0B 80%, #FDE68A 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Event Gallery
      </h2>
      <div
        style={{ height: "600px", position: "relative" }}
        className="w-full"
        onSelect={(e) => e.preventDefault()}
        onDrag={(e) => e.preventDefault()}
      >
        <CircularGallery
          items={cloudImages}
          bend={0.1}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
          scrollSpeed={1.5}
        />
      </div>
    </div>
  );
};

export default Gallery;
