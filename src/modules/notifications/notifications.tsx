import { notification } from 'antd';

export const Notifications = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, contextHolder] = notification.useNotification();

  return contextHolder;
};
