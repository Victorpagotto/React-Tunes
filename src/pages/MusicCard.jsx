import React from 'react';
import propTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, keyid } = this.props;
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
              className="favorite-label"
              id={ `${keyid}.label` }
            >
              ❤
              <input
                type="checkbox"
                name=""
                id={ `${keyid}` }
                className="favorite-checkbox"
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
};

export default MusicCard;
