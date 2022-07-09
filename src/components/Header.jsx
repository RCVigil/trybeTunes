import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      onLoading: true,
      // musicas: [],
    };
  }

  componentDidMount() {
    this.logIn();
  }

  logIn = async () => {
    const userName = await getUser();
    this.setState({ nome: userName, onLoading: false });
  };

  // validandoBotao = async (event) => {
  //   this.state({ musicas });
  //   musicas = event;
  //   console.log('Estado-musicas no comp Header é:', musicas);
  // }

  render() {
    const { nome, onLoading } = this.state;
    return (
      <div>
        { onLoading ? <Loading /> : (
          <header data-testid="header-component">
            <h3 data-testid="header-user-name">{nome.name}</h3>
            <Link data-testid="link-to-search" to="/search"> Search </Link>
            <Link data-testid="link-to-favorites" to="/favorites"> Favorites </Link>
            <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
          </header>
        )}
      </div>
    );
  }
}

export default Header;
