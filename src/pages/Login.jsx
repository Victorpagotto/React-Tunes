// import propTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import './login.css';

class Login extends React.Component {
  state = {
    username: '',
    loading: false,
    loaded: false,
  }

  handleChange = ({ target }) => {
    const { name } = target;
    let { value } = target;
    if (target.type === 'checkbox') value = target.value;
    this.setState({ [name]: value });
  }

  sendUsername = () => {
    console.log('done');
    const { username } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name: username });
      this.setState({ loading: false, loaded: true });
    });
  }

  render() {
    const { username, loading, loaded } = this.state;
    const minLength = 3;
    if (!loading) {
      return (
        <div data-testid="page-login" className="page-container">
          { loaded && <Redirect to="/search" /> }
          <div className="login-container login-page-container">
            <h1>TrybeTuneS</h1>
            <div className="login login-page-container">
              <input
                type="text"
                data-testid="login-name-input"
                value={ username }
                name="username"
                onChange={ (e) => this.handleChange(e) }
              />
              <button
                type="button"
                data-testid="login-submit-button"
                onClick={ this.sendUsername }
                disabled={ (username.length < minLength) }
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      );
    }
    return <Loading />;
  }
}

// Login.propTypes = {
//   setUser: propTypes.func.isRequired,
// };

export default Login;
