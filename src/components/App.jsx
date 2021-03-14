import { Component } from "react";
import "./app.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SearchBar from "./searchBar/searchBar";
import ImageGallery from "./imageGallery/imageGallery";
import Button from "./button/button";
// import Modal from "./modal/modal";
import ImageGalleryItem from "./imageGalleryItem/imageGalleryItem";
import fetchGallery from "../services/galleryAPI";

export default class App extends Component {
  state = {
    keyword: "",
    page: 1,
    galleryItems: null,
    error: null,
    status: "idle",
  };

  componentDidUpdate(prevProps, _prevState) {
    const prevKeyword = prevProps.keyword;
    const nextKeyword = this.state.keyword;
    const page = this.state.page;

    if (prevKeyword !== nextKeyword) {
      // this.setState({ status: "pending" });

      fetchGallery(nextKeyword, page).then((galleryItems) =>
        this.setState({ galleryItems })
      );
      // .catch(this.setState({ status: "rejected" }));
    }
  }

  handleFormSubmit = (keyword) => {
    this.setState({ keyword: keyword });
  };

  render() {
    const galleryItems = this.state.galleryItems;
    return (
      <div className="App">
        <SearchBar formSubmit={this.handleFormSubmit} />
        <ImageGallery>
          {galleryItems !== null ? (
            <ImageGalleryItem galleryItems={galleryItems} />
          ) : (
            <p>ничего</p>
          )}
        </ImageGallery>
        <ToastContainer />
        <Button />
      </div>
    );
  }
}
