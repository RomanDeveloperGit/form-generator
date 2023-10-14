import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PlusOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';

import { useAppDispatch } from '@/helpers/store';

import { formsThunkActions } from '../../../model/actions';

import { formNameSchema, FormNameSchemaFields } from '../../schemas/form-name-schema';
import styles from './styles.module.scss';

export const FormAdding = () => {
  const dispatch = useAppDispatch();

  const {
    control,
    reset,
    getValues,
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

  const handlePreparedSubmit = handleSubmit(async (fields) => {
    const result = await dispatch(formsThunkActions.createForm(fields.name));

    if (result.meta.requestStatus === 'fulfilled') {
      reset();
    }
  });

  const inputStatus = errors.name?.message ? 'error' : undefined;
  const isButtonDisabled = !!errors.name?.message || !getValues('name').length;

  return (
    <form className={styles.container} onSubmit={handlePreparedSubmit}>
      <div className={styles.mainBlock}>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              autoComplete="off"
              placeholder="Название формы"
              status={inputStatus}
            />
          )}
          name="name"
          control={control}
        />
        <Button
          type="link"
          htmlType="submit"
          icon={<PlusOutlined />}
          disabled={isButtonDisabled}
        >
          Добавить
        </Button>
      </div>
      {errors.name?.message && (
        <p className={styles.fieldError}>{errors.name?.message}</p>
      )}
    </form>
  );
};
