import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
// import { musica } from "../services/musicsAPI";
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    checkin: false,
    onLoading: false,
  }

  // Ao favoritar uma música, aguarde o retorno da função addSong (que já foi implementada no requisito 8) e utilize a função getFavoriteSongs da favoriteSongsAPI para recuperar a lista de músicas favoritas.

  // favoriteMusic = async () => {
  //   this.setState({ onLoading: true });
  //   const { music } = this.props;
  //   console.log();
  //   this.setState({ onLoading: false });
  // }

  checkin = async () => {
    this.setState({ onLoading: true });
    const { music } = this.props;
    await addSong(music);
    await getFavoriteSongs(music);
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
                  name="checkboxFavorites"
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ this.checkin }
                  checked={ checkin }
                  // value={ () => favoriteMusic }
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
