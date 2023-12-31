import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Drawer, Input, Modal, Typography } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { DrawerSize } from '@/constants/element-sizes';

import { useAppDispatch, useAppSelector } from '@/libs/store';

import { ValidationError } from '@/modules/forms/form-generator/components/validation-error/validation-error';
import { FormId } from '@/modules/forms/model/types';

import { formsThunkActions } from '../../../model/actions';
import { formsSelectors } from '../../../model/selectors';
import { FormNameSchema, formNameSchema } from '../../schemas/form-name-schema';

import styles from './styles.module.scss';

export const FormActions = ({
  formId,
  onDeleteSuccess,
}: {
  formId: FormId;
  onDeleteSuccess: () => void;
}) => {
  const dispatch = useAppDispatch();
  const formName = useAppSelector((state) =>
    formsSelectors.getFormNameById(state, formId),
  );

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormNameSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(formNameSchema),
    values: {
      name: formName!,
    },
  });

  const [isRenameFormDrawerOpen, setRenameFormDrawerOpen] = useState(false);

  const handleRenameFormButtonClick = () => {
    setRenameFormDrawerOpen(true);
  };

  const handleDeleteFormButtonClick = () => {
    Modal.confirm({
      title: `Вы действительно хотите удалить форму "${formName}"?`,
      content: 'Удалится форма и все прикреплённые к ней поля.',
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отменить',
      onOk() {
        dispatch(formsThunkActions.deleteForm(formId));
        onDeleteSuccess();
      },
    });
  };

  const handleRenameFormDrawerClose = () => {
    setRenameFormDrawerOpen(false);
    reset();
  };

  const handleRenameFormSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(
        formsThunkActions.renameForm({
          id: formId,
          newName: data.name,
        }),
      ).unwrap();

      handleRenameFormDrawerClose();
    } catch (error) {}
  });

  const nameInputStatus = errors.name?.message ? 'error' : undefined;

  return (
    <>
      <div className={styles.container}>
        <Typography.Title level={4}>Действия</Typography.Title>
        <div className={styles.buttonBox}>
          <Button onClick={handleRenameFormButtonClick}>Переименовать</Button>
          <Button onClick={handleDeleteFormButtonClick}>Удалить</Button>
        </div>
      </div>
      <Drawer
        title={`Редактирование формы "${formName}"`}
        width={DrawerSize.Default}
        placement="right"
        open={isRenameFormDrawerOpen}
        onClose={handleRenameFormDrawerClose}
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
          <ValidationError message={errors.name?.message} />
        </form>
      </Drawer>
    </>
  );
};
