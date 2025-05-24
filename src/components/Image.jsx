import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Image = ({
  src, // High-res image
  blurSrc, // Low-res blurred placeholder
  alt = "",
  priority = false,
  className = "",
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  // Preload the image if priority is true
  useEffect(() => {
    if (priority && typeof window !== "undefined") {
      const img = new window.Image();
      img.src = src;
      img.onload = () => setLoaded(true);
    }
  }, [priority, src]);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Blur image placeholder */}
      {blurSrc && (
        <img
          src={blurSrc}
          alt={alt}
          className={`absolute blur-sm inset-0 w-full h-full object-cover ease-in-out transition-opacity duration-700 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleImageLoad}
        className={`w-full h-full object-cover ease-in-out transition-opacity duration-700 "
        }`}
        {...props}
      />
    </div>
  );
};
Image.propTypes = {
  src: PropTypes.string.isRequired,
  blurSrc: PropTypes.string,
  alt: PropTypes.string,
  priority: PropTypes.bool,
  className: PropTypes.string,
};

export default Image;
