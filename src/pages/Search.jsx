import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      nome: '',
      onLoading: false,
      searchTargetAlbum: [],
      targetName: '',
    };
  }

  clickOnSearch = async () => {
    const { nome } = this.state;
    this.setState({ onLoading: true, targetName: nome });
    const searchTargetAlb = await searchAlbumsAPI(nome);
    this.setState({
      nome: '',
      onLoading: false,
      searchTargetAlbum: searchTargetAlb,
    });
  };

  handleChange = (event) => {
    const caractNum = 2;
    if (event.value.length >= caractNum) {
      this.setState({
        disabled: false,
      });
    }
  };

  handleOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.handleChange(target);
  };

  render() {
    const { disabled, nome, onLoading, searchTargetAlbum, targetName } = this.state;
    return (
      <div data-testid="page-search">
        {onLoading ? (
          <Loading />
        ) : (
          <>
            <Header />
            <label htmlFor="search-artist-input">
              <input
                type="text"
                name="nome"
                data-testid="search-artist-input"
                onChange={ this.handleOnChange }
                value={ nome }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ disabled }
              onClick={ this.clickOnSearch }
            >
              Pesquisar
            </button>

            {searchTargetAlbum.length === 0 ? (
              <h5>Nenhum álbum foi encontrado</h5>
            ) : (
              <>
                <h3>{`Resultado de álbuns de: ${targetName}`}</h3>

                <div>
                  {searchTargetAlbum.map((album) => (
                    <Link
                      data-testid={ `link-to-album-${album.collectionId}` }
                      key={ album.collectionId }
                      to={ `/album/${album.collectionId}` }
                    >
                      <h4>{album.collectionName}</h4>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

export default Search;
