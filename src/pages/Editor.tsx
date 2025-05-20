
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import EditorPane from "@/components/EditorPane";
import ResumePreview from "@/components/ResumePreview";
import { ArrowLeft, Download, RefreshCw } from "lucide-react";
import { generateResume } from "@/lib/resumeGenerator";

interface LocationState {
  jobDescription: string;
}

const Editor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { jobDescription } = (location.state as LocationState) || { jobDescription: "" };
  const [latexCode, setLatexCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!jobDescription) {
      navigate("/");
      return;
    }

    const generateInitialResume = async () => {
      setIsGenerating(true);
      try {
        const generatedResume = await generateResume(jobDescription);
        setLatexCode(generatedResume);
        toast({
          title: "Resume Generated",
          description: "Your ATS-optimized resume has been created",
        });
      } catch (error) {
        console.error("Failed to generate resume:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to generate resume. Please try again.",
        });
      } finally {
        setIsGenerating(false);
      }
    };

    generateInitialResume();
  }, [jobDescription, navigate]);

  const handleCodeChange = (newCode: string) => {
    setLatexCode(newCode);
  };

  const handleRegenerateResume = async () => {
    if (!jobDescription) return;
    
    setIsGenerating(true);
    try {
      const generatedResume = await generateResume(jobDescription);
      setLatexCode(generatedResume);
      toast({
        title: "Resume Regenerated",
        description: "Your ATS-optimized resume has been updated",
      });
    } catch (error) {
      console.error("Failed to regenerate resume:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to regenerate resume. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([latexCode], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "resume.tex";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Resume Downloaded",
      description: "Your resume LaTeX file has been downloaded.",
    });
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
              disabled={isGenerating}
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Regenerate</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleDownload}
              disabled={isGenerating || !latexCode}
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
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
                <ResumePreview latexCode={latexCode} />
              </TabsContent>
            </Tabs>
          </div>
        )}

        {!isGenerating && (
          <div className="hidden lg:grid grid-cols-2 gap-6 h-[80vh]">
            <EditorPane code={latexCode} onChange={handleCodeChange} />
            <ResumePreview latexCode={latexCode} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
