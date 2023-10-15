import { Forms } from '@/modules/forms';
import { Notifications } from '@/modules/notifications';

// eslint-disable-next-line import/no-unassigned-import
import 'normalize.css';

import styles from './styles.module.scss';

export const App = () => {
  // sentry ( повешать листенер на все реджекты )
  // api ???

  return (
    <div className={styles.container}>
      <Forms />
      <Notifications />
    </div>
  );
};
