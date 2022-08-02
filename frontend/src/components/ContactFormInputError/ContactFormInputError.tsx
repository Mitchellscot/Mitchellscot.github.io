import classNames from 'classnames';
import React from 'react';
import styles from './ContactFormInputError.module.scss';

export interface ContactFormInputErrorProps {
  errors: any;
  name: string;
}

export default function ContactFormInputError({
  errors,
  name,
}: ContactFormInputErrorProps) {
  const error = classNames(styles.error, {
    [styles.errorVisible]: Boolean(errors[name]),
  });

  return <div className={error}>{errors[name]?.message}</div>;
}
