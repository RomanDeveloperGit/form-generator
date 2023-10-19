import { Button, Modal, Typography } from 'antd';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/helpers/store';

import { formsSelectors, formsThunkActions } from '@/modules/forms';
import { FieldWithoutId, FormId } from '@/modules/forms/model/types';

import { FieldDrawer } from '../field-drawer';

import styles from './styles.module.scss';

export const FieldsActions = ({ formId }: { formId: FormId }) => {
  const dispatch = useAppDispatch();
  const formName = useAppSelector((state) =>
    formsSelectors.getFormNameById(state, formId),
  );

  const [isCreateFieldDrawerOpen, setCreateFieldDrawerOpen] = useState(false);

  const handleCreateFieldButtonClick = () => {
    setCreateFieldDrawerOpen(true);
  };

  const handleDeleteAllFieldsButtonClick = () => {
    Modal.confirm({
      title: `Вы действительно хотите удалить все поля формы "${formName}"?`,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отменить',
      onOk() {
        dispatch(formsThunkActions.deleteAllFields(formId));
      },
    });
  };

  const handleCreateFieldDrawerClose = () => {
    setCreateFieldDrawerOpen(false);
  };

  const handleCreateFieldSubmit = async (data: FieldWithoutId) => {
    await dispatch(
      formsThunkActions.createField({
        formId,
        data,
      }),
    ).unwrap();
  };

  return (
    <>
      <div>
        <div className={styles.top}>
          <Typography.Title level={4}>Поля</Typography.Title>
          <div className={styles.buttonBox}>
            <Button onClick={handleCreateFieldButtonClick}>
              Создать новое
            </Button>
            <Button onClick={handleDeleteAllFieldsButtonClick}>
              Удалить все
            </Button>
          </div>
        </div>
      </div>
      <FieldDrawer
        title={`Создание поля для формы "${formName}"`}
        formInitValues={{
          name: '',
          placeholder: '',
          defaultValue: '',
        }}
        submitButtonText={'Создать'}
        isDrawerOpen={isCreateFieldDrawerOpen}
        onSubmit={handleCreateFieldSubmit}
        onClose={handleCreateFieldDrawerClose}
      />
    </>
  );
};
