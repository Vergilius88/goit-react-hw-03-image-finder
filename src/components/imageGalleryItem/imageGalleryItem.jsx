import { Component } from "react";
import "./importGalleryItem.css";

function ImageGalleryItem({ galleryItems }) {
  galleryItems.map((galleryItem) => {
    return (
      <li className="ImageGalleryItem" id={galleryItem.id}>
        <img
          src={galleryItem.previewURL}
          alt={galleryItem.tags}
          className="ImageGalleryItem-image"
          largeImageUrl={galleryItem.largeImageURL}
        />
      </li>
    );
  });
}
export default ImageGalleryItem;
