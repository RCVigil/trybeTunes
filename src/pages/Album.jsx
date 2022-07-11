import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import SongPlay from './SongPlay';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      music: [],
      artist: '',
      collection: '',
      image: '',
    };
  }

  componentDidMount() {
    this.requisition();
  }

  requisition = async () => {
    const { match: { params: { id } } } = this.props;
    const musica = await getMusics(id);
    console.log(musica);
    this.setState({
      artist: musica[0].artistName,
      collection: musica[0].collectionName,
      music: musica.filter((item) => item.kind === 'song'),
      image: musica[0].artworkUrl100,
    });
  }

  render() {
    const { artist, collection, music, image } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <br />
        <img src={ image } alt="imagem do album que esta tocando." />
        <br />
        <h2 data-testid="artist-name">{artist}</h2>
        <h4 data-testid="album-name">{collection}</h4>
        {music.map((song) => (<SongPlay
          key={ song.trackId }
          music={ song }
        />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default Album;
