import { memo } from 'react';

import { useAppSelector } from '@/helpers/store';

import { formsSelectors } from '@/modules/forms';
import { FieldId, FormId } from '@/modules/forms/model/types';

export const FieldSettings = memo(({
  formId,
  fieldId,
}: {
  formId: FormId;
  fieldId: FieldId;
}) => {
  const field = useAppSelector((state) =>
    formsSelectors.getFormFieldById(state, formId, fieldId),
  );
  console.log('FIELD', fieldId, field);
  // use Selector field

  return <div>Field settings</div>;
});
