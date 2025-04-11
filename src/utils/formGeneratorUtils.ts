import { Field } from "../models/field.model";

export const generateFormHTML = (fields: Field[]) => {
  return `
  <form>
    ${fields
      .map((field) => {
        const label = `<label>${field.label}${
          field.required ? " *" : ""
        }</label>`;
        const required = field.required ? "required" : "";

        switch (field.type) {
          case "text":
          case "email":
          case "number":
          case "date":
            return `
    <div>
      ${label}
      <input type="${field.type}" placeholder="${
              field.placeholder || ""
            }" ${required} />
    </div>`;
          case "textarea":
            return `
    <div>
      ${label}
      <textarea placeholder="${field.placeholder || ""}" ${required}></textarea>
    </div>`;
          case "checkbox":
            return `
    <div>
      <label>
        <input type="checkbox" ${required} />
        ${field.label}
      </label>
    </div>`;
          case "select":
            return `
    <div>
      ${label}
      <select ${required}>
        ${(field.options || [])
          .map((opt) => `<option>${opt}</option>`)
          .join("\n")}
      </select>
    </div>`;
          case "radio":
            return `
    <div>
      ${label}
      ${(field.options || [])
        .map(
          (opt: string) => `
      <label>
        <input type="radio" name="${field.label}" value="${opt}" ${required} /> ${opt}
      </label>`
        )
        .join("\n")}
    </div>`;
          default:
            return "";
        }
      })
      .join("\n")}
  </form>
    `.trim();
};

export const generateReactHookFormCode = (fields: Field[]) => {
  const inputs = fields
    .map((field) => {
      const validation = field.required ? `{ required: true }` : `{}`;
      const errorCheck = `errors.${field.name}`;

      switch (field.type) {
        case "text":
        case "email":
        case "number":
        case "date":
          return `
    <div>
      <label>${field.label}</label>
      <input type="${field.type}" {...register("${field.name}", ${validation})} />
      {${errorCheck} && <span>This field is required</span>}
    </div>`;
        case "textarea":
          return `
    <div>
      <label>${field.label}</label>
      <textarea {...register("${field.name}", ${validation})}></textarea>
      {${errorCheck} && <span>This field is required</span>}
    </div>`;
        case "checkbox":
          return `
    <div>
      <label>
        <input type="checkbox" {...register("${field.name}", ${validation})} />
        ${field.label}
      </label>
      {${errorCheck} && <span>This field is required</span>}
    </div>`;
        case "select":
          return `
    <div>
      <label>${field.label}</label>
      <select {...register("${field.name}", ${validation})}>
        ${(field.options || [])
          .map((opt) => `<option value="${opt}">${opt}</option>`)
          .join("\n")}
      </select>
      {${errorCheck} && <span>This field is required</span>}
    </div>`;
        case "radio":
          return `
    <div>
      <label>${field.label}</label>
      ${(field.options || [])
        .map(
          (opt) => `
      <label>
        <input type="radio" value="${opt}" {...register("${field.name}", ${validation})} />
        ${opt}
      </label>`
        )
        .join("\n")}
      {${errorCheck} && <span>This field is required</span>}
    </div>`;
        default:
          return "";
      }
    })
    .join("\n");

  return `import { useForm } from "react-hook-form";
  
  export default function MyForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
  
    const onSubmit = (data) => {
      console.log(data);
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
  ${inputs}
        <button type="submit">Submit</button>
      </form>
    );
  }`;
};
