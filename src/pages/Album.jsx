import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    musicId: [],
  };

  componentDidMount() {
    this.handleId();
  }

  handleId = async () => {
    const { match: { params: { id } } } = this.props;
    const musicId = await getMusics(id);
    const musicPreview = musicId
      .filter((element) => element.previewUrl && element.trackId);
    this.setState({ musicId: musicPreview });
  };

  render() {
    const { musicId } = this.state;
    const album = musicId[0];

    return (
      <div data-testid="page-album">
        <Header />
        { album && (
          <div>
            <h2 data-testid="artist-name">{album.artistName}</h2>
            <p data-testid="album-name">{album.collectionName}</p>
          </div>
        )}
        {
          musicId && musicId.map((song) => (
            <MusicCard
              key={ song.trackId }
              trackName={ song.trackName }
              artworkUrl100={ song.artworkUrl100 }
              previewUrl={ song.previewUrl }
              trackId={ song.trackId }
              song={ song }
            />
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default Album;
