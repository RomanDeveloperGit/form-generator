import { Forms } from '@/modules/forms';
import { Notifications } from '@/modules/notifications';

export const App = () => {
  // listener
  // sentry ( повешать листенер на все реджекты )
  // api ???
  // eslint sort imports

  return (
    <div>
      <Forms />
      <Notifications />
    </div>
  );
};
