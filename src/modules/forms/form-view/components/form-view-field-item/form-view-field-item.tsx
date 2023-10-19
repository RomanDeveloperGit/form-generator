import { Input } from 'antd';
import { memo } from 'react';

import { Field } from '../../../model/types';

export const FormViewFieldItem = memo(({ field }: { field: Field }) => {
  return (
    <Input
      placeholder={field.placeholder}
      defaultValue={field.defaultValue}
      key={field.id}
    />
  );
});
