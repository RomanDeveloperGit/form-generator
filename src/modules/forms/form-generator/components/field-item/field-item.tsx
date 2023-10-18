import { Button, Card, Modal, Typography } from 'antd';
import { memo } from 'react';

import { useAppDispatch } from '@/helpers/store';

import { formsThunkActions } from '@/modules/forms';
import { Field, FormId } from '@/modules/forms/model/types';

import styles from './styles.module.scss';

export const FieldItem = memo(
  ({ formId, field }: { formId: FormId; field: Field }) => {
    const dispatch = useAppDispatch();

    const handleEditFieldButtonClick = () => {};

    const handleDeleteFieldButtonClick = () => {
      Modal.confirm({
        title: `Вы действительно хотите удалить поле "${field.name}"?`,
        okText: 'Удалить',
        okType: 'danger',
        cancelText: 'Отменить',
        onOk() {
          dispatch(
            formsThunkActions.deleteField({
              formId,
              fieldId: field.id,
            }),
          );
        },
      });
    };

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
          <p>
            <b>Placeholder: </b>
            <span>{placeholder}</span>
          </p>
          <p>
            <b>Default value: </b>
            <span>{defaultValue}</span>
          </p>
        </Card>
      </div>
    );
  },
);
