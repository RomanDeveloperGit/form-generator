import { Forms } from '@/modules/forms';
import { Notifications } from '@/modules/notifications';

// eslint-disable-next-line import/no-unassigned-import
import 'normalize.css';

import styles from './styles.module.scss';

export const App = () => {
  return (
    <div className={styles.container}>
      <Forms />
      <Notifications />
    </div>
  );
};
