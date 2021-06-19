import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Label from 'Components/Label';
import { kinds } from 'Helpers/Props';
import getQueueStatusText from 'Utilities/Movie/getQueueStatusText';
import translate from 'Utilities/String/translate';
import styles from './MovieFileStatus.css';

function MovieFileStatus(props) {
  const {
    isAvailable,
    monitored,
    movieFile,
    queueStatus,
    queueState,
    colorImpairedMode
  } = props;

  const hasMovieFile = !!movieFile;
  const hasReleased = isAvailable;

  if (queueStatus) {
    const queueStatusText = getQueueStatusText(queueStatus, queueState);

    return (
      <div className={styles.center}>
        <Label
          title=" "
          kind={kinds.QUEUE}
        />
        {queueStatusText}
      </div>
    );
  }

  if (hasMovieFile) {
    const quality = movieFile.quality;

    return (
      <div className={styles.center}>
        <Label
          title=" "
          kind={monitored ? kinds.SUCCESS : kinds.DEFAULT}
        />
        {quality.quality.name}
      </div>
    );
  }

  if (!monitored) {
    return (
      <div className={classNames(
        styles.center,
        styles.missingUnmonitored,
        colorImpairedMode && 'colorImpaired'
      )}
      >
        <Label
          title=" "
          kind={kinds.WARNING}
        />
        {translate('NotMonitored')}
      </div>
    );
  }

  if (hasReleased) {
    return (
      <div className={classNames(
        styles.center,
        styles.missingMonitored,
        colorImpairedMode && 'colorImpaired'
      )}
      >
        <Label
          title=" "
          kind={kinds.DANGER}
        />
        {translate('Missing')}
      </div>
    );
  }

  return (
    <div className={styles.center}>
      <Label
        title=" "
        kind={kinds.INFO}
      />
      {translate('NotAvailable')}
    </div>
  );
}

MovieFileStatus.propTypes = {
  isAvailable: PropTypes.bool,
  monitored: PropTypes.bool.isRequired,
  movieFile: PropTypes.object,
  queueStatus: PropTypes.string,
  queueState: PropTypes.string,
  colorImpairedMode: PropTypes.bool.isRequired
};

export default MovieFileStatus;
