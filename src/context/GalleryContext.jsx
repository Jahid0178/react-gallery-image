import { createContext, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import PropTypes from "prop-types";
import { images } from "../../data/data";

export const GalleryContext = createContext(null);

/**
 * Generates the context provider for the gallery.
 *
 * @param {Object} children - The children components.
 * @return {JSX.Element} The gallery context provider component.
 */
const GalleryContextProvider = ({ children }) => {
  const [imagesData, setImagesData] = useState(images);
  const [selectedImages, setSelectedImages] = useState([]);
  const [activeId, setActiveId] = useState(null);

  /**
   * Handles the onDragStart event.
   *
   * @param {object} event - The event object.
   * @return {undefined} This function does not return a value.
   */
  const handleOnDragStart = (event) => {
    const { active } = event;

    setActiveId(active.id);
  };

  /**
   * Handles the event when drag ends.
   *
   * @param {Object} event - The drag event object.
   * @return {void}
   */
  const handleOnDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) {
      setActiveId(null);
      return;
    }

    setImagesData((images) => {
      const oldIndex = images.findIndex((image) => image.id === active.id);
      const newIndex = images.findIndex((image) => image.id === over.id);

      return arrayMove(images, oldIndex, newIndex);
    });
  };

  /**
   * Deletes selected images from the imagesData array and updates the state.
   *
   * @return {undefined} This function does not return a value.
   */
  const handleDeleteImages = () => {
    const updatedImagesData = imagesData.filter(
      (image) => !selectedImages.includes(image.id)
    );

    setImagesData(updatedImagesData);

    setSelectedImages([]);
  };

  /**
   * Handles a new image event.
   *
   * @param {Event} e - The event object containing the new image file.
   * @return {void}
   */
  const handleNewImage = (e) => {
    const newImageFile = e.target.files[0];
    const blobURL = URL.createObjectURL(newImageFile);
    setImagesData((images) => [
      ...images,
      { id: imagesData.length + 1, imageUrl: blobURL },
    ]);
  };

  const contextValue = {
    selectedImages,
    setSelectedImages,
    imagesData,
    setImagesData,
    activeId,
    setActiveId,
    handleOnDragStart,
    handleOnDragEnd,
    handleDeleteImages,
    handleNewImage,
  };

  return (
    <GalleryContext.Provider value={contextValue}>
      {children}
    </GalleryContext.Provider>
  );
};

GalleryContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GalleryContextProvider;
