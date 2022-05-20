import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { getUser } from './services/userAPI';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import getMusics from './services/musicsAPI';

class App extends React.Component {
  state = {
    userInfo: {
      name: '',
    },
    loading: false,
    albumList: [],
    searchedArtist: '',
    loadedAlbum: [{
      artworkUrl100: '',
    }],
  }

  handleUser = () => {
    console.log('done');
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      this.setState({ loading: false, userInfo: user });
    });
  }

  handleSearch = (artistName) => {
    this.setState({ loading: true }, async () => {
      const albums = await searchAlbumsAPI(artistName);
      this.setState({ loading: false, albumList: albums, searchedArtist: artistName });
    });
  }

  handleAlbum = async (albumId, targetState) => {
    this.setState({ loading: true }, async () => {
      const chosenAlbum = await getMusics(albumId);
      this.setState({ loadedAlbum: chosenAlbum }, () => {
        targetState.setState({ loadedAlbum: chosenAlbum }, () => {
          this.setState({ loading: false });
        });
      });
    });
  }

  render() {
    const { userInfo, loading, albumList, searchedArtist, loadedAlbum } = this.state;
    return (
      <section>
        <Router>
          <Switch>
            <Route
              path="/search"
              render={ (props) => (<Search
                { ...props }
                userInfo={ userInfo }
                albumList={ albumList }
                loading={ loading }
                searchedArtist={ searchedArtist }
                handleUser={ this.handleUser }
                handleSearch={ this.handleSearch }
              />) }
            />
            <Route
              path="/album/:id"
              render={ (props) => (<Album
                { ...props }
                userInfo={ userInfo }
                loading={ loading }
                handleUser={ this.handleUser }
                handleAlbum={ this.handleAlbum }
                loadedAlbum={ loadedAlbum }
              />) }
            />
            <Route
              path="/favorites"
              render={ (props) => (<Favorites
                { ...props }
                userInfo={ userInfo }
                loading={ loading }
                handleUser={ this.handleUser }
              />) }
            />
            <Route
              path="/profile"
              render={ (props) => (<Profile
                { ...props }
                userInfo={ userInfo }
                loading={ loading }
                handleUser={ this.handleUser }
              />) }
            />
            <Route
              path="/profile/edit"
              render={ (props) => (<ProfileEdit
                { ...props }
                userInfo={ userInfo }
                loading={ loading }
                handleUser={ this.handleUser }
              />) }
            />
            <Route exact path="/" component={ Login } />
            <Route path="" component={ NotFound } />
          </Switch>
        </Router>
      </section>
    );
  }
}

export default App;
