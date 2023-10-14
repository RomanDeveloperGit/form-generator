import { Spin } from 'antd';

import styles from './styles.module.scss';

export const AppLoader = () => {
  return <Spin className={styles.spin} size="large" />;
};
