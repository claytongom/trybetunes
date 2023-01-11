import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    trackSongs: [],
    artistName: '',
    collectionName: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    console.log(musics);
    this.setState({
      artistName: musics[0].artistName,
      collectionName: musics[0].collectionName,
      trackSongs: musics,
    });
  }

  render() {
    const {
      artistName,
      collectionName,
      trackSongs } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h4 data-testid="artist-name">{ artistName }</h4>
          <h3 data-testid="album-name">{ collectionName }</h3>
          {trackSongs.slice(1).map((track) => (
            <MusicCard
              key={ track.trackId }
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
            />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
