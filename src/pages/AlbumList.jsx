import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './albumList.css';

class AlbumList extends React.Component {
  render() {
    const { albumList, artistName } = this.props;
    return (
      <div className="album-list-outter-container">
        {
          albumList.length > 0
            ? <h1 className="text-album">{ `Resultado de álbuns de: ${artistName}` }</h1>
            : <h1 className="no-album">Nenhum álbum foi encontrado</h1>
        }
        <div className="album-list-container">
          { albumList.map((album) => {
            const key = album.collectionId;
            return (
              <Link
                key={ key }
                to={ `/album/${key}` }
                className="link-album"
                data-testid={ `link-to-album-${key}` }
              >
                <div className="album-container">
                  <div className="album-image-container">
                    <img
                      src={ album.artworkUrl100 }
                      alt={ `${album.collectionName}'s illustration` }
                      className="album-image"
                    />
                  </div>
                  <div>
                    <p className="album-name">{ album.collectionName }</p>
                    <p className="album-artist">{ album.artistName }</p>
                  </div>
                </div>
              </Link>
            );
          }) }
        </div>
      </div>
    );
  }
}

AlbumList.propTypes = {
  albumList: propTypes.arrayOf(propTypes.object).isRequired,
  artistName: propTypes.string.isRequired,
};

export default AlbumList;
