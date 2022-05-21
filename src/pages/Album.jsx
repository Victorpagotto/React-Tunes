import React from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import Loading from './Loading';
import './album.css';
import MusicCard from './MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { getUser } from '../services/userAPI';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    loading: false,
    userInfo: {
      name: '',
    },
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

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      const album = await getMusics(id);
      const favorites = await getFavoriteSongs();
      this.setState({
        userInfo: user,
        loadedAlbum: album,
        favoriteTracks: favorites,
        loading: false,
      });
    });
  }

  addRemoveFavorite = async ({ target: { checked } }, song) => {
    this.setState({ loading: true }, async () => {
      if (checked) {
        await addSong(song);
      } else {
        await removeSong(song);
      }
      const favorites = await getFavoriteSongs();
      this.setState({ favoriteTracks: favorites, loading: false });
    });
  }

  render() {
    const { userInfo, loadedAlbum, favoriteTracks, loading } = this.state;
    const info = loadedAlbum[0];
    const tracks = loadedAlbum.slice(1);
    if (!loading) {
      return (
        <div data-testid="page-album">
          <Header userInfo={ userInfo } />
          <div className="album-track-list-container">
            <div className="album-info-container">
              <div className="track-album-image">
                <img
                  src={ info.artworkUrl100 }
                  alt="Album artwork"
                />
              </div>
              <div className="album-names">
                <p data-testid="album-name">{ info.collectionName }</p>
                <p data-testid="artist-name">{ info.artistName }</p>
              </div>
            </div>
            <div className="track-list-container">
              {
                tracks.map((track) => {
                  const key = parseInt(track.trackId, 10);
                  const checkmark = favoriteTracks
                    .some((favtrack) => favtrack.trackId === track.trackId);
                  return (
                    <MusicCard
                      key={ key }
                      trackName={ track.trackName }
                      previewUrl={ track.previewUrl }
                      keyid={ key }
                      idforTest={ track.trackId }
                      musicInfo={ track }
                      addRemoveFavorite={ this.addRemoveFavorite }
                      check={ checkmark }
                    />
                  );
                })
              }
            </div>
          </div>
        </div>
      );
    }
    return <Loading />;
  }
}

Album.propTypes = {
  // userInfo: propTypes.shape({
  //   name: propTypes.string.isRequired,
  // }).isRequired,
  // loading: propTypes.bool.isRequired,
  // handleUser: propTypes.func.isRequired,
  // handleAlbum: propTypes.func.isRequired,
  // handleFavorite: propTypes.func.isRequired,
  // loadedAlbum: propTypes.arrayOf(propTypes.object).isRequired,
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  // favoriteTracks: propTypes.arrayOf(propTypes.object).isRequired,
};

export default Album;
