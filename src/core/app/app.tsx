import { FormView, FormGenerator } from '@/modules/forms';

import styles from './styles.module.scss';

export const App = () => {
  // zod
  // react hook form
  // listener
  // sentry
  // local storage
  // api ???
  // eslint sort imports

  return (
    <div className={styles.container}>
      <FormView />
      <FormGenerator />
    </div>
  );
};
