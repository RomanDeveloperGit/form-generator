import { Form, FormId } from '../../../model/types';

export type FormOption = {
  label: string;
  value: FormId;
};

type ConvertFormsToOptionsFunction = (forms: Form[]) => FormOption[];

export const convertFormsToOptions: ConvertFormsToOptionsFunction = (forms) =>
  forms.map((form) => ({ label: form.name, value: form.id }));
