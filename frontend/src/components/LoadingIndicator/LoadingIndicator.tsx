'use client';

import classNames from 'classnames';
import ms from 'milliseconds';
import styles from './LoadingIndicator.module.scss';
import {useEffect, useState} from 'react';

const ELLIPSES_TIME = ms.seconds(0.45);

export interface LoadingIndicatorProps {
  isFullScreen?: boolean;
  isCentered?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const LoadingIndicator = ({
  isFullScreen = false,
  isCentered = false,
  variant = 'primary',
  size = 'medium',
}: LoadingIndicatorProps) => {
  const loadSpinner = true;
  const loadingTextClasses = classNames(
    styles.copy,
    styles.copy_subtle,
    styles.copy_small,
    styles.copy_italic
  );
  const mainClasses = classNames(styles.loadingIndicator, {
    [styles.loadingIndicator_fullScreen]: isFullScreen,
    [styles.loadingContainer_center]: isCentered,
    [styles.loadingIndicator_primary]: variant === 'primary',
    [styles.loadingIndicator_secondary]: variant === 'secondary',
    [styles.loadingIndicator_small]: size === 'small',
  });

  const [dots, setDots] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? `${prevDots}.` : ''));
    }, ELLIPSES_TIME);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={mainClasses}>
      {loadSpinner ? (
        <div className={styles.loadingIndicator_container}>
          <div className={styles.wave_container}>
            <div className={`${styles.circle} ${styles.circle1}`} />
            <div className={`${styles.circle} ${styles.circle2}`} />
            <div className={`${styles.circle} ${styles.circle3}`} />
            <div className={`${styles.circle} ${styles.circle4}`} />
          </div>
        </div>
      ) : (
        <span className={loadingTextClasses}>Loading{dots}</span>
      )}
    </div>
  );
};

export default LoadingIndicator;
