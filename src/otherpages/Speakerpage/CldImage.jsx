import { Cloudinary } from "@cloudinary/url-gen";
import {
  AdvancedImage,
  lazyload,
  placeholder,
  responsive,
} from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import PropTypes from "prop-types";

/**
 * Cloudinary image component with lazy‑load, responsive sizes and blur placeholder.
 */
const CldImage = ({
  src,
  alt = "",
  width = 300,
  height = 300,
  sizes = [1200, 1100],
  loading = "lazy",
  className = "",
  ...props
}) => {
  /* 🔥  set your real Cloudinary cloud name */
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dmjoxb8pe",   // ← updated
    },
  });

  const image = cld
    .image(src)                               // src = publicId (e.g. "Speakers/gallery/aman")
    .resize(fill().width(width).height(height))
    .format("auto");

  return (
    <div className={className}>
      <AdvancedImage
        cldImg={image}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        plugins={[
          lazyload(),
          responsive({ steps: sizes }),
          placeholder({ mode: "blur" }),
        ]}
        {...props}
      />
    </div>
  );
};

CldImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  sizes: PropTypes.arrayOf(PropTypes.number),
  loading: PropTypes.string,
  className: PropTypes.string,
};

export default CldImage;
