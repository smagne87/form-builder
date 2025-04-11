export const fieldTypes = [
  "text",
  "number",
  "textarea",
  "checkbox",
  "select",
  "radio",
  "date",
  "email",
] as const;

export type FieldType = (typeof fieldTypes)[number];

export interface Field {
  id: string;
  type: FieldType;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}
