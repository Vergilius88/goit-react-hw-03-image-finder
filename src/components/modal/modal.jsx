import { Component } from "react";
import { createPortal } from "react-dom";
import "./modal.css";
const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  state = {
    src: "",
    alt: "",
  };
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }
  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.onClose();
    }
  };
  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img src="" alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
