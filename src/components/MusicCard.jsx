import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.checkFavorite();
  }

  checkFavorite = async () => {
    const { trackName } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    const isFavorite = favoriteSongs.some((song) => song.trackName === trackName);
    this.setState({ isFavorite });
  };

  checkFavoriteSongs = async ({ target }) => {
    const { trackName } = this.props;
    this.setState({ isLoading: true, isFavorite: true });
    if (target.checked) {
      await addSong(trackName);
    } else {
      await removeSong(trackName);
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isFavorite, isLoading } = this.state;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor="input-checked">
          Favoritar
          <input
            type="checkbox"
            id="input-checked"
            name={ trackId }
            checked={ isFavorite }
            onChange={ this.checkFavoriteSongs }
            data-testid={ `checkbox-music-${trackId}` }
          />
          {isLoading && <span><Loading /></span>}
        </label>

      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
