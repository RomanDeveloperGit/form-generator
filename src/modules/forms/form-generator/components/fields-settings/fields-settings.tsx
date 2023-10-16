import { Button, Typography } from 'antd';

import styles from './styles.module.scss';

export const FieldsSettings = () => {
  const handleCreateFieldButtonClick = () => {
    console.log('handleCreateFieldButtonClick');
  };

  const handleDeleteAllFieldsButtonClick = () => {
    console.log('handleDeleteAllFieldsButtonClick');
  };

  return (
    <div className={styles.container}>
      <Typography.Title level={4}>Поля</Typography.Title>
      <div className={styles.buttonBox}>
        <Button onClick={handleCreateFieldButtonClick}>Добавить новое</Button>
        <Button onClick={handleDeleteAllFieldsButtonClick}>Удалить все</Button>
      </div>
    </div>
  );
};
