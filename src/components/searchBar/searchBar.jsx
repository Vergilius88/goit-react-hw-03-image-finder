import { Component } from "react";
import { toast } from "react-toastify";
import "./searchBar.css";

export default class SearchBar extends Component {
  state = {
    keyword: "",
  };

  handleKeywordChange = (event) => {
    this.setState({ keyword: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.keyword.trim() === "") {
      return toast.error("Введите слово для поиска!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    this.props.formSubmit(this.state.keyword);
    this.setState({ keyword: "" });
  };

  render() {
    return (
      <header className="SearchBar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            onChange={this.handleKeywordChange}
            value={this.state.keyword}
          />
        </form>
      </header>
    );
  }
}
