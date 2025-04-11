import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, GripVertical, Pencil } from "lucide-react";
import FormFieldPreview from "./FormFieldPreview";
import FieldEditorModal from "./FieldEditorModal";
import { useState } from "react";
import { Field } from "../models/field.model";

const SortableField = ({
  field,
  onDelete,
  onUpdate,
}: {
  field: Field;
  onDelete: (id: string) => void;
  onUpdate: (field: Field) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: field.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = (updated: Field) => {
    onUpdate(updated);
    setIsEditing(false);
  };

  return (
    <>
      <li
        ref={setNodeRef}
        style={style}
        className="bg-white p-3 border rounded shadow flex justify-between items-start gap-2 group"
      >
        <div className="flex flex-col gap-2 w-full">
          <FormFieldPreview {...field} />
        </div>
        <div className="flex flex-col items-center justify-between gap-2 pt-1">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab text-gray-400 hover:text-gray-600"
            title="Drag"
          >
            <GripVertical size={18} />
          </button>
          <button onClick={() => setIsEditing(true)} title="Edit">
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(field.id)}
            className="text-red-500 hover:text-red-700"
            title="Delete"
          >
            <X size={16} />
          </button>
        </div>
      </li>
      <FieldEditorModal
        field={field}
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default SortableField;
