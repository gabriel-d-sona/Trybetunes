import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  state = {
    name: '',
    carregando: false,
  };

  componentDidMount() {
    this.setState({ carregando: true });
    getUser()
      .then((user) => {
        this.setState({ name: user.name, carregando: false });
      });
  }

  render() {
    const { name, carregando } = this.state;
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Músicas Favoritas</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        {
          carregando ? (
            <Carregando />
          ) : (
            <h2 data-testid="header-user-name">{ name }</h2>
          )
        }
      </header>
    );
  }
}

export default Header;
