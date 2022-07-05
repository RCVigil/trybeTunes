import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      onLoading: true,
    };
  }

  componentDidMount() {
    this.logIn();
  }

  logIn = async () => {
    const userName = await getUser();
    this.setState({ nome: userName, onLoading: false });
  };

  render() {
    const { nome, onLoading } = this.state;
    return (
      <div>
        { onLoading ? <Loading /> : (
          <header data-testid="header-component">
            <h3 data-testid="header-user-name">{nome.name}</h3>
          </header>
        )}
      </div>
    );
  }
}

export default Header;
