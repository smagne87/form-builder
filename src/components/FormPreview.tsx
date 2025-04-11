import { Field } from "../models/field.model";
import FormFieldPreview from "./FormFieldPreview";

interface FormPreviewProps {
  fields: Field[];
}

export const FormPreview: React.FC<FormPreviewProps> = ({ fields }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto flex flex-col">
      {fields.map((field) => (
        <FormFieldPreview key={field.id} {...field} />
      ))}
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
};
