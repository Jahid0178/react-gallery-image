/* eslint-disable react/prop-types */
import { useContext } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import PropTypes from "prop-types";
import { GalleryContext } from "../../context/GalleryContext";
import Image from "../Image";

const GalleryImage = ({ image, index }) => {
  const { selectedImages, setSelectedImages } = useContext(GalleryContext);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: image.id,
    animateLayoutChanges: () => false,
    transition: {
      duration: 500,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const isSelected = selectedImages.includes(image.id);

  /**
   * Handle the selected image event.
   *
   * @param {Event} event - The event object for the selected image.
   * @return {void} This function does not return anything.
   */
  const handleSelectedImage = (event) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedImages([...selectedImages, image.id]);
    } else {
      setSelectedImages(selectedImages.filter((id) => id !== image.id));
    }
  };

  return (
    <div
      className={`group/image border border-gray-300 rounded-md overflow-hidden relative image-box ${
        index === 0 ? "featured-image" : ""
      }`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {!isDragging && <Image imageUrl={image.imageUrl} alt={image.imageUrl} />}
      <input
        type="checkbox"
        name="select"
        id={`select-${image.id}`}
        checked={isSelected}
        className={`${
          isSelected && !isDragging ? "block" : "hidden"
        } group-hover/image:block absolute top-4 left-4 group-hover/image:z-50 w-4 h-4 cursor-pointer`}
        onChange={handleSelectedImage}
      />
      <div className={`${isSelected ? "selected-overlay" : "overlay"}`}></div>
    </div>
  );
};

GalleryImage.propTypes = {
  index: PropTypes.number.isRequired,
};

export default GalleryImage;
