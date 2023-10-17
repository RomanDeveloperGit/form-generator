import { memo } from 'react';

import { FieldId } from '@/modules/forms/model/types';

export const FieldSettings = memo(({ fieldId }: { fieldId: FieldId }) => {
  console.log('FIELD', fieldId);
  // use Selector field

  return <div>Field settings</div>;
});
