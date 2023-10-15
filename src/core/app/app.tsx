import { Forms } from '@/modules/forms';
import { Notifications } from '@/modules/notifications';

// eslint-disable-next-line import/no-unassigned-import
import 'normalize.css';

export const App = () => {
  // sentry ( повешать листенер на все реджекты )
  // api ???

  return (
    <div>
      <Forms />
      <Notifications />
    </div>
  );
};
