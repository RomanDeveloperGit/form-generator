import { Typography } from 'antd';
import { useCallback, useState } from 'react';

import { FormId } from '../model/types';

import { Fields } from './components/fields';
import { FieldsActions } from './components/fields-actions';
import { FormActions } from './components/form-actions';
import { FormCreation } from './components/form-creation';
import { FormSelection } from './components/form-selection';
import styles from './styles.module.scss';

export const FormGenerator = () => {
  const [selectedFormId, setSelectedFormId] = useState<FormId>('');

  const handleFormSelect = useCallback((formId: FormId) => {
    setSelectedFormId(formId);
  }, []);

  const handleDeleteSuccess = () => {
    setSelectedFormId('');
  };

  const formCreationSlot = <FormCreation onCreateSuccess={handleFormSelect} />;

  return (
    <div className={styles.container}>
      <Typography.Title level={2}>Редактор форм</Typography.Title>
      <Typography.Paragraph>
        Настройте существующие формы или создайте новую.
      </Typography.Paragraph>
      <FormSelection
        formCreationSlot={formCreationSlot}
        selectedFormId={selectedFormId}
        onFormSelect={handleFormSelect}
      />
      {selectedFormId && (
        <>
          <FormActions
            formId={selectedFormId}
            onDeleteSuccess={handleDeleteSuccess}
          />
          <FieldsActions formId={selectedFormId} />
          <Fields formId={selectedFormId} />
        </>
      )}
    </div>
  );
};
