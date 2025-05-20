import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Set the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface ResumePreviewProps {
  pdfUrl: string | null;
  error: string | null;
  isCompiling: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ pdfUrl, error, isCompiling }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="p-4 bg-white border rounded shadow h-full overflow-auto">
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setZoom((prev) => Math.min(prev + 0.1, 2))}
          disabled={!pdfUrl || isCompiling}
          className="mr-2"
        >
          Zoom In
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.5))}
          disabled={!pdfUrl || isCompiling}
        >
          Zoom Out
        </Button>
      </div>
      {isCompiling ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-8 h-8 border-4 border-ats-blue border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Compiling LaTeX... Please wait.</p>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4">
          <p className="font-semibold">Compilation Error:</p>
          <p>{error}</p>
          <p className="text-sm mt-2">
            Ensure the LaTeX code includes all required packages (e.g., moderncv) and has no syntax errors. Check the server logs for details.
          </p>
        </div>
      ) : pdfUrl ? (
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error("PDF load error:", error)}
          className="w-full"
          loading={<p>Loading PDF...</p>}
        >
          {numPages ? (
            Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={600 * zoom}
                className="mb-4"
              />
            ))
          ) : (
            <p>Loading pages...</p>
          )}
        </Document>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No preview available. Please enter valid LaTeX code.</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;