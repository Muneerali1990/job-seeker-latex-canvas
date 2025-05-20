
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface ResumePreviewProps {
  latexCode: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ latexCode }) => {
  const [previewHtml, setPreviewHtml] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This is a placeholder for the actual LaTeX to HTML conversion
    // In a real implementation, you would use a service like MathJax or a LaTeX renderer API
    const simulateLatexRendering = () => {
      setIsLoading(true);
      
      // This timeout simulates the rendering process
      setTimeout(() => {
        // Create a simplified HTML representation of the LaTeX code
        // This is just for demonstration purposes
        const parsedHtml = parseLatexToHtml(latexCode);
        setPreviewHtml(parsedHtml);
        setIsLoading(false);
      }, 800);
    };

    simulateLatexRendering();
  }, [latexCode]);

  // A very simplified parser that converts some LaTeX elements to HTML
  // In a real application, you'd use a proper LaTeX to HTML converter
  const parseLatexToHtml = (latex: string) => {
    if (!latex) return '<div class="text-center mt-10">No content to preview</div>';

    let html = latex;
    
    // Extract the document title if present
    const titleMatch = latex.match(/\\title\{(.*?)\}/);
    const title = titleMatch ? titleMatch[1] : 'Resume';
    
    // Extract the author name if present
    const authorMatch = latex.match(/\\author\{(.*?)\}/);
    const author = authorMatch ? authorMatch[1] : 'Candidate Name';

    // Look for sections
    const sections: { title: string, content: string }[] = [];
    const sectionMatches = latex.matchAll(/\\section\{(.*?)\}([\s\S]*?)(?=\\section\{|\\end\{document\}|$)/g);
    
    for (const match of sectionMatches) {
      if (match[1] && match[2]) {
        sections.push({
          title: match[1],
          content: match[2].trim()
        });
      }
    }

    // Create HTML structure
    html = `
      <div class="resume-preview font-serif max-w-[800px] mx-auto p-6 bg-white">
        <div class="text-center mb-6">
          <h1 class="text-2xl font-bold mb-1">${title}</h1>
          <p class="text-lg">${author}</p>
        </div>
    `;
    
    // Add sections
    sections.forEach(section => {
      html += `
        <div class="mb-4">
          <h2 class="text-xl font-bold border-b border-gray-300 pb-1 mb-2">${section.title}</h2>
          <div class="pl-4">
            ${formatSectionContent(section.content)}
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    
    return html;
  };

  // Format section content to better approximate LaTeX rendering
  const formatSectionContent = (content: string) => {
    // Replace \item with list items
    let formatted = content.replace(/\\item\s+(.*?)(?=\\item|$)/gs, '<li>$1</li>');
    
    // Wrap lists
    if (formatted.includes('<li>')) {
      formatted = `<ul class="list-disc pl-5 space-y-1">${formatted}</ul>`;
    }
    
    // Replace \textbf with bold text
    formatted = formatted.replace(/\\textbf\{(.*?)\}/g, '<strong>$1</strong>');
    
    // Replace \textit with italic text
    formatted = formatted.replace(/\\textit\{(.*?)\}/g, '<em>$1</em>');
    
    // Replace \\ with line breaks
    formatted = formatted.replace(/\\\\/g, '<br>');
    
    // Replace environments
    formatted = formatted.replace(/\\begin\{(.*?)\}([\s\S]*?)\\end\{\1\}/g, (match, env, content) => {
      if (env === 'itemize') {
        return `<ul class="list-disc pl-5 space-y-1">${content.replace(/\\item\s+(.*?)(?=\\item|$)/gs, '<li>$1</li>')}</ul>`;
      }
      if (env === 'enumerate') {
        return `<ol class="list-decimal pl-5 space-y-1">${content.replace(/\\item\s+(.*?)(?=\\item|$)/gs, '<li>$1</li>')}</ol>`;
      }
      return content;
    });
    
    return formatted;
  };

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
        ) : (
          <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
        )}
      </CardContent>
    </Card>
  );
};

export default ResumePreview;
