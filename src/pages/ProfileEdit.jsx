import React from 'react';
import { getUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    userInfo: {
      name: '',
    },
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      this.setState({ loading: false, userInfo: user });
    });
  }

  render() {
    const { userInfo, loading } = this.state;
    if (!loading) {
      return (
        <div data-testid="page-profile-edit">
          <Header userInfo={ userInfo } />
          <h1>Profile Edit Screen</h1>
        </div>
      );
    }
    return <Loading />;
  }
}

export default ProfileEdit;
