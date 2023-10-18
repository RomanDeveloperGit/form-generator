import { Button, Card, Typography } from 'antd';

import { Field } from '@/modules/forms/model/types';

import styles from './styles.module.scss';

export const FieldItem = ({ field }: { field: Field }) => {
  const handleEditFieldButtonClick = () => {};
  const handleDeleteFieldButtonClick = () => {};

  const title = (
    <div className={styles.title}>
      <Typography.Text className={styles.formName} ellipsis>
        {field.name}
      </Typography.Text>
      <div className={styles.buttonBox}>
        <Button onClick={handleEditFieldButtonClick}>Редактировать</Button>
        <Button onClick={handleDeleteFieldButtonClick}>Удалить</Button>
      </div>
    </div>
  );

  const placeholder = field.placeholder || 'отсуствует';
  const defaultValue = field.defaultValue || 'отсуствует';

  return (
    <div className={styles.container}>
      <Card title={title} key={field.id}>
        <p>Placeholder: {placeholder}</p>
        <p>Default value: {defaultValue}</p>
      </Card>
    </div>
  );
};
