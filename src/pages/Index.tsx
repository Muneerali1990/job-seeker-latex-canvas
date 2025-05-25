import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
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
    education: [{ institute: "", degree: "", duration: "", gpa: "", coursework: "" }],
    skills: { languages: "", frameworks: "", databases: "", concepts: "" },
    projects: [{ name: "", bullets: "" }],
    experience: [{ title: "", company: "", location: "", duration: "", bullets: "" }],
    certifications: [""],
    strengths: [""],
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes for all fields
  const handleUserDataChange = (e, index = null, field = null, subfield = null) => {
    const { name, value } = e.target;
    if (index !== null && field) {
      if (subfield) {
        // Handle skills object
        setUserData({
          ...userData,
          [field]: { ...userData[field], [subfield]: value },
        });
      } else if (field === "certifications" || field === "strengths") {
        // Handle certifications and strengths arrays
        const updatedArray = [...userData[field]];
        updatedArray[index] = value;
        setUserData({ ...userData, [field]: updatedArray });
      } else {
        // Handle education, projects, experience arrays
        const updatedArray = [...userData[field]];
        updatedArray[index][name] = value;
        setUserData({ ...userData, [field]: updatedArray });
      }
    } else {
      // Handle top-level fields (name, title, etc.)
      setUserData({ ...userData, [name]: value });
    }
  };

  // Add new entry for array fields
  const addEntry = (field) => {
    if (field === "education") {
      setUserData({
        ...userData,
        education: [...userData.education, { institute: "", degree: "", duration: "", gpa: "", coursework: "" }],
      });
    } else if (field === "projects") {
      setUserData({
        ...userData,
        projects: [...userData.projects, { name: "", bullets: "" }],
      });
    } else if (field === "experience") {
      setUserData({
        ...userData,
        experience: [...userData.experience, { title: "", company: "", location: "", duration: "", bullets: "" }],
      });
    } else if (field === "certifications" || field === "strengths") {
      setUserData({
        ...userData,
        [field]: [...userData[field], ""],
      });
    }
  };

  // Remove entry from array fields
  const removeEntry = (field, index) => {
    if (userData[field].length > 1) {
      setUserData({
        ...userData,
        [field]: userData[field].filter((_, i) => i !== index),
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Parse inputs into structured JSON data
    const parsedUserData = {
      name: userData.name,
      title: userData.title,
      email: userData.email,
      phone: userData.phone,
      location: userData.location,
      github: userData.github,
      linkedin: userData.linkedin,
      education: userData.education.map((edu) => ({
        institute: edu.institute,
        degree: edu.degree,
        duration: edu.duration,
        gpa: edu.gpa,
        coursework: edu.coursework ? edu.coursework.split(",").map((item) => item.trim()) : [],
      })),
      skills: {
        languages: userData.skills.languages ? userData.skills.languages.split(",").map((item) => item.trim()) : [],
        frameworks: userData.skills.frameworks ? userData.skills.frameworks.split(",").map((item) => item.trim()) : [],
        databases: userData.skills.databases ? userData.skills.databases.split(",").map((item) => item.trim()) : [],
        concepts: userData.skills.concepts ? userData.skills.concepts.split(",").map((item) => item.trim()) : [],
      },
      projects: userData.projects.map((proj) => ({
        name: proj.name,
        bullets: proj.bullets ? proj.bullets.split("\n").map((item) => item.trim()) : [],
      })),
      experience: userData.experience.map((exp) => ({
        title: exp.title,
        company: exp.company,
        location: exp.location,
        duration: exp.duration,
        bullets: exp.bullets ? exp.bullets.split("\n").map((item) => item.trim()) : [],
      })),
      certifications: userData.certifications.filter((cert) => cert.trim()),
      strengths: userData.strengths.filter((strength) => strength.trim()),
    };

    setTimeout(() => {
      setIsLoading(false);
      navigate("/editor", { state: { jobDescription, userData: parsedUserData } });
    }, 800);
  };

  // Form validation
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
            {/* Basic Information */}
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
                <Label htmlFor=".linkedin">LinkedIn</Label>
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

            {/* Education */}
            <div>
              <Label>Education</Label>
              {userData.education.map((edu, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4 relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`institute-${index}`}>Institute</Label>
                      <Input
                        id={`institute-${index}`}
                        name="institute"
                        value={edu.institute}
                        onChange={(e) => handleUserDataChange(e, index, "education")}
                        placeholder="Sample University"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`degree-${index}`}>Degree</Label>
                      <Input
                        id={`degree-${index}`}
                        name="degree"
                        value={edu.degree}
                        onChange={(e) => handleUserDataChange(e, index, "education")}
                        placeholder="Bachelor of Science"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`duration-${index}`}>Duration</Label>
                      <Input
                        id={`duration-${index}`}
                        name="duration"
                        value={edu.duration}
                        onChange={(e) => handleUserDataChange(e, index, "education")}
                        placeholder="2020 - 2024"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`gpa-${index}`}>GPA</Label>
                      <Input
                        id={`gpa-${index}`}
                        name="gpa"
                        value={edu.gpa}
                        onChange={(e) => handleUserDataChange(e, index, "education")}
                        placeholder="3.5/4.0"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor={`coursework-${index}`}>Coursework (comma-separated)</Label>
                      <Input
                        id={`coursework-${index}`}
                        name="coursework"
                        value={edu.coursework}
                        onChange={(e) => handleUserDataChange(e, index, "education")}
                        placeholder="Computer Science, Algorithms"
                      />
                    </div>
                  </div>
                  {userData.education.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => removeEntry("education", index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => addEntry("education")}>
                <Plus className="w-4 h-4 mr-2" /> Add Education
              </Button>
            </div>

            {/* Skills */}
            <div>
              <Label>Skills</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg">
                <div>
                  <Label htmlFor="languages">Languages (comma-separated)</Label>
                  <Input
                    id="languages"
                    name="languages"
                    value={userData.skills.languages}
                    onChange={(e) => handleUserDataChange(e, null, "skills", "languages")}
                    placeholder="Python, JavaScript"
                  />
                </div>
                <div>
                  <Label htmlFor="frameworks">Frameworks (comma-separated)</Label>
                  <Input
                    id="frameworks"
                    name="frameworks"
                    value={userData.skills.frameworks}
                    onChange={(e) => handleUserDataChange(e, null, "skills", "frameworks")}
                    placeholder="Flask, React"
                  />
                </div>
                <div>
                  <Label htmlFor="databases">Databases (comma-separated)</Label>
                  <Input
                    id="databases"
                    name="databases"
                    value={userData.skills.databases}
                    onChange={(e) => handleUserDataChange(e, null, "skills", "databases")}
                    placeholder="MySQL, MongoDB"
                  />
                </div>
                <div>
                  <Label htmlFor="concepts">Concepts (comma-separated)</Label>
                  <Input
                    id="concepts"
                    name="concepts"
                    value={userData.skills.concepts}
                    onChange={(e) => handleUserDataChange(e, null, "skills", "concepts")}
                    placeholder="REST APIs, Microservices"
                  />
                </div>
              </div>
            </div>

            {/* Projects */}
            <div>
              <Label>Projects</Label>
              {userData.projects.map((proj, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4 relative">
                  <div>
                    <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                    <Input
                      id={`project-name-${index}`}
                      name="name"
                      value={proj.name}
                      onChange={(e) => handleUserDataChange(e, index, "projects")}
                      placeholder="Sample Project"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`project-bullets-${index}`}>Description (one per line)</Label>
                    <Textarea
                      id={`project-bullets-${index}`}
                      name="bullets"
                      value={proj.bullets}
                      onChange={(e) => handleUserDataChange(e, index, "projects")}
                      placeholder="Developed a sample application."
                      className="min-h-[100px]"
                    />
                  </div>
                  {userData.projects.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => removeEntry("projects", index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => addEntry("projects")}>
                <Plus className="w-4 h-4 mr-2" /> Add Project
              </Button>
            </div>

            {/* Experience */}
            <div>
              <Label>Experience</Label>
              {userData.experience.map((exp, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4 relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`exp-title-${index}`}>Title</Label>
                      <Input
                        id={`exp-title-${index}`}
                        name="title"
                        value={exp.title}
                        onChange={(e) => handleUserDataChange(e, index, "experience")}
                        placeholder="Intern"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`exp-company-${index}`}>Company</Label>
                      <Input
                        id={`exp-company-${index}`}
                        name="company"
                        value={exp.company}
                        onChange={(e) => handleUserDataChange(e, index, "experience")}
                        placeholder="Sample Corp"
                      />
                    </div>
好好
                    <div>
                      <Label htmlFor={`exp-location-${index}`}>Location</Label>
                      <Input
                        id={`exp-location-${index}`}
                        name="location"
                        value={exp.location}
                        onChange={(e) => handleUserDataChange(e, index, "experience")}
                        placeholder="Remote"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`exp-duration-${index}`}>Duration</Label>
                      <Input
                        id={`exp-duration-${index}`}
                        name="duration"
                        value={exp.duration}
                        onChange={(e) => handleUserDataChange(e, index, "experience")}
                        placeholder="2023 - 2024"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor={`exp-bullets-${index}`}>Description (one per line)</Label>
                      <Textarea
                        id={`exp-bullets-${index}`}
                        name="bullets"
                        value={exp.bullets}
                        onChange={(e) => handleUserDataChange(e, index, "experience")}
                        placeholder="Contributed to development."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                  {userData.experience.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => removeEntry("experience", index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => addEntry("experience")}>
                <Plus className="w-4 h-4 mr-2" /> Add Experience
              </Button>
            </div>

            {/* Certifications */}
            <div>
              <Label>Certifications</Label>
              {userData.certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2 mb-2 relative">
                  <Input
                    id={`certification-${index}`}
                    value={cert}
                    onChange={(e) => handleUserDataChange(e, index, "certifications")}
                    placeholder="Python Certification - Udemy"
                  />
                  {userData.certifications.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeEntry("certifications", index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => addEntry("certifications")}>
                <Plus className="w-4 h-4 mr-2" /> Add Certification
              </Button>
            </div>

            {/* Strengths */}
            <div>
              <Label>Strengths</Label>
              {userData.strengths.map((strength, index) => (
                <div key={index} className="flex items-center gap-2 mb-2 relative">
                  <Input
                    id={`strength-${index}`}
                    value={strength}
                    onChange={(e) => handleUserDataChange(e, index, "strengths")}
                    placeholder="Problem-solving"
                  />
                  {userData.strengths.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeEntry("strengths", index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => addEntry("strengths")}>
                <Plus className="w-4 h-4 mr-2" /> Add Strength
              </Button>
            </div>

            {/* Job Description */}
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

            {/* Submit Button */}
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
            <p>Our AI will analyze the job description and generate an ATS-optimized resume for you</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;