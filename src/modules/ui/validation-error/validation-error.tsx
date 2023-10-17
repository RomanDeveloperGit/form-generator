import { memo } from 'react';

import styles from './styles.module.scss';

export const ValidationError = memo(({ message }: { message?: string }) => {
  if (!message) return null;

  return <p className={styles.validationError}>{message}</p>;
});
