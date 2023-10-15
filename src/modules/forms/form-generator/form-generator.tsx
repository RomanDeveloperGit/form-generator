import { Typography } from 'antd';
import { useState } from 'react';

import { useAppSelector } from '@/helpers/store';

import { formsSelectors } from '../model/list/selectors';

import { FormAdding } from './components/form-adding';
import { FormSelectionWithAdding } from './components/form-selection-with-adding';
import { FormSettings } from './components/form-settings';
import styles from './styles.module.scss';

export const FormGenerator = () => {
  const [selectedFormId, setSelectedFormId] = useState('');

  const isFormExists = useAppSelector((state) =>
    formsSelectors.isFormExistsById(state, selectedFormId),
  );

  const handleFormSelect = (formId: string) => {
    setSelectedFormId(formId);
  };

  return (
    <div className={styles.container}>
      <Typography.Title level={2}>Редактор форм</Typography.Title>
      <Typography.Paragraph>
        Настройте существующие формы или создайте новую.
      </Typography.Paragraph>
      <FormSelectionWithAdding
        formAddingSlot={<FormAdding />}
        selectedFormId={isFormExists ? selectedFormId : ''}
        onFormSelect={handleFormSelect}
      />
      {isFormExists && <FormSettings formId={selectedFormId} />}
    </div>
  );
};
