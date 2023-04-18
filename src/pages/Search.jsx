import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    name: '',
    btnDisable: true,
    carregando: false,
    album: [],
    artistName: '',
  };

  onInputChange = (event) => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
      btnDisable: value.length <= 1,
      artistName: value,
    });
  };

  btn = async () => {
    const { name } = this.state;
    const artistName = name;
    this.setState({ carregando: true });
    const album = await searchAlbumsAPI(artistName);
    this.setState({ carregando: false, album, name: '' });
  };

  render() {
    const { name, btnDisable, carregando, album, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
          Pesquisar
        </button>
        {
          carregando ? (
            <Carregando />
          ) : (
            <div>
              {
                album.length > 0 ? (
                  <div>
                    <h2>
                      {`Resultado de álbuns de: ${artistName}`}
                    </h2>
                    {
                      album.map((element) => (
                        <div key={ element.collectionId }>
                          <Link
                            data-testid={ `link-to-album-${element.collectionId}` }
                            to={ `/album/${element.collectionId}` }
                          >
                            <img src={ element.artworkUrl100 } alt="" />
                            <p>{element.artistName}</p>
                            <p>{element.collectionName}</p>
                            <p>{element.releaseDate}</p>
                          </Link>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  'Nenhum álbum foi encontrado'
                )
              }
            </div>
          )
        }
      </div>
    );
  }
}

export default Search;
