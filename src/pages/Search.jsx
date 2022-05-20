import React from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import Loading from './Loading';
import AlbumList from './AlbumList';
import './search.css';

class Search extends React.Component {
  state = {
    artistName: '',
  }

  componentDidMount() {
    const { handleUser } = this.props;
    handleUser();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    let { value } = target;
    if (target.type === 'checkbox') value = target.value;
    this.setState({ [name]: value });
  }

  searchButtonClick = () => {
    const { artistName } = this.state;
    const { handleSearch } = this.props;
    this.setState({ artistName: '' }, () => {
      handleSearch(artistName);
    });
  }

  render() {
    const { userInfo, loading, albumList, searchedArtist } = this.props;
    const { artistName } = this.state;
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

Search.propTypes = {
  userInfo: propTypes.shape({
    name: propTypes.string.isRequired,
  }).isRequired,
  loading: propTypes.bool.isRequired,
  handleUser: propTypes.func.isRequired,
  handleSearch: propTypes.func.isRequired,
  albumList: propTypes.arrayOf(propTypes.object).isRequired,
  searchedArtist: propTypes.string.isRequired,
};

export default Search;
