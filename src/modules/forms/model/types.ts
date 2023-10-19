export type FormId = string;
export type FieldId = string;

export type Field = {
  id: FieldId;
  name: string;
  placeholder: string;
  defaultValue: string;
};

export type FieldWithoutId = Omit<Field, 'id'>;

export type Form = {
  id: FormId;
  name: string;
  fields: Field[];
};
