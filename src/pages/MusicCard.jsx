import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
// import { musica } from "../services/musicsAPI";
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    checkin: false,
    onLoading: false,
  }

  checkin = async () => {
    this.setState({ onLoading: true });
    const { music } = this.props;
    await addSong(music);
    console.log('ok');
    this.setState({ checkin: true, onLoading: false });
  }

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { checkin, onLoading } = this.state;
    return (
      <div>

        {onLoading ? (
          <Loading />
        ) : (
          <>
            <h6>{trackName}</h6>
            <form>

              <label htmlFor={ `checkbox-music-${trackId}` }>
                Favorita

                <input
                  type="checkbox"
                  name=""
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ this.checkin }
                  checked={ checkin }
                />

              </label>
            </form>

            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MusicCard;
