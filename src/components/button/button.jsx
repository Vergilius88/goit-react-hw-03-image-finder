import "./button.css";

window.scrollTo({
  top: document.documentElement.scrollHeight,
  behavior: "smooth",
});

export default function Button() {
  return (
    <>
      <button type="button" className="Button">
        Load more....
      </button>
    </>
  );
}
