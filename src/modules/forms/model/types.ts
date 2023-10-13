export type Field = {
  id: string;
  name: string; // просто служебное поле для поиска
  label: string;
  placeholder?: string;
  defaultValue?: unknown;
};

export type Form = {
  id: string;
  name: string;
  fields?: Field[];
};
