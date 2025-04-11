import {
  DndContext,
  DragEndEvent,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./components/Sidebar";
import FormCanvas from "./components/FormCanvas";
import { Field } from "./models/field.model";
import { FormPreview } from "./components/FormPreview";
import {
  generateFormHTML,
  generateReactHookFormCode,
} from "./utils/formGeneratorUtils";
import { ToolbarForm } from "./components/ToolbarForm";
import { PreviewModal } from "./components/PreviewModal";

const App = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [activeDragItem, setActiveDragItem] = useState<null | Field>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showHTML, setShowHTML] = useState(false);
  const [html, setHtml] = useState("");

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // New field being dragged from sidebar
    if (active.data.current?.fieldType) {
      const isDroppingOverCanvas =
        over.id === "form-canvas" || fields.some((f) => f.id === over.id);

      if (isDroppingOverCanvas) {
        const draggedType = active.data.current?.fieldType;
        const id = uuidv4();
        const newField = {
          id,
          type: draggedType,
          label: `${
            draggedType.charAt(0).toUpperCase() + draggedType.slice(1)
          } Field`,
          name: `${draggedType}_${id}`,
          placeholder:
            draggedType !== "checkbox" ? "Enter value..." : undefined,
          required: false,
          options: ["select", "radio"].includes(draggedType)
            ? ["Option 1", "Option 2"]
            : undefined,
        };
        setFields((prev) => [...prev, newField]);
        return;
      }
    }

    // Sorting logic
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      setFields((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const handleUpdate = (updatedField: Field) => {
    setFields((prev) =>
      prev.map((f) => (f.id === updatedField.id ? updatedField : f))
    );
  };
  const handleDelete = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  const handleGenerateHTML = () => {
    const generated = generateFormHTML(fields);
    setHtml(generated);
    setShowHTML(true);
  };

  const handleGenerateReactCode = () => {
    const jsx = generateReactHookFormCode(fields);
    setHtml(jsx);
    setShowHTML(true);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={(event) => {
        setActiveDragItem(null);
        handleDragEnd(event);
      }}
      onDragStart={({ active }) => {
        const fieldType = active.data.current?.fieldType;
        if (fieldType) {
          const id = uuidv4();
          setActiveDragItem({
            id,
            type: fieldType,
            label: `${
              fieldType.charAt(0).toUpperCase() + fieldType.slice(1)
            } Field`,
            name: `${fieldType}_${id}`,
            required: false,
          });
        }
      }}
    >
      <DragOverlay>
        {activeDragItem ? (
          <div className="px-4 py-2 rounded bg-white border shadow text-sm text-gray-800">
            {activeDragItem.label}
          </div>
        ) : null}
      </DragOverlay>
      <main className="min-h-screen bg-gray-100 p-4 text-gray-900">
        <h1 className="text-2xl font-bold text-center mb-6">
          React Form Builder
        </h1>
        <ToolbarForm
          isPreview={isPreviewMode}
          onTogglePreview={() => setIsPreviewMode((prev) => !prev)}
          onGenerateHTML={handleGenerateHTML}
          onGenerateReactCode={handleGenerateReactCode}
        />
        <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto">
          {isPreviewMode ? (
            <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
              <FormPreview fields={fields} />
            </div>
          ) : (
            <>
              <Sidebar />
              <SortableContext
                items={fields.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                <FormCanvas
                  fields={fields}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              </SortableContext>
            </>
          )}
        </div>
      </main>
      {showHTML && (
        <PreviewModal html={html} onClose={() => setShowHTML(false)} />
      )}
    </DndContext>
  );
};

export default App;
