import { Field } from "../models/field.model";

const FormFieldPreview = ({ type, label, placeholder, required, options }: Field) => {
  const labelText = required ? `${label} *` : label;
  switch (type) {
    case "text":
    case "number":
      return (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">{labelText}</label>
          <input
            type={type}
            required={required}
            className="border px-2 py-1 rounded"
            placeholder={placeholder}
          />
        </div>
      );
    case "textarea":
      return (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">{labelText}</label>
          <textarea
            required={required}
            className="border px-2 py-1 rounded"
            placeholder={placeholder}
          />
        </div>
      );
    case "checkbox":
      return (
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" required={required} />
          {labelText}
        </label>
      );
    case "date":
    case "email":
      return (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">{labelText}</label>
          <input
            type={type}
            required={required}
            placeholder={placeholder}
            className="border px-2 py-1 rounded"
          />
        </div>
      );

    case "radio":
      return (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">{labelText}</span>
          <div className="flex flex-col gap-1 pl-2">
            {(options || []).map((opt, i) => (
              <label key={i} className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name={label}
                  value={opt}
                  required={required}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      );

    case "select":
      return (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">{labelText}</label>
          <select required={required} className="border px-2 py-1 rounded">
            <option value="">Select an option</option>
            {(options || []).map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>
      );

    default:
      return <p>Unknown field</p>;
  }
};

export default FormFieldPreview;
