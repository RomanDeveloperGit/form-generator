import { Form } from '../model/types';

export type FormOption = {
  label: Form['name'];
  value: Form['id'];
};

type ConvertFormsToOptions = (forms: Form[]) => FormOption[];
export const convertFormsToOptions: ConvertFormsToOptions = (forms) =>
  forms.map((form) => ({ label: form.name, value: form.id }));
