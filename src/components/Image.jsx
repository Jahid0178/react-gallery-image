import PropTypes from "prop-types";

const Image = ({ imageUrl, alt, className }) => {
  return (
    <img
      src={imageUrl}
      alt={alt}
      className={`${className} bg-white border border-gray-300 rounded-md overflow-hidden`}
    />
  );
};

Image.propTypes = {
  imageUrl: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default Image;
