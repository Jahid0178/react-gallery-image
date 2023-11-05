import { useContext } from "react";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { PiImageLight } from "react-icons/pi";
import { GalleryContext } from "../../context/GalleryContext";
import Image from "../Image";
import Input from "../Input/Input";
import GalleryImage from "./GalleryImage";

/**
 * Generates the function comment for the given function body.
 *
 * @returns {void}
 */
const GalleryContent = () => {
  const {
    imagesData,
    activeId,
    handleOnDragStart,
    handleOnDragEnd,
    handleNewImage,
  } = useContext(GalleryContext);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),

    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  /**
   * Renders the overlay for the active image, if there is one.
   *
   * @returns {JSX.Element|null} The rendered overlay component or `null` if there is no active image.
   */
  const renderActiveImageOverlay = () => {
    const activeImage = imagesData.find((image) => image.id === activeId);

    if (activeId && activeImage) {
      return <Image imageUrl={activeImage.imageUrl} />;
    }

    return null;
  };

  return (
    <div className="p-4">
      <div className="gallery-content-container">
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleOnDragStart}
          onDragEnd={handleOnDragEnd}
          sensors={sensors}
        >
          <SortableContext items={imagesData} strategy={rectSortingStrategy}>
            {imagesData.map((image, index) => (
              <GalleryImage key={index} image={image} index={index} />
            ))}
          </SortableContext>
          <DragOverlay adjustScale={true}>
            {renderActiveImageOverlay()}
          </DragOverlay>
        </DndContext>
        <label htmlFor="upload-image" className="file-upload-button">
          <Input
            type="file"
            name="upload-imageimage"
            id="upload-image"
            className="hidden"
            accept="image/*"
            onChange={handleNewImage}
          />
          <Image
            imageUrl="https://placehold.co/400x400"
            alt="Add image"
            className="invisible"
          />
          <div className="absolute">
            <PiImageLight size={23} className="mx-auto" />
            <h4 className="font-medium text-sm">Add Images</h4>
          </div>
        </label>
      </div>
    </div>
  );
};

export default GalleryContent;
