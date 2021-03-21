import "./importGalleryItem.css";

const ImageGalleryItem = ({ item, openModal }) => {
  return (
    <li key={item.id} className="ImageGalleryItem" onClick={openModal}>
      <img
        src={item.webformatURL}
        alt={item.tags}
        className="ImageGalleryItem-image"
        data-modalImage={item.largeImageURL}
      />
    </li>
  );
};

export default ImageGalleryItem;
