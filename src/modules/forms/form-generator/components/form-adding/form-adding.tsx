import { PlusOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { useAppDispatch } from '@/helpers/store';

import { ValidationError } from '@/modules/ui/validation-error';

import { formsThunkActions } from '../../../model/actions';
import { FormNameSchema, formNameSchema } from '../../schemas/form-name-schema';

import styles from './styles.module.scss';

export const FormAdding = () => {
  const dispatch = useAppDispatch();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormNameSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(formNameSchema),
    defaultValues: {
      name: '',
    },
  });

  const handleCreateFormSubmit = handleSubmit(async (data) => {
    const result = await dispatch(formsThunkActions.createForm(data.name));

    if (result.meta.requestStatus === 'fulfilled') {
      reset();
    }
  });

  const nameInputStatus = errors.name?.message ? 'error' : undefined;

  return (
    <form className={styles.container} onSubmit={handleCreateFormSubmit}>
      <div className={styles.controlBox}>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              autoComplete="off"
              placeholder="Название формы"
              status={nameInputStatus}
            />
          )}
          name="name"
          control={control}
        />
        <Button type="link" htmlType="submit" icon={<PlusOutlined />}>
          Добавить
        </Button>
      </div>
      <ValidationError message={errors.name?.message} />
    </form>
  );
};
