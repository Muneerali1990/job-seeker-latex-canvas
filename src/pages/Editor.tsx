import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import EditorPane from "@/components/EditorPane";
import ResumePreview from "@/components/ResumePreview";
import { ArrowLeft, Download, RefreshCw } from "lucide-react";
import { saveAs } from "file-saver";
import axios from "axios";
import PptxGenJS from "pptxgenjs";
import debounce from "lodash.debounce";

interface LocationState {
  jobDescription: string;
  userData: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
  };
}

const Editor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { jobDescription, userData } = (location.state as LocationState) || { jobDescription: "", userData: null };
  const [latexCode, setLatexCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);

  useEffect(() => {
    if (!jobDescription || !userData) {
      navigate("/");
      return;
    }

    const generateInitialResume = async () => {
      setIsGenerating(true);
      try {
        const response = await axios.post("http://localhost:3001/api/generate-resume", {
          userData,
          jobDescription,
        });
        setLatexCode(response.data.latexCode);
        toast({
          title: "Resume Generated",
          description: "Your ATS-optimized resume has been created",
        });
      } catch (error: any) {
        console.error("Failed to generate resume:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response?.data?.error || "Failed to generate resume. Please try again.",
        });
      } finally {
        setIsGenerating(false);
      }
    };

    generateInitialResume();
  }, [jobDescription, userData, navigate]);

  // Debounced function to update preview
  const updatePreview = useCallback(
    debounce(async (code: string) => {
      if (!code) {
        setPdfUrl(null);
        setPreviewError(null);
        return;
      }
      setIsCompiling(true);
      try {
        const response = await axios.post(
          "http://localhost:3001/api/compile-latex",
          { latexCode: code },
          { responseType: "blob", headers: { "Content-Type": "application/json" } }
        );
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const newPdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return newPdfUrl;
        });
        setPreviewError(null);
      } catch (error: any) {
        console.error("Failed to update preview:", error);
        const errorMessage = error.response?.data?.error || "Failed to compile LaTeX. Check for syntax errors or missing packages.";
        setPreviewError(errorMessage);
        setPdfUrl(null);
      } finally {
        setIsCompiling(false);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    updatePreview(latexCode);
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [latexCode, updatePreview, pdfUrl]);

  const handleCodeChange = (newCode: string) => {
    setLatexCode(newCode);
  };

  const handleRegenerateResume = async () => {
    if (!jobDescription || !userData) return;

    setIsGenerating(true);
    try {
      const response = await axios.post("http://localhost:3001/api/generate-resume", {
        userData,
        jobDescription,
      });
      setLatexCode(response.data.latexCode);
      toast({
        title: "Resume Regenerated",
        description: "Your ATS-optimized resume has been updated",
      });
    } catch (error: any) {
      console.error("Failed to regenerate resume:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.error || "Failed to regenerate resume. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadLatex = () => {
    const element = document.createElement("a");
    const file = new Blob([latexCode], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "resume.tex";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "LaTeX Downloaded",
      description: "Your resume LaTeX file has been downloaded.",
    });
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/compile-latex",
        { latexCode },
        { responseType: "blob" }
      );
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      saveAs(pdfBlob, "resume.pdf");
      toast({
        title: "PDF Downloaded",
        description: "Your resume has been downloaded as a PDF.",
      });
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
      });
    }
  };

  const handleDownloadPPT = async () => {
    try {
      const pptx = new PptxGenJS();
      const slide = pptx.addSlide();
      const content = parseLatexToContent(latexCode);

      slide.addText(content.title, { x: 0.5, y: 0.5, fontSize: 24, color: "363636" });
      slide.addText(content.sections.join("\n"), {
        x: 0.5,
        y: 1.5,
        fontSize: 18,
        color: "363636",
      });

      pptx.writeFile({ fileName: "resume" });
      toast({
        title: "PPT Downloaded",
        description: "Your resume has been downloaded as a PPT.",
      });
    } catch (error) {
      console.error("Failed to generate PPT:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate PPT. Please try again.",
      });
    }
  };

  const parseLatexToContent = (latex: string) => {
    const sections: string[] = [];
    const titleMatch = latex.match(/\\name\{([^}]+)\}\{([^}]+)\}/) || ["", "My", "Resume"];
    const sectionMatches = latex.matchAll(/\\section\{([^}]+)\}([\s\S]*?)(?=\\section|\$)/g);

    for (const match of sectionMatches) {
      const sectionTitle = match[1];
      const sectionContent = match[2]
        .split("\n")
        .filter((line) => line.includes("\\cvitem") || line.includes("\\item"))
        .map((line) => {
          const contentMatch = line.match(/\{([^}]+)\}/g);
          return contentMatch ? contentMatch.map((c) => c.replace(/{|}/g, "")).join(" - ") : "";
        })
        .filter(Boolean);
      sections.push(`${sectionTitle}:\n${sectionContent.join("\n")}`);
    }

    return {
      title: `${titleMatch[1]} ${titleMatch[2]}`,
      sections,
    };
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-ats-blue"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold text-gray-800">ATS Resume Editor</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleRegenerateResume}
              disabled={isGenerating || isCompiling}
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
              <span>Regenerate</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleDownloadLatex}
              disabled={isGenerating || isCompiling || !latexCode}
            >
              <Download className="w-4 h-4" />
              <span>Download LaTeX</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleDownloadPDF}
              disabled={isGenerating || isCompiling || !latexCode}
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleDownloadPPT}
              disabled={isGenerating || isCompiling || !latexCode}
            >
              <Download className="w-4 h-4" />
              <span>Download PPT</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <div className="w-16 h-16 border-4 border-ats-blue border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl font-medium text-gray-700">Generating your ATS-optimized resume...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
          </div>
        ) : (
          <div className="lg:hidden mb-6">
            <Tabs defaultValue="editor">
              <TabsList className="w-full">
                <TabsTrigger value="editor" className="flex-1">LaTeX Editor</TabsTrigger>
                <TabsTrigger value="preview" className="flex-1">Resume Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="editor" className="h-[70vh]">
                <EditorPane code={latexCode} onChange={handleCodeChange} />
              </TabsContent>
              <TabsContent value="preview" className="h-[70vh]">
                <ResumePreview pdfUrl={pdfUrl} error={previewError} isCompiling={isCompiling} />
              </TabsContent>
            </Tabs>
          </div>
        )}

        {!isGenerating && (
          <div className="hidden lg:grid grid-cols-2 gap-6 h-[80vh]">
            <EditorPane code={latexCode} onChange={handleCodeChange} />
            <ResumePreview pdfUrl={pdfUrl} error={previewError} isCompiling={isCompiling} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;