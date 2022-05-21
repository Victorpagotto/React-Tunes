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
import { addSong, getFavoriteSongs } from './services/favoriteSongsAPI';

class App extends React.Component {
  state = {
    userInfo: {
      name: '',
    },
    loading: false,
    albumList: [],
    searchedArtist: '',
    loadedAlbum: [{
      artworkUrl100: 'loading',
      collectionName: 'loading',
      artistName: 'loading',
    }, {
      trackName: 'loading',
      previewUrl: 'loading',
      trackId: 'loading',
    }],
    favoriteTracks: [{}],
  }

  handleUser = () => {
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

  getFavoriteSongsFiltered = async (chosenAlbum) => {
    const favList = await getFavoriteSongs();
    const songs = chosenAlbum.slice(1);
    return songs.map((track) => {
      const { trackId } = track;
      return favList.find((song) => song.trackId === trackId);
    }).filter((track) => track !== undefined);
  }

  handleAlbum = async (albumId) => {
    this.setState({ loading: true }, async () => {
      const chosenAlbum = await getMusics(albumId);
      this.setState({ loadedAlbum: chosenAlbum }, async () => {
        const favorites = await this.getFavoriteSongsFiltered(chosenAlbum);
        this.setState({ favoriteTracks: favorites }, () => {
          this.setState({ loading: false });
        });
      });
    });
  }

  handleFavorite = (song, albumId) => {
    this.setState({ loading: true }, async () => {
      await addSong(song);
      const chosenAlbum = await getMusics(albumId);
      const favList = await this.getFavoriteSongsFiltered(chosenAlbum);
      this.setState({ loading: false, favoriteTracks: favList });
    });
  }

  render() {
    const { userInfo, loading, albumList, searchedArtist, loadedAlbum } = this.state;
    const { favoriteTracks } = this.state;
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
                handleFavorite={ this.handleFavorite }
                favoriteTracks={ favoriteTracks }
                stateAccess={ this.stateAccess }
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
