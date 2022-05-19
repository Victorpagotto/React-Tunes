import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import './header.css';

class Header extends React.Component {
  render() {
    const { userInfo } = this.props;
    return (
      <header data-testid="header-component" className="header-container">
        <div className="upper-container">
          <div className="logo-container">
            <h1 className="logo">TryBeTune</h1>
          </div>
          <div className="username-container">
            <div className="user-image" />
            <span
              className="username"
              data-testid="header-user-name"
            >
              { userInfo.name }
            </span>
          </div>
        </div>
        <nav className="nav-container">
          <div className="link-container search-link">
            <Link
              className="link"
              to="/search"
              data-testid="link-to-search"
            >
              Pesquisa
            </Link>
          </div>
          <div className="link-container fav-link">
            <Link
              className="link"
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favoritas
            </Link>
          </div>
          <div className="link-container profile-link">
            <Link
              className="link"
              to="/profile"
              data-testid="link-to-profile"
            >
              Perfil
            </Link>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  userInfo: propTypes.shape({
    name: propTypes.string.isRequired,
  }).isRequired,
};

export default Header;
