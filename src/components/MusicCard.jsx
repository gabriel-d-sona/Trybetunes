import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

export default class MusicCard extends Component {
  state = {
    carregando: false,
    favorito: false,
  };

  favoriteClick = async ({ target }) => {
    this.setState({ carregando: true });
    const { song } = this.props;

    const { name } = target;

    this.setState({
      [name]: target.checked,
    });

    await addSong(song);
    await getFavoriteSongs();

    this.setState({ carregando: false });
  };

  render() {
    const { trackName, artworkUrl100, previewUrl, trackId } = this.props;
    const { carregando, favorito } = this.state;
    return (
      carregando ? <Carregando /> : (
        <div>
          <h2>{ trackName }</h2>
          <img src={ artworkUrl100 } alt={ trackName } />
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label data-testid={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              type="checkbox"
              name="favorito"
              value={ favorito }
              checked={ favorito }
              onChange={ this.favoriteClick }
            />
          </label>
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  artworkUrl100: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  song: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};
