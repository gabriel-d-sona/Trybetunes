import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Login extends React.Component {
  state = {
    name: '',
    btnDisable: true,
    carregando: false,
    redirect: false,
  };

  onInputChange = (event) => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
      btnDisable: value.length <= 2,
    });
  };

  btn = async () => {
    this.setState({ carregando: true });
    await createUser({ name: 'Name' });
    this.setState({ carregando: false, redirect: true });
  };

  render() {
    const { name, btnDisable, carregando, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        {carregando ? (
          <Carregando />
        ) : (
          <div>
            <input
              id="name-input"
              data-testid="login-name-input"
              type="text"
              name="name"
              value={ name }
              onChange={ this.onInputChange }
            />
            <button
              id="btn"
              data-testid="login-submit-button"
              disabled={ btnDisable }
              onClick={ this.btn }
            >
              Entrar
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
