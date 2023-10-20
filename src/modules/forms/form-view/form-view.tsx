import { Empty } from 'antd';

import { useAppSelector } from '@/libs/store';

import { formsSelectors } from '../model/selectors';
import { FormId } from '../model/types';

import { FormViewFields } from './components/form-view-fields';
import { FormViewHeader } from './components/form-view-header';
import styles from './styles.module.scss';

export const FormView = ({ formId }: { formId: FormId }) => {
  const form = useAppSelector((state) =>
    formsSelectors.getFormById(state, formId),
  );

  if (!formId || !form) {
    return (
      <Empty
        className={styles.empty}
        description="Выберите форму для отображения."
      />
    );
  }

  return (
    <div className={styles.container}>
      <FormViewHeader form={form} />
      <FormViewFields formId={form.id} />
    </div>
  );
};
