export type FormId = string;
export type FieldId = string;

export type Field = {
  id: FieldId;
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: unknown;
};

export type Form = {
  id: FormId;
  name: string;
  fields: Field[];
};
