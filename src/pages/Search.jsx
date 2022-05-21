import React from 'react';
import Header from './Header';
import Loading from './Loading';
import AlbumList from './AlbumList';
import './search.css';
import { getUser } from '../services/userAPI';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    loading: false,
    artistName: '',
    searchedArtist: '',
    albumList: [],
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

  handleChange = ({ target }) => {
    const { name } = target;
    let { value } = target;
    if (target.type === 'checkbox') value = target.value;
    this.setState({ [name]: value });
  }

  searchButtonClick = () => {
    const { artistName } = this.state;
    this.setState({ loading: true }, async () => {
      const albums = await searchAlbumsAPI(artistName);
      this.setState({ albumList: albums,
        searchedArtist: artistName,
        artistName: '',
        loading: false,
      });
    });
  }

  render() {
    const { userInfo, loading, albumList, searchedArtist, artistName } = this.state;
    const minChar = 2;
    if (!loading) {
      return (
        <div data-testid="page-search" className="search-page">
          <Header userInfo={ userInfo } />
          <div className="search-outter-container">
            <div className="search-container">
              <input
                type="text"
                name="artistName"
                data-testid="search-artist-input"
                onChange={ (e) => this.handleChange(e) }
                value={ artistName }
                className="search-input"
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ artistName.length < minChar }
                className="search-button"
                onClick={ this.searchButtonClick }
              >
                Pesquisar
              </button>
            </div>
          </div>
          <AlbumList albumList={ albumList } artistName={ searchedArtist } />
        </div>
      );
    }
    return <Loading />;
  }
}

export default Search;
