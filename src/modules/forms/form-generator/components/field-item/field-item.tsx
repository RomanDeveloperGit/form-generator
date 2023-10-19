import { Button, Card, Modal, Typography } from 'antd';
import { memo, useCallback, useMemo, useState } from 'react';

import { useAppDispatch } from '@/helpers/store';

import { formsThunkActions } from '@/modules/forms';
import { Field, FieldWithoutId, FormId } from '@/modules/forms/model/types';

import { FieldDrawer } from '../field-drawer';

import styles from './styles.module.scss';

export const FieldItem = memo(
  ({ formId, field }: { formId: FormId; field: Field }) => {
    const dispatch = useAppDispatch();

    const [isEditFieldDrawerOpen, setEditFieldDrawerOpen] = useState(false);

    const handleEditFieldButtonClick = useCallback(() => {
      setEditFieldDrawerOpen(true);
    }, []);

    const handleDeleteFieldButtonClick = useCallback(() => {
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
    }, [dispatch, field.id, field.name, formId]);

    const handleEditFieldDrawerClose = () => {
      setEditFieldDrawerOpen(false);
    };

    const handleEditFieldSubmit = async (data: FieldWithoutId) => {
      await dispatch(
        formsThunkActions.editField({
          formId,
          fieldId: field.id,
          newData: data,
        }),
      ).unwrap();
    };

    const title = useMemo(
      () => (
        <div className={styles.title}>
          <Typography.Text className={styles.formName} ellipsis>
            {field.name}
          </Typography.Text>
          <div className={styles.buttonBox}>
            <Button onClick={handleEditFieldButtonClick}>Редактировать</Button>
            <Button onClick={handleDeleteFieldButtonClick}>Удалить</Button>
          </div>
        </div>
      ),
      [field.name, handleDeleteFieldButtonClick, handleEditFieldButtonClick],
    );

    return (
      <>
        <div className={styles.container}>
          <Card title={title} key={field.id}>
            <p>
              <b>Placeholder: </b>
              <span>{field.placeholder || 'отсуствует'}</span>
            </p>
            <p>
              <b>Default value: </b>
              <span>{field.defaultValue || 'отсуствует'}</span>
            </p>
          </Card>
        </div>
        <FieldDrawer
          title={`Редактирование поля "${field.name}"`}
          formInitValues={{
            name: field.name,
            placeholder: field.placeholder,
            defaultValue: field.defaultValue,
          }}
          submitButtonText={'Сохранить'}
          isDrawerOpen={isEditFieldDrawerOpen}
          onSubmit={handleEditFieldSubmit}
          onClose={handleEditFieldDrawerClose}
        />
      </>
    );
  },
);
