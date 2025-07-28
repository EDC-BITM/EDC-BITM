import React from "react";
import CircularGallery from "./CircularGallery/CircularGallery";

// ✅ Step 1: import local images
import IATGallery1 from "@/otherpages/IAT/assets/Gallery/IATGallery1.jpg";
import IATGallery2 from "@/otherpages/IAT/assets/Gallery/IATGallery2.jpg";
import IATGallery3 from "@/otherpages/IAT/assets/Gallery/IATGallery3.jpg";
import IATGallery4 from "@/otherpages/IAT/assets/Gallery/IATGallery4.jpg";
import IATGallery5 from "@/otherpages/IAT/assets/Gallery/IATGallery5.jpg";
import IATGallery6 from "@/otherpages/IAT/assets/Gallery/IATGallery6.jpg";
import IATGallery7 from "@/otherpages/IAT/assets/Gallery/IATGallery7.jpg";
import IATGallery8 from "@/otherpages/IAT/assets/Gallery/IATGallery8.jpg";
import IATGallery9 from "@/otherpages/IAT/assets/Gallery/IATGallery9.jpg";
import IATGallery10 from "@/otherpages/IAT/assets/Gallery/IATGallery10.jpg";
import IATGallery11 from "@/otherpages/IAT/assets/Gallery/IATGallery11.jpg";
import IATGallery12 from "@/otherpages/IAT/assets/Gallery/IATGallery12.jpg";
import IATGallery13 from "@/otherpages/IAT/assets/Gallery/IATGallery13.jpg";

// ✅ Step 2: make array of items
const localImages = [
  { image: IATGallery1, text: "" },
  { image: IATGallery2, text: "" },
  { image: IATGallery3, text: "" },
  { image: IATGallery4, text: "" },
  { image: IATGallery5, text: "" },
  { image: IATGallery6, text: "" },
  { image: IATGallery7, text: "" },
  { image: IATGallery8, text: "" },
  { image: IATGallery9, text: "" },
  { image: IATGallery10, text: "" },
  { image: IATGallery11, text: "" },
  { image: IATGallery12, text: "" },
  { image: IATGallery13, text: "" },
];

const Gallery = () => {
  return (
    <div className="flex -space-y-12 my-4 flex-col items-center justify-center w-full max-w-7xl mx-auto">
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
      >
        <CircularGallery
          items={localImages}
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
