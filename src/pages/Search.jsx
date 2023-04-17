import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    name: '',
    btnDisable: true,
  };

  onInputChange = (event) => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
      btnDisable: value.length <= 1,
    });
  };

  render() {
    const { name, btnDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            id="name-input"
            data-testid="search-artist-input"
            type="text"
            name="name"
            value={ name }
            onChange={ this.onInputChange }
          />
          <button
            id="btn"
            data-testid="search-artist-button"
            disabled={ btnDisable }
            onClick={ this.btn }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
