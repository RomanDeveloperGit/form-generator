export type Field = {
  id: string;
  label: string;
  placeholder?: string;
  defaultValue?: unknown;
};

export type Form = {
  id: string;
  name: string;
  fields?: Field[];
};
