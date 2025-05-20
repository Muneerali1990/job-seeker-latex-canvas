
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import LandingHero from "@/components/LandingHero";

const Index = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to editor page with job description
      navigate('/editor', { state: { jobDescription } });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-ats-lightgray">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <LandingHero />
        
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Enter the job description you're applying for
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here... The more details you provide, the better we can tailor your resume for ATS optimization."
              className="min-h-[200px] text-base focus:ring-ats-blue"
              required
            />
            
            <div className="flex justify-center">
              <Button 
                type="submit" 
                className="bg-ats-blue hover:bg-ats-darkblue text-white px-8 py-6 rounded-lg text-lg font-medium transition-all flex items-center gap-2 group"
                disabled={!jobDescription.trim() || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <>
                    <span>Create Resume</span> 
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>
          </form>
          
          <div className="mt-8 text-sm text-gray-500 text-center">
            <p>
              Our AI will analyze the job description and generate an ATS-optimized resume for you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
