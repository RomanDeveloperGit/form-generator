import { PlusOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from 'antd';
import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useAppDispatch } from '@/helpers/store';

import { ValidationError } from '@/modules/forms/form-generator/components/validation-error';
import { FormId } from '@/modules/forms/model/types';

import { formsThunkActions } from '../../../model/actions';
import { FormNameSchema, formNameSchema } from '../../schemas/form-name-schema';

import styles from './styles.module.scss';

export const FormCreation = memo(
  ({ onCreateSuccess }: { onCreateSuccess: (formId: FormId) => void }) => {
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
      try {
        const form = await dispatch(
          formsThunkActions.createForm(data.name),
        ).unwrap();

        reset();
        onCreateSuccess(form.id);
      } catch (error) {}
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
            Создать
          </Button>
        </div>
        <ValidationError message={errors.name?.message} />
      </form>
    );
  },
);
