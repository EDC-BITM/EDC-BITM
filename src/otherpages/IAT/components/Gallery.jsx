import React from "react";
import CircularGallery from "./CircularGallery/CircularGallery";

const Gallery = () => {
  return (
    <div className="flex -space-y-12 my-4 flex-col items-center justify-center w-full max-w-7xl mx-auto ">
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
        className="w-full "
      >
        <CircularGallery
          bend={0.1}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </div>
    </div>
  );
};

export default Gallery;
