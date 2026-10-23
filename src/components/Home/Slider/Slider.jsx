import cldImageData from "@/data/CldImage.json";
import ZoomSlider from "@/components/ui/zoom-slider.jsx";

function Slider() {
  const sliderData = cldImageData.Home.slider.map((image, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      number,
      src: `https://res.cloudinary.com/dmjoxb8pe/image/upload/f_auto,q_auto,w_1200/${image.publicId}`,
      alt: image.alt,
      title: image.title,
    };
  });

  return <ZoomSlider sliderData={sliderData} />;
}

export default Slider;
