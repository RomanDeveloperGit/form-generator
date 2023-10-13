import { Typography } from 'antd';

import { FormSelectionWithAdding } from './components/form-selection-with-adding';

import styles from './styles.module.scss';

export const FormGenerator = () => {
  return (
    <div className={styles.container}>
      <Typography.Title level={2}>Редактор форм</Typography.Title>
      <Typography.Paragraph>
        Настройте существующие формы или создайте новую.
      </Typography.Paragraph>
      <FormSelectionWithAdding />
    </div>
  );
};
