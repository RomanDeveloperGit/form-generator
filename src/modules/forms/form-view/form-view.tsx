import { Empty } from 'antd';

import styles from './styles.module.scss';

export const FormView = () => {
  return (
    <div className={styles.container}>
      <Empty description="Выберите форму для отображения." />
    </div>
  );
};
