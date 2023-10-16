import styles from './styles.module.scss';

export const FieldError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return <p className={styles.fieldError}>{message}</p>;
};
