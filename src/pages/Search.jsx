import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
    };
  }

  handleChange = (event) => {
    const caractNum = 2;
    if (event.value.length >= caractNum) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.handleChange(target);
  }

  render() {
    const { disabled, nome } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search-artist-input">
          <input
            type="text"
            name=""
            data-testid="search-artist-input"
            onChange={ this.handleOnChange }
            value={ nome }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
