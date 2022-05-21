import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';
import './profile.css';

class Profile extends React.Component {
  state = {
    loading: false,
    userInfo: {
      name: '',
      email: '',
      image: '',
      description: '',
    },
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      this.setState({ loading: false, userInfo: user });
    });
  }

  render() {
    const url = 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';
    const { userInfo, loading } = this.state;
    let { image, name, email, description } = userInfo;
    if (image === '') image = url;
    if (name === '') name = 'unknown';
    if (email === '') email = 'unknown';
    if (description === '') description = 'unknown';
    if (!loading) {
      return (
        <div data-testid="page-profile">
          <Header userInfo={ userInfo } />
          <div className="profile-container">
            <div className="profile-edit-pic-container info-container">
              <div className="profile-image-container">
                <img
                  src={ image }
                  alt="user"
                  data-testid="profile-image"
                  className="profile-image"
                />
              </div>
              <Link
                className="edit-profile-link"
                to="/profile/edit"
              >
                Editar perfil
              </Link>
            </div>
            <div className="info-container">
              <p className="info-tag">Nome</p>
              <p className="data">{ name }</p>
            </div>
            <div className="info-container">
              <p className="info-tag">E-Mail</p>
              <p className="data">{ email }</p>
            </div>
            <div className="info-container">
              <p className="info-tag">Descrição</p>
              <p className="data data-description">{ description }</p>
            </div>
          </div>
        </div>
      );
    }
    return <Loading />;
  }
}

export default Profile;
