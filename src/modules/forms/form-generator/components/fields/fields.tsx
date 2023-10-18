import { Empty } from 'antd';

import { useAppSelector } from '@/helpers/store';

import { formsSelectors } from '@/modules/forms';
import { FormId } from '@/modules/forms/model/types';

import { FieldItem } from '../field-item';

import styles from './styles.module.scss';

export const Fields = ({ formId }: { formId: FormId }) => {
  const fields = useAppSelector((state) =>
    formsSelectors.getFormFieldsById(state, formId),
  );

  if (!fields?.length)
    return (
      <Empty
        className={styles.empty}
        description="У данной формы нет созданных полей."
      />
    );

  return (
    <div>
      {fields.map((field) => (
        <FieldItem field={field} key={field.id} />
      ))}
    </div>
  );
};
