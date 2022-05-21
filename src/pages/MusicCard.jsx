import React from 'react';
import propTypes from 'prop-types';

class MusicCard extends React.Component {
  state = {
    classes: '',
  }

  componentDidMount() {
    this.changeLabelColor();
  }

  changeLabelColor = () => {
    const { check } = this.props;
    if (check) {
      this.setState({ classes: ' red-heart' });
    } else {
      this.setState({ classes: ' black-heart' });
    }
  }

  render() {
    const { trackName, previewUrl, keyid, musicInfo, check } = this.props;
    const { addRemoveFavorite } = this.props;
    const { classes } = this.state;
    return (
      <div className="track-container">
        <div className="track-name-container">
          <div>
            <span>{ trackName }</span>
          </div>
        </div>
        <div className="audio-container">
          <div>
            <audio
              data-testid="audio-component"
              src={ previewUrl }
              className="audio"
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
          </div>
          <div>
            <label
              htmlFor={ `${keyid}` }
              className={ `favorite-label${classes}` }
              id={ `${keyid}.label` }
            >
              Favorita
              <input
                type="checkbox"
                name={ `${keyid}` }
                id={ `${keyid}` }
                data-testid={ `checkbox-music-${keyid}` }
                className="favorite-checkbox"
                onChange={ (e) => {
                  this.changeLabelColor();
                  addRemoveFavorite(e, musicInfo);
                } }
                checked={ check }
              />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  keyid: propTypes.number.isRequired,
  addRemoveFavorite: propTypes.func.isRequired,
  musicInfo: propTypes.shape({}).isRequired,
  check: propTypes.bool.isRequired,
};

export default MusicCard;
