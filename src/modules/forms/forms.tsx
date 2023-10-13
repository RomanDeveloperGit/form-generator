import { FormView } from './form-view';
import { FormGenerator } from './form-generator';

import styles from './styles.module.scss';

export const Forms = () => {
  return (
    <div className={styles.container}>
      <FormView />
      <FormGenerator />
    </div>
  );
};
