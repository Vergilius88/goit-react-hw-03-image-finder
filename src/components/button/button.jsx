import "./button.css";

const Button = ({ handleButtonClick }) => {
  return (
    <>
      <button type="button" className="Button" onClick={handleButtonClick}>
        Load more....
      </button>
    </>
  );
};

export default Button;
