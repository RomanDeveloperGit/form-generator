import { useState } from 'react';

import { FormGenerator } from './form-generator';
import { FormView } from './form-view';
import { FormId } from './model/types';
import styles from './styles.module.scss';

export const Forms = () => {
  const [selectedFormId, setSelectedFormId] = useState<FormId>('');

  return (
    <div className={styles.container}>
      <FormView formId={selectedFormId} />
      <FormGenerator
        selectedFormId={selectedFormId}
        onFormSelect={setSelectedFormId}
      />
    </div>
  );
};
