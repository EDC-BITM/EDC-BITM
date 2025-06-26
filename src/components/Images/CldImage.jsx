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
 * Renders a Cloudinary image with advanced features such as lazy loading, responsive sizing, and blurred placeholder.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.src - The source path of the image in Cloudinary.
 * @param {string} [props.alt=""] - Alternative text for the image.
 * @param {number} [props.width=300] - The width of the image.
 * @param {number} [props.height=300] - The height of the image.
 * @param {number[]} [props.sizes=[1200, 1100]] - Responsive image width steps.
 * @param {string} [props.loading="lazy"] - Image loading strategy ("lazy", "eager", etc.).
 * @param {string} [props.className=""] - Additional CSS classes for the container div.
 * @returns {JSX.Element} The rendered Cloudinary image component.
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
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dmjoxb8pe",
    },
  });

  const image = cld
    .image(src)
    .resize(fill().width(width).height(height))
    .format("auto");

  return (
    <div className={`${className}`}>
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
