import { useDroppable } from "@dnd-kit/core";
import SortableField from "./SortableField";
import { Field } from "../models/field.model";

const FormCanvas = ({
  fields,
  onDelete,
  onUpdate,
}: {
  fields: Field[];
  onDelete: (id: string) => void;
  onUpdate: (field: Field) => void;
}) => {
  const { setNodeRef } = useDroppable({ id: "form-canvas" });

  return (
    <section
      ref={setNodeRef}
      className="flex-1 bg-gray-50 border-2 border-dashed border-gray-300 rounded p-4 max-h-screen overflow-auto"
    >
      <h2 className="text-lg font-semibold mb-4">Your Form</h2>
      {fields.length === 0 ? (
        <p className="text-gray-500">Drag fields here</p>
      ) : (
        <ul className="space-y-2">
          {fields.map((field) => (
            <SortableField
              key={field.id}
              field={field}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default FormCanvas;
