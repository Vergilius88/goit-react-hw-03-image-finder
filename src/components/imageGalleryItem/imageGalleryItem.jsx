import "./importGalleryItem.css";

const ImageGalleryItem = ({ item, openModal }) => {
  return (
    <li className="ImageGalleryItem" id={item.id}>
      <img
        src={item.webformatURL}
        alt={item.tags}
        className="ImageGalleryItem-image"
        modalimage={item.largeImageURL}
        onClick={openModal}
      />
    </li>
  );
};

export default ImageGalleryItem;
