import React from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import Loading from './Loading';
import './album.css';
import MusicCard from './MusicCard';

class Album extends React.Component {
  state = {
    loadedAlbum: [{
      artworkUrl100: 'loading',
      collectionName: 'loading',
      artistName: 'loading',
    }, {
      trackName: 'loading',
      previewUrl: 'loading',
      trackId: 'loading',
    }],
  }

  componentDidMount() {
    const { handleUser, handleAlbum } = this.props;
    const { match: { params: { id } } } = this.props;
    handleUser();
    handleAlbum(`${id}`, this);
  }

  render() {
    const { userInfo, loading } = this.props;
    const { loadedAlbum } = this.state;
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
                  return (
                    <MusicCard
                      key={ key }
                      trackName={ track.trackName }
                      previewUrl={ track.previewUrl }
                      keyid={ key }
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
  userInfo: propTypes.shape({
    name: propTypes.string.isRequired,
  }).isRequired,
  loading: propTypes.bool.isRequired,
  handleUser: propTypes.func.isRequired,
  handleAlbum: propTypes.func.isRequired,
  // loadedAlbum: propTypes.arrayOf(propTypes.object).isRequired,
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
