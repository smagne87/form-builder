import { Eye, Hammer } from "lucide-react";

interface ToolbarFormProps {
  isPreview: boolean;
  onTogglePreview: () => void;
  onGenerateHTML: () => void;
  onGenerateReactCode: () => void;
}
export const ToolbarForm = ({
  onTogglePreview,
  isPreview,
  onGenerateHTML,
  onGenerateReactCode,
}: ToolbarFormProps) => {
  return (
    <div className="w-full flex justify-center py-4 gap-2">
      <button
        onClick={onTogglePreview}
        className="flex items-center gap-2 px-4 py-2 rounded-md font-medium border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md"
      >
        {isPreview ? (
          <>
            <Hammer size={18} />
            Back to Builder
          </>
        ) : (
          <>
            <Eye size={18} />
            Preview Form
          </>
        )}
      </button>
      <button
        onClick={onGenerateHTML}
        className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
      >
        Generate HTML
      </button>
      <button
        onClick={onGenerateReactCode}
        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Generate React Code
      </button>
    </div>
  );
};
