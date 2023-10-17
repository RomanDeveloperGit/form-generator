export type FormId = string;
export type FieldId = string;

export type Field = {
  id: FieldId;
  name: string;
  placeholder: string;
  defaultValue: string;
};

export type Form = {
  id: FormId;
  name: string;
  fields: Field[];
};
