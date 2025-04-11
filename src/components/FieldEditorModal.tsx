import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Field } from "../models/field.model";

interface Props {
  field: Field;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Field) => void;
}

const FieldEditorModal = ({ field, isOpen, onClose, onSave }: Props) => {
  const [label, setLabel] = useState(field.label);
  const [placeholder, setPlaceholder] = useState(field.placeholder ?? "");
  const [required, setRequired] = useState(Boolean(field.required));
  const [options, setOptions] = useState(field.options ?? []);

  const handleSave = () => {
    onSave({ ...field, label, placeholder, required, options });
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50 text-gray-900"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white rounded p-6 w-full max-w-sm shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Edit Field
          </Dialog.Title>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Label</label>
              <input
                className="w-full border px-2 py-1 rounded"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            {field.type !== "checkbox" && (
              <div>
                <label className="block text-sm font-medium">Placeholder</label>
                <input
                  className="w-full border px-2 py-1 rounded"
                  value={placeholder}
                  onChange={(e) => setPlaceholder(e.target.value)}
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="required"
                checked={required}
                onChange={(e) => setRequired(e.target.checked)}
              />
              <label htmlFor="required" className="text-sm">
                Required
              </label>
            </div>
            {["select", "radio"].includes(field.type) && (
              <div>
                <label className="block text-sm font-medium">
                  Options (one per line)
                </label>
                <textarea
                  className="w-full border px-2 py-1 rounded"
                  rows={3}
                  value={(options || []).join("\n")}
                  onChange={(e) =>
                    setOptions(
                      e.target.value
                        .split("\n")
                        .filter((opt) => opt.trim() !== "")
                    )
                  }
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button onClick={onClose} className="text-gray-600 hover:underline">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default FieldEditorModal;
