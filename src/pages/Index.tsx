import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import LandingHero from "@/components/LandingHero";

const Index = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    education: "",
    skills: "",
    projects: "",
    experience: "",
    certifications: "",
    strengths: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleUserDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Parse text inputs into structured data
    const parsedUserData = {
      name: userData.name,
      title: userData.title,
      email: userData.email,
      phone: userData.phone,
      location: userData.location,
      github: userData.github,
      linkedin: userData.linkedin,
      education: userData.education
        ? JSON.parse(userData.education)
        : [
            {
              institute: "Sample University",
              degree: "Bachelor of Science",
              duration: "2020 - 2024",
              gpa: "3.5/4.0",
              coursework: ["Computer Science"],
            },
          ],
      skills: userData.skills
        ? JSON.parse(userData.skills)
        : {
            languages: ["Python"],
            frameworks: ["Flask"],
            databases: ["MySQL"],
            concepts: ["REST APIs"],
          },
      projects: userData.projects
        ? JSON.parse(userData.projects)
        : [
            {
              name: "Sample Project",
              bullets: ["Developed a sample application."],
            },
          ],
      experience: userData.experience
        ? JSON.parse(userData.experience)
        : [
            {
              title: "Intern",
              company: "Sample Corp",
              location: "Remote",
              duration: "2023 - 2024",
              bullets: ["Contributed to development."],
            },
          ],
      certifications: userData.certifications
        ? JSON.parse(userData.certifications)
        : ["Sample Certification"],
      strengths: userData.strengths
        ? JSON.parse(userData.strengths)
        : ["Problem-solving"],
    };

    setTimeout(() => {
      setIsLoading(false);
      navigate("/editor", { state: { jobDescription, userData: parsedUserData } });
    }, 800);
  };

  const isFormValid =
    jobDescription.trim() &&
    userData.name.trim() &&
    userData.title.trim() &&
    userData.email.trim() &&
    userData.phone.trim() &&
    userData.location.trim() &&
    userData.github.trim() &&
    userData.linkedin.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-ats-lightgray">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <LandingHero />

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create Your ATS-Optimized Resume
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleUserDataChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="title">Target Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={userData.title}
                  onChange={handleUserDataChange}
                  placeholder="Python Developer"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleUserDataChange}
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleUserDataChange}
                  placeholder="+1-123-456-7890"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={userData.location}
                  onChange={handleUserDataChange}
                  placeholder="New York, NY (Remote Ready)"
                  required
                />
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  name="github"
                  value={userData.github}
                  onChange={handleUserDataChange}
                  placeholder="https://github.com/johndoe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={userData.linkedin}
                  onChange={handleUserDataChange}
                  placeholder="https://linkedin.com/in/johndoe"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="education">Education (JSON format)</Label>
              <Textarea
                id="education"
                name="education"
                value={userData.education}
                onChange={handleUserDataChange}
                placeholder='Example: [{"institute":"Sample University","degree":"Bachelor of Science","duration":"2020-2024","gpa":"3.5/4.0","coursework":["Computer Science"]}]'
                className="min-h-[100px] text-base focus:ring-ats-blue"
              />
            </div>
            <div>
              <Label htmlFor="skills">Skills (JSON format)</Label>
              <Textarea
                id="skills"
                name="skills"
                value={userData.skills}
                onChange={handleUserDataChange}
                placeholder='Example: {"languages":["Python","JavaScript"],"frameworks":["Flask","React"],"databases":["MySQL"],"concepts":["REST APIs"]}'
                className="min-h-[100px] text-base focus:ring-ats-blue"
              />
            </div>
            <div>
              <Label htmlFor="projects">Projects (JSON format)</Label>
              <Textarea
                id="projects"
                name="projects"
                value={userData.projects}
                onChange={handleUserDataChange}
                placeholder='Example: [{"name":"Sample Project","bullets":["Developed a sample application."]}]'
                className="min-h-[100px] text-base focus:ring-ats-blue"
              />
            </div>
            <div>
              <Label htmlFor="experience">Experience (JSON format)</Label>
              <Textarea
                id="experience"
                name="experience"
                value={userData.experience}
                onChange={handleUserDataChange}
                placeholder='Example: [{"title":"Intern","company":"Sample Corp","location":"Remote","duration":"2023-2024","bullets":["Contributed to development."]}]'
                className="min-h-[100px] text-base focus:ring-ats-blue"
              />
            </div>
            <div>
              <Label htmlFor="certifications">Certifications (JSON format)</Label>
              <Textarea
                id="certifications"
                name="certifications"
                value={userData.certifications}
                onChange={handleUserDataChange}
                placeholder='Example: ["Python Certification - Udemy"]'
                className="min-h-[100px] text-base focus:ring-ats-blue"
              />
            </div>
            <div>
              <Label htmlFor="strengths">Strengths (JSON format)</Label>
              <Textarea
                id="strengths"
                name="strengths"
                value={userData.strengths}
                onChange={handleUserDataChange}
                placeholder='Example: ["Problem-solving","Teamwork"]'
                className="min-h-[100px] text-base focus:ring-ats-blue"
              />
            </div>
            <div>
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here... Example: Job Title: Python Developer\nCompany: Tech Solutions Inc.\nDescription: Seeking a Python Developer with 2+ years of experience in Flask and Django, building RESTful APIs..."
                className="min-h-[200px] text-base focus:ring-ats-blue"
                required
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="bg-ats-blue hover:bg-ats-darkblue text-white px-8 py-6 rounded-lg text-lg font-medium transition-all flex items-center gap-2 group"
                disabled={!isFormValid || isLoading}
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