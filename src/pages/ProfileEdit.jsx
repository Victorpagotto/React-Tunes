import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';
import './profileEdit.css';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    userInfo: {
      name: '',
      email: '',
      image: '',
      description: '',
    },
    imageUrl: '',
    userName: '',
    userEmail: '',
    userDescription: '',
    validEmail: true,
    redirectUser: false,
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      const { name, image, email, description } = user;
      this.setState({
        userInfo: user,
        userName: name,
        userEmail: email,
        userDescription: description,
        imageUrl: image,
        loading: false,
      }, () => {
        if (email === '') this.setState({ validEmail: false });
      });
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      if (target.type === 'email') {
        const { validity: { valid } } = target;
        this.setState({ validEmail: valid });
      }
    });
  }

  submiteUserInfo = () => {
    const { imageUrl, userName, userEmail, userDescription } = this.state;
    const object = {
      name: userName,
      email: userEmail,
      image: imageUrl,
      description: userDescription,
    };
    this.setState({ loading: true }, async () => {
      await updateUser(object);
      this.setState({ loading: false, redirectUser: true });
    });
  }

  checkInputFilled = () => {
    const { validEmail } = this.state;
    const info = Object.values(this.state);
    const filled = info.some((item) => item === '');
    return ((!validEmail) || (filled));
  }

  render() {
    const { userInfo, loading, userName, userEmail, imageUrl } = this.state;
    const { userDescription, redirectUser } = this.state;
    if (!loading) {
      return (
        <div data-testid="page-profile-edit">
          { redirectUser && <Redirect to="/profile" /> }
          <Header userInfo={ userInfo } />
          <form className="edit-profile-form">
            <div className="edit-user-image">
              <div className="edit-image-container">
                <img src={ imageUrl } alt="user profile" className="edit-image" />
              </div>
              <input
                type="text"
                value={ imageUrl }
                name="imageUrl"
                onChange={ this.handleChange }
                placeholder="Insira uma URL de imagem."
                data-testid="edit-input-image"
                className="edit-image-input edit-input"
              />
            </div>
            <div className="user-profile-input">
              <label htmlFor="userNameInput" className="email-edit-label">
                Nome
                <input
                  type="text"
                  value={ userName }
                  name="userName"
                  onChange={ this.handleChange }
                  id="userNameInput"
                  data-testid="edit-input-name"
                  className="edit-input"
                />
              </label>
            </div>
            <div className="user-profile-input">
              <label htmlFor="userEmail" className="email-edit-label">
                E-mail
                <input
                  type="email"
                  value={ userEmail }
                  name="userEmail"
                  onChange={ this.handleChange }
                  id="userEmail"
                  data-testid="edit-input-email"
                  className="edit-input"
                />
              </label>
            </div>
            <div className="user-profile-input">
              <label htmlFor="userDescription" className="email-edit-label">
                Descrição
                <textarea
                  value={ userDescription }
                  name="userDescription"
                  onChange={ this.handleChange }
                  id="userDescription"
                  data-testid="edit-input-description"
                  className="profile-edit-description"
                />
              </label>
            </div>
            <div className="profile-edit-button-container">
              <button
                type="button"
                disabled={ this.checkInputFilled() }
                data-testid="edit-button-save"
                onClick={ this.submiteUserInfo }
                className="profile-edit-button"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      );
    }
    return <Loading />;
  }
}

export default ProfileEdit;
