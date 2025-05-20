
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface ResumePreviewProps {
  latexCode: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ latexCode }) => {
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!latexCode) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    // Using LaTeX.Online service to render the LaTeX code
    const renderLatex = async () => {
      try {
        // Encode the LaTeX code for use in a URL
        const encodedLatex = encodeURIComponent(latexCode);
        
        // Use LaTeX.Online service to render the PDF
        // The service returns a PDF that we can embed
        const url = `https://latexonline.cc/compile?text=${encodedLatex}&command=pdflatex&download=resume.pdf`;
        
        // Set the URL for the iframe to display
        setPreviewUrl(url);
        setIsLoading(false);
      } catch (error) {
        console.error('Error rendering LaTeX:', error);
        setIsLoading(false);
      }
    };

    // Debounce the rendering to avoid too many requests while typing
    const timeoutId = setTimeout(renderLatex, 1000);
    return () => clearTimeout(timeoutId);
  }, [latexCode]);

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 text-sm font-medium flex items-center">
        <span>Resume Preview</span>
      </div>
      <CardContent className="p-0 flex-1 overflow-auto bg-gray-50">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-10 h-10 border-2 border-ats-blue border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-sm text-gray-500">Rendering preview...</p>
          </div>
        ) : !previewUrl ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-sm text-gray-500">No content to preview</p>
          </div>
        ) : (
          <iframe 
            src={previewUrl}
            className="w-full h-full border-0"
            title="Resume Preview"
            sandbox="allow-scripts allow-same-origin"
            loading="lazy"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ResumePreview;
