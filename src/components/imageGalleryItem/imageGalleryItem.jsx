import "./importGalleryItem.css";

const ImageGalleryItem = ({ item }) => {
  return (
    <li id={item.id} className="ImageGalleryItem">
      <img
        src={item.webformatURL}
        alt={item.tags}
        className="ImageGalleryItem-image"
        modalimage={item.largeImageURL}
      />
    </li>
  );
};

export default ImageGalleryItem;
