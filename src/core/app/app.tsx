import { Forms } from '@/modules/forms';
import { Notifications } from '@/modules/notifications';

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
