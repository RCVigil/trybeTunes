import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      onLoading: false,
      nome: '',
    };
  }

  handleChange = (event) => {
    const caractNum = 3;
    if (event.value.length >= caractNum) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.handleChange(target);
  }

  logIn = async () => {
    this.setState({ onLoading: true });
    const { history } = this.props;
    const { nome } = this.state;
    console.log(nome);
    await createUser({ name: nome });
    history.push('/search');
  };

  render() {
    const { disabled, nome, onLoading } = this.state;
    return (
      <div data-testid="page-login">

        { onLoading ? <Loading /> : (
          <>
            <label htmlFor="login-name-input">
              <input
                type="text"
                name="nome"
                data-testid="login-name-input"
                placeholder="Digite seu nome!"
                onChange={ this.handleOnChange }
                value={ nome }
              />
            </label>

            <button
              name="button-login"
              type="button"
              data-testid="login-submit-button"
              onClick={ this.logIn }
              disabled={ disabled }
            >
              Entrar
            </button>
          </>
        )}
        ;
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Login;
