import { useContext } from "react";
import { GalleryContext } from "../../context/GalleryContext";
import Button from "../Button/Button";
import Input from "../Input/Input";

const GalleryTopBar = () => {
  const { selectedImages, handleDeleteImages } = useContext(GalleryContext);

  const count = selectedImages.length;

  return (
    <div className="gallery-top-bar">
      <div>
        {selectedImages.length > 0 ? (
          <span className="flex items-center gap-2">
            <Input
              type="checkbox"
              name="selectedFile"
              id="selectedFile"
              checked={true}
            />
            <label htmlFor="selectedFile" className="font-semibold">
              {count > 0 &&
                `${count} ${count === 1 ? "File Selected" : "Files Selected"}`}
            </label>
          </span>
        ) : (
          <h3 className="text-xl font-semibold">Gallery</h3>
        )}
      </div>
      <div>
        {count > 0 && (
          <Button
            type="button"
            className="text-danger hover:underline"
            onClick={handleDeleteImages}
          >
            Delete files
          </Button>
        )}
      </div>
    </div>
  );
};

export default GalleryTopBar;
