import { Component } from "react";
import "./app.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SearchBar from "./searchBar/searchBar";
import ImageGallery from "./imageGallery/imageGallery";
import Button from "./button/button";
// import Modal from "./modal/modal";
import fetchGallery from "../services/galleryAPI";

export default class App extends Component {
  state = {
    keyword: "",
    page: 1,
    galleryItems: null,
    error: null,
    status: "idle",
  };

  componentDidUpdate(_prevProps, prevState) {
    const prevKeyword = prevState.keyword;
    const nextKeyword = this.state.keyword;
    const page = this.state.page;

    if (prevKeyword !== nextKeyword) {
      this.setState({ status: "pending" });

      fetchGallery(nextKeyword, page)
        .then((galleryArray) =>
          this.setState({ galleryItems: galleryArray.hits, status: "resolved" })
        )
        .catch((error) => this.setState({ error, status: "reject" }));
    }
  }

  handleFormSubmit = (keyword) => {
    this.setState({ keyword: keyword });
  };
  // openModal = (event) => {
  //   modal((image = { event.currentTarget }));
  // };

  render() {
    const { galleryItems, error } = this.state;
    return (
      <div className="App">
        <SearchBar formSubmit={this.handleFormSubmit} />
        {error && <h1>{error.massage}</h1>}
        {galleryItems && <ImageGallery items={galleryItems} />}
        {galleryItems && <Button />}
        <ToastContainer />
      </div>
    );
  }
}
