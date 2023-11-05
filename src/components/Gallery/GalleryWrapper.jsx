import GalleryTopBar from "./GalleryTopBar";
import GalleryContent from "./GalleryContent";

const GalleryWrapper = () => {
  return (
    <div className="gallery-wrapper">
      <GalleryTopBar />
      <GalleryContent />
    </div>
  );
};

export default GalleryWrapper;
