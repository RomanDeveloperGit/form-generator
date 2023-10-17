import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Drawer, Input, Modal, Typography } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@/helpers/store';

import { DrawerSize } from '@/constants/element-sizes';

import { formsSelectors, formsThunkActions } from '@/modules/forms';
import { FormId } from '@/modules/forms/model/types';
import { ValidationError } from '@/modules/ui/validation-error';

import { FieldSchema, fieldSchema } from '../../schemas/field-schema';
import { FieldSettings } from '../field-settings';

import styles from './styles.module.scss';

export const FieldsSettings = ({ formId }: { formId: FormId }) => {
  const dispatch = useAppDispatch();
  const formName = useAppSelector((state) =>
    formsSelectors.getFormNameById(state, formId),
  );
  const fields = useAppSelector((state) =>
    formsSelectors.getFormFieldsById(state, formId),
  );

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(fieldSchema),
    defaultValues: {
      name: '',
      placeholder: '',
      defaultValue: '',
    },
  });

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
    reset();
  };

  const handleCreateFieldSubmit = handleSubmit(async (data) => {
    const result = await dispatch(
      formsThunkActions.createField({
        formId,
        field: data,
      }),
    );

    if (result.meta.requestStatus === 'fulfilled') {
      handleCreateFieldDrawerClose();
    }
  });

  const nameInputStatus = errors.name?.message ? 'error' : undefined;
  const placeholderInputStatus = errors.placeholder?.message
    ? 'error'
    : undefined;
  const defaultValueInputStatus = errors.defaultValue?.message
    ? 'error'
    : undefined;

  console.log('FIELDSSSSSSSSSSSSSSSSSs');

  return (
    <>
      <div>
        <div className={styles.top}>
          <Typography.Title level={4}>Поля</Typography.Title>
          <div className={styles.buttonBox}>
            <Button onClick={handleCreateFieldButtonClick}>
              Добавить новое
            </Button>
            <Button onClick={handleDeleteAllFieldsButtonClick}>
              Удалить все
            </Button>
          </div>
        </div>
        {fields?.map((field) => (
          <FieldSettings fieldId={field.id} key={field.id} />
        ))}
      </div>
      <Drawer
        title={`Добавление поля для формы "${formName}"`}
        width={DrawerSize.Default}
        placement="right"
        open={isCreateFieldDrawerOpen}
        onClose={handleCreateFieldDrawerClose}
      >
        <form onSubmit={handleCreateFieldSubmit}>
          <div>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="Название поля"
                  status={nameInputStatus}
                />
              )}
              name="name"
              control={control}
            />
            <ValidationError message={errors.name?.message} />
          </div>
          <div>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="placeholder"
                  status={placeholderInputStatus}
                />
              )}
              name="placeholder"
              control={control}
            />
            <ValidationError message={errors.placeholder?.message} />
          </div>
          <div>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="defaultValue"
                  status={defaultValueInputStatus}
                />
              )}
              name="defaultValue"
              control={control}
            />
            <ValidationError message={errors.defaultValue?.message} />
          </div>
          <Button htmlType="submit" type="primary">
            Сохранить
          </Button>
        </form>
      </Drawer>
    </>
  );
};
