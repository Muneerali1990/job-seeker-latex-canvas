'use client';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import ResumePreview from '@/components/ResumePreview';
import { ArrowLeft, Download, RefreshCw } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import axios from 'axios';

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

const ResumeViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { jobDescription, userData } = (location.state as LocationState) || { jobDescription: '', userData: null };
  const [htmlContent, setHtmlContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  useEffect(() => {
    if (!jobDescription || !userData) {
      navigate('/');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Missing job description or user data. Redirecting to home.',
      });
      return;
    }

    const generateInitialResume = async () => {
      setIsGenerating(true);
      try {
        const response = await axios.post('http://localhost:3001/api/generate-resume', {
          userData,
          jobDescription,
        });
        setHtmlContent(response.data.htmlCode);
        toast({
          title: 'Resume Generated',
          description: 'Your ATS-optimized resume has been created successfully.',
        });
      } catch (error: any) {
        console.error('Failed to generate resume:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.response?.data?.error || 'Failed to generate resume. Please try again.',
        });
      } finally {
        setIsGenerating(false);
      }
    };

    generateInitialResume();
  }, [jobDescription, userData, navigate]);

  const handleRegenerateResume = async () => {
    if (!jobDescription || !userData) return;

    setIsGenerating(true);
    try {
      const response = await axios.post('http://localhost:3001/api/generate-resume', {
        userData,
        jobDescription,
      });
      setHtmlContent(response.data.htmlCode);
      toast({
        title: 'Resume Regenerated',
        description: 'Your ATS-optimized resume has been updated successfully.',
      });
    } catch (error: any) {
      console.error('Failed to regenerate resume:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.response?.data?.error || 'Failed to regenerate resume. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!htmlContent) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No resume content to convert to PDF.',
      });
      return;
    }

    setIsExportingPDF(true);
    try {
      const previewElement = document.getElementById('resume-preview');
      if (!previewElement) {
        throw new Error('Preview element not found.');
      }

      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      await html2pdf().from(previewElement).set(opt).save();
      toast({
        title: 'PDF Downloaded',
        description: 'Your resume has been downloaded as a PDF.',
      });
    } catch (error: any) {
      console.error('Failed to generate PDF:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to generate PDF. Please try again.',
      });
    } finally {
      setIsExportingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-3 max-w-7xl flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">ATS Resume</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-gray-300 hover:bg-gray-50 transition-colors"
              onClick={handleRegenerateResume}
              disabled={isGenerating}
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Regenerate</span>
            </Button>
            <Button
              variant="default"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors"
              onClick={handleDownloadPDF}
              disabled={isGenerating || !htmlContent || isExportingPDF}
            >
              <Download className="w-4 h-4" />
              <span>{isExportingPDF ? 'Exporting...' : 'Download PDF'}</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-7xl h-[calc(100vh-64px)] overflow-hidden">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium text-gray-700">Generating your ATS-optimized resume...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
          </div>
        ) : (
          <div className="flex w-full h-full">
            <div className="w-full h-full bg-gray-100 flex flex-col">
              <div className="flex-1 overflow-auto p-4 bg-gray-100 flex justify-center items-start">
                <div
                  id="resume-preview"
                  className="bg-white shadow-lg rounded-lg w-full max-w-[210mm] min-h-[297mm] p-6"
                >
                  <ResumePreview htmlContent={htmlContent} isCompiling={false} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResumeViewer;