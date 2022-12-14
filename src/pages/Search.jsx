import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    desabledSearch: true,
  };

  handleSearch = ({ target }) => {
    const maxLength = 2;
    const { value } = target;
    const compareLength = value.length >= maxLength;
    this.setState({ desabledSearch: !compareLength });
  };

  render() {
    const { desabledSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-input">
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.handleSearch }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ desabledSearch }
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
