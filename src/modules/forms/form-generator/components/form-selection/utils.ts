import { Form, FormId } from '../../../model/types';

export type FormOption = {
  label: string;
  value: FormId;
};

export const convertFormsToOptions = (forms: Form[]): FormOption[] =>
  forms.map((form) => ({ label: form.name, value: form.id }));
