import "./modal.css";

const Modal = ({ image }) => {
  return (
    <div className="Overlay">
      <div className="Modal">
        <img src={image.modalimage} alt={image.alt} />
      </div>
    </div>
  );
};

export default Modal;
