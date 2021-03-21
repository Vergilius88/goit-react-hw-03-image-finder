import { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";

import "./app.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import SearchBar from "./searchBar/searchBar";
import ImageGallery from "./imageGallery/imageGallery";
import Button from "./button/button";
import Modal from "./modal/modal";
import fetchGallery from "../services/galleryAPI";

export default class App extends Component {
  state = {
    keyword: "",
    page: 1,
    galleryItems: null,
    status: "idle",
    showModal: false,
    imgAttribute: false,
    error: null,
  };

  componentDidUpdate(_prevProps, prevState) {
    const prevKeyword = prevState.keyword;
    const nextKeyword = this.state.keyword;
    const prevPage = prevState.page;
    const page = this.state.page;

    if (prevKeyword !== nextKeyword) {
      this.setState({ status: "pending" });

      fetchGallery(nextKeyword, page)
        .then((galleryArray) => {
          if (galleryArray.hits.length === 0) {
            throw new Error(`По запросу ${nextKeyword} ничего не найдено`);
          }
          this.setState({
            galleryItems: galleryArray.hits,
            status: "resolved",
          });
        })
        .catch((error) => {
          this.setState({ error: error.message, status: "reject" });
        });
    }
    if (prevPage !== page) {
      fetchGallery(nextKeyword, page).then((galleryArray) =>
        this.setState({
          galleryItems: [...this.state.galleryItems, ...galleryArray.hits],
          status: "resolved",
        })
      );
    }
    window.scrollBy({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  handleFormSubmission = (keyword) => {
    this.setState({ keyword: keyword });
    this.setState({ page: 1 });
  };
  handleButtonClick = () => {
    this.setState({ page: this.state.page + 1 });
  };
  handleOpenModal = (event) => {
    if (this.state.showModal === false) {
      const selectedSrc = event.target.dataset.modalimage;
      const selectedAlt = event.target.alt;
      this.setState({
        imgAttribute: { src: selectedSrc, alt: selectedAlt },
      });
    }

    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { galleryItems, error, status, showModal, imgAttribute } = this.state;
    return (
      <div className="App">
        {showModal && (
          <Modal onClose={this.handleOpenModal} imgAttribute={imgAttribute} />
        )}
        <SearchBar formSubmit={this.handleFormSubmission} />
        {status === "reject" && <h1>{error}</h1>}
        {status === "resolved" && (
          <ImageGallery items={galleryItems} openModal={this.handleOpenModal} />
        )}
        {status === "pending" && (
          <Loader type="Grid" color="#00BFFF" height={80} width={80} />
        )}
        {status === "resolved" && (
          <Button handleButtonClick={this.handleButtonClick} />
        )}
        <ToastContainer />
      </div>
    );
  }
}
