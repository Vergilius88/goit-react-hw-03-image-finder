import { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./app.css";

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
    error: null,
    status: "idle",
    showModal: false,
    imgAttribute: false,
  };

  componentDidUpdate(_prevProps, prevState) {
    const prevKeyword = prevState.keyword;
    const nextKeyword = this.state.keyword;
    const prevPage = prevState.page;
    const page = this.state.page;

    if (prevKeyword !== nextKeyword) {
      this.setState({ status: "pending" });

      fetchGallery(nextKeyword, page)
        .then((galleryArray) =>
          this.setState({ galleryItems: galleryArray.hits, status: "resolved" })
        )
        .catch((error) => this.setState({ error, status: "reject" }));
    }
    if (prevPage !== page) {
      fetchGallery(nextKeyword, page)
        .then((galleryArray) =>
          this.setState({
            galleryItems: [...this.state.galleryItems, ...galleryArray.hits],
            status: "resolved",
          })
        )
        .catch((error) => this.setState({ error, status: "reject" }));
      // window.scrollBy({
      //   top: document.documentElement.scrollHeight,
      //   behavior: "smooth",
      // });
    }
  }

  handleFormSubmission = (keyword) => {
    this.setState({ keyword: keyword });
    this.setState({ page: 1 });
  };
  handleButtonClick = () => {
    this.setState({ page: this.state.page + 1 });
    const { keyword, page } = this.state;
    fetchGallery(keyword, page);
  };
  handleOpenModal = (event) => {
    this.setState(({ imgAttribute }) => ({
      imgAttribute: { src: event.target.modalimage, alt: event.target.alt },
    }));

    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    console.log(event.target);
  };

  render() {
    const { galleryItems, error, status, showModal, imgAttribute } = this.state;
    return (
      <div className="App">
        {showModal && (
          <Modal onClose={this.handleOpenModal} imgAttribute={imgAttribute} />
        )}
        <SearchBar formSubmit={this.handleFormSubmission} />
        {status === "reject" && <h1>{error.massage}</h1>}
        {status === "resolved" && (
          <ImageGallery items={galleryItems} openModal={this.handleOpenModal} />
        )}
        {status === "resolved" && (
          <Button handleButtonClick={this.handleButtonClick} />
        )}
        <ToastContainer />
      </div>
    );
  }
}
