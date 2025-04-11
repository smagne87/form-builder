import { useDraggable } from "@dnd-kit/core";
import { fieldTypes } from "../models/field.model";

const FieldItem = ({ type }: { type: string }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `field-${type}`,
    data: { fieldType: type },
  });

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-move hover:bg-gray-100 p-2 rounded border"
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </li>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-full md:w-64 bg-white shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Field Types</h2>
      <ul className="space-y-2">
        {fieldTypes.map((type) => (
          <FieldItem key={type} type={type} />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
