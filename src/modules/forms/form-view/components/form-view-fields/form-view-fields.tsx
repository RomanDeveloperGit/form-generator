import { Empty } from 'antd';
import { memo } from 'react';

import { useAppSelector } from '@/helpers/store';

import { formsSelectors } from '../../../model/selectors';
import { FormId } from '../../../model/types';
import { FormViewFieldItem } from '../form-view-field-item';

import styles from './styles.module.scss';

export const FormViewFields = memo(({ formId }: { formId: FormId }) => {
  const fields = useAppSelector((state) =>
    formsSelectors.getFormFieldsById(state, formId),
  );

  if (!fields || !fields.length) {
    return (
      <Empty
        className={styles.empty}
        description="У данной формы не существует полей для заполнения."
      />
    );
  }

  return (
    <div className={styles.container}>
      {fields.map((field) => (
        <FormViewFieldItem field={field} key={field.id} />
      ))}
    </div>
  );
});
