'use client';
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface ResumePreviewProps {
  htmlContent: string | null;
  error: string | null;
  isCompiling: boolean;
}

const cleanHtmlContent = (html: string | null): string => {
  if (!html) return '';
  
  // Remove markdown code block markers
  let cleaned = html.replace(/```html|```/g, '');
  
  // Remove any remaining HTML comments if needed
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');
  
  return cleaned.trim();
};

const ResumePreview: React.FC<ResumePreviewProps> = ({ htmlContent, error, isCompiling }) => {
  const [zoom, setZoom] = useState(1);
  const cleanedHtmlContent = cleanHtmlContent(htmlContent);

  return (
    <div className="p-4 bg-white border rounded shadow h-full overflow-auto">
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setZoom((prev) => Math.min(prev + 0.1, 2))}
          disabled={!cleanedHtmlContent || isCompiling}
          className="mr-2"
        >
          Zoom In
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.5))}
          disabled={!cleanedHtmlContent || isCompiling}
        >
          Zoom Out
        </Button>
      </div>
      {isCompiling ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-8 h-8 border-4 border-ats-blue border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Generating resume... This may take a moment.</p>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4">
          <p className="font-semibold">Error:</p>
          <pre className="text-sm mt-2 whitespace-pre-wrap">{error}</pre>
          <p className="text-sm mt-2">
            Common issues:
            <ul className="list-disc pl-4">
              <li>Invalid HTML structure</li>
              <li>Missing closing tags</li>
              <li>Unsupported CSS properties</li>
              <li>Server-side generation issues</li>
            </ul>
          </p>
        </div>
      ) : cleanedHtmlContent ? (
        <div 
          className="w-full"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
          dangerouslySetInnerHTML={{ __html: cleanedHtmlContent }}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No preview available. Enter valid HTML to generate a preview.</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;