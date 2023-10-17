import { Form } from '../../../model/types';

import { FormOption } from './types';

type ConvertFormsToOptionsFunction = (forms: Form[]) => FormOption[];

export const convertFormsToOptions: ConvertFormsToOptionsFunction = (forms) =>
  forms.map((form) => ({ label: form.name, value: form.id }));
