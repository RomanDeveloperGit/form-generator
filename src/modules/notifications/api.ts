import { notification } from 'antd';
import { ReactNode } from 'react';

import { NotificationType } from '@/constants/notifications';

export const notificationsApi = (
  type: NotificationType,
  title: ReactNode,
  description?: ReactNode,
  duration: number = 7,
) => {
  notification[type]({
    message: title,
    description,
    duration,
  });
};
