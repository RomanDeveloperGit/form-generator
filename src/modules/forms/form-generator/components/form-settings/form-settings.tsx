import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Drawer, Input, Modal, Typography } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@/helpers/store';

import { DrawerSize } from '@/constants/element-sizes';

import { formsThunkActions } from '../../../model/actions';
import { formsSelectors } from '../../../model/list/selectors';
import {
  FormNameSchemaFields,
  formNameSchema,
} from '../../schemas/form-name-schema';

import styles from './styles.module.scss';

export const FormSettings = ({ formId }: { formId: string }) => {
  const dispatch = useAppDispatch();
  const formName = useAppSelector((state) =>
    formsSelectors.getFormNameById(state, formId),
  );

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormNameSchemaFields>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formNameSchema),
    defaultValues: {
      name: '',
    },
  });

  const [isRenameDrawerOpen, setRenameDrawerOpen] = useState(false);

  const handleRenameButtonClick = () => {
    setRenameDrawerOpen(true);
  };

  const handleDeleteButtonClick = () => {
    Modal.confirm({
      title: `Вы действительно хотите удалить форму "${formName}"?`,
      content: 'Удалится форма и все прикреплённые к ней поля.',
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отменить',
      onOk() {
        dispatch(formsThunkActions.deleteForm(formId));
      },
    });
  };

  const handleRenameDrawerClose = () => {
    setRenameDrawerOpen(false);
  };

  const handleRenameFormSubmit = handleSubmit(async (fields) => {
    const result = await dispatch(
      formsThunkActions.renameForm({
        id: formId,
        newName: fields.name,
      }),
    );

    if (result.meta.requestStatus === 'fulfilled') {
      handleRenameDrawerClose();
      reset();
    }
  });

  const nameInputStatus = errors.name?.message ? 'error' : undefined;

  return (
    <>
      <div className={styles.container}>
        <Typography.Title level={4}>Действия</Typography.Title>
        <div className={styles.buttonBox}>
          <Button onClick={handleRenameButtonClick}>Переименовать</Button>
          <Button onClick={handleDeleteButtonClick}>Удалить</Button>
        </div>
      </div>
      <Drawer
        title={`Редактирование формы "${formName}"`}
        width={DrawerSize.Default}
        placement="right"
        open={isRenameDrawerOpen}
        onClose={handleRenameDrawerClose}
      >
        <form onSubmit={handleRenameFormSubmit}>
          <div className={styles.controlBox}>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="Новое название"
                  status={nameInputStatus}
                />
              )}
              name="name"
              control={control}
            />
            <Button htmlType="submit" type="primary">
              Сохранить
            </Button>
          </div>
          {errors.name?.message && (
            <p className={styles.fieldError}>{errors.name?.message}</p>
          )}
        </form>
      </Drawer>
    </>
  );
};
