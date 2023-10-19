import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Drawer, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { DrawerSize } from '@/constants/element-sizes';

import { ValidationError } from '@/modules/forms/form-generator/components/validation-error';
import { FieldWithoutId } from '@/modules/forms/model/types';

import { FieldSchema, fieldSchema } from '../../schemas/field-schema';

import styles from './styles.module.scss';

export const FieldDrawer = ({
  title,
  formInitValues,
  submitButtonText,
  isDrawerOpen,
  onSubmit,
  onClose,
}: {
  title: string;
  formInitValues: FieldWithoutId;
  submitButtonText: string;
  isDrawerOpen: boolean;
  onSubmit: (data: FieldWithoutId) => Promise<void>;
  onClose: () => void;
}) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(fieldSchema),
    values: formInitValues,
  });

  const handleDrawerClose = () => {
    onClose();
    reset();
  };

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      await onSubmit(data);

      handleDrawerClose();
    } catch (error) {}
  });

  const nameInputStatus = errors.name?.message ? 'error' : undefined;
  const placeholderInputStatus = errors.placeholder?.message
    ? 'error'
    : undefined;
  const defaultValueInputStatus = errors.defaultValue?.message
    ? 'error'
    : undefined;

  return (
    <Drawer
      title={title}
      width={DrawerSize.Default}
      placement="right"
      open={isDrawerOpen}
      onClose={handleDrawerClose}
    >
      <form className={styles.drawerForm} onSubmit={handleFormSubmit}>
        <div className={styles.drawerInputBox}>
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
        <div className={styles.drawerInputBox}>
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
        <div className={styles.drawerInputBox}>
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
        <Button
          className={styles.drawerButton}
          htmlType="submit"
          type="primary"
        >
          {submitButtonText}
        </Button>
      </form>
    </Drawer>
  );
};
