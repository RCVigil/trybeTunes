import PropTypes from 'prop-types';
import React, { Component } from 'react';

class SongPlay extends Component {
  render() {
    const { music } = this.props;
    const { trackName, previewUrl } = music;
    return (
      <div>
        <h6>{trackName}</h6>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

SongPlay.propTypes = {
  music: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SongPlay;
