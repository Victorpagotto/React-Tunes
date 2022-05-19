import React from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import Loading from './Loading';

class Favorites extends React.Component {
  componentDidMount() {
    const { handleUser } = this.props;
    handleUser();
  }

  render() {
    const { userInfo, loading } = this.props;
    if (!loading) {
      return (
        <div data-testid="page-favorites">
          <Header userInfo={ userInfo } />
          <h1>Favorites Page</h1>
        </div>
      );
    }
    return <Loading />;
  }
}

Favorites.propTypes = {
  userInfo: propTypes.shape({
    name: propTypes.string.isRequired,
  }).isRequired,
  loading: propTypes.bool.isRequired,
  handleUser: propTypes.func.isRequired,
};

export default Favorites;
