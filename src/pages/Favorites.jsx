import React from 'react';
import Header from './Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import MusicCard from './MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './favorites.css';

class Favorites extends React.Component {
  state = {
    loading: false,
    userInfo: {
      name: '',
    },
    favoriteTracks: [{}],
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      const favorites = await getFavoriteSongs();
      this.setState({ favoriteTracks: favorites, userInfo: user, loading: false });
    });
  }

  RemoveFavorite = async (_target, song) => {
    this.setState({ loading: true }, async () => {
      await removeSong(song);
      const favorites = await getFavoriteSongs();
      this.setState({ favoriteTracks: favorites, loading: false });
    });
  }

  render() {
    const { userInfo, loading, favoriteTracks } = this.state;
    if (!loading) {
      return (
        <div data-testid="page-favorites" className="favorite-page">
          <Header userInfo={ userInfo } />
          <div className="track-list-container fav-area">
            {
              favoriteTracks.map((track) => {
                const key = parseInt(track.trackId, 10);
                const check = true;
                return (
                  <MusicCard
                    key={ key }
                    trackName={ track.trackName }
                    previewUrl={ track.previewUrl }
                    keyid={ key }
                    idforTest={ track.trackId }
                    musicInfo={ track }
                    addRemoveFavorite={ this.RemoveFavorite }
                    check={ check }
                  />
                );
              })
            }
          </div>
        </div>
      );
    }
    return <Loading />;
  }
}

export default Favorites;
