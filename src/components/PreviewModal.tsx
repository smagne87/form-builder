interface PreviewModalProps {
  html: string;
  onClose: () => void;
}
export const PreviewModal = ({ html, onClose }: PreviewModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-xl w-full relative">
        <h2 className="text-xl font-bold mb-4">Generated HTML</h2>
        <textarea
          className="w-full h-64 p-2 border rounded font-mono text-sm"
          value={html}
          readOnly
        />
        <div className="flex justify-between mt-4">
          <button
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
            onClick={() => {
              navigator.clipboard.writeText(html);
            }}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};
