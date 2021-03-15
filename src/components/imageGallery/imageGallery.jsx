import "./imageGallery.css";
import ImageGalleryItem from "../imageGalleryItem/imageGalleryItem";

const ImageGallery = ({ items, openModal }) => {
  return (
    <ul className="ImageGallery">
      {items.map((item) => (
        <ImageGalleryItem item={item} openModal={openModal} />
      ))}
    </ul>
  );
};

export default ImageGallery;
