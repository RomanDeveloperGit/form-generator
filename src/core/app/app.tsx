import { Forms } from '@/modules/forms';
import { Notifications } from '@/modules/notifications';

// eslint-disable-next-line import/no-unassigned-import
import 'normalize.css';

import styles from './styles.module.scss';

export const App = () => {
  // sentry ( повешать листенер на все реджекты )
  // condition, subscribe, unsubscribe, pause, take, signal - подробнее поглядеть
  // метрики - отдельный стейт
  // нотифы - отдельный листенер, который слушает два своих экшена - success, error
  // Визуализировать метрики + сохранять в локал-форейдж

  return (
    <div className={styles.container}>
      <Forms />
      <Notifications />
    </div>
  );
};
