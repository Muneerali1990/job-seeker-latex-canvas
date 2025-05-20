
/**
 * Resume generator that produces LaTeX code based on job descriptions
 */

// Sample LaTeX templates
const resumeTemplates = {
  basic: `\\documentclass[11pt,a4paper]{article}
\\usepackage[left=0.75in,top=0.6in,right=0.75in,bottom=0.6in]{geometry}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage[dvipsnames]{xcolor}

% Define colors
\\definecolor{primary}{RGB}{59, 130, 246}
\\definecolor{darkgray}{RGB}{107, 114, 128}

% Custom section formatting
\\titleformat{\\section}{\\large\\bfseries}{}{0em}{\\color{primary}}[\\titlerule]
\\titlespacing*{\\section}{0pt}{12pt}{6pt}

% Remove page numbers
\\pagenumbering{gobble}

\\begin{document}

\\title{\\textbf{FULL_NAME}}
\\author{\\href{mailto:EMAIL}{EMAIL} $\\cdot$ PHONE_NUMBER $\\cdot$ LOCATION $\\cdot$ \\href{https://linkedin.com/in/LINKEDIN_ID}{LinkedIn}}
\\date{}
\\maketitle

\\section{Summary}
SUMMARY_TEXT

\\section{Experience}
\\begin{itemize}[leftmargin=*]
  \\item \\textbf{COMPANY_NAME}, \\textit{JOB_TITLE} \\hfill \\textit{START_DATE - END_DATE}
  \\begin{itemize}
    \\item ACHIEVEMENT_1
    \\item ACHIEVEMENT_2
    \\item ACHIEVEMENT_3
  \\end{itemize}
\\end{itemize}

\\section{Skills}
\\begin{itemize}[leftmargin=*]
  \\item \\textbf{Technical}: SKILLS_LIST
  \\item \\textbf{Soft Skills}: SOFT_SKILLS_LIST
\\end{itemize}

\\section{Education}
\\begin{itemize}[leftmargin=*]
  \\item \\textbf{UNIVERSITY_NAME}, \\textit{DEGREE_NAME} \\hfill \\textit{GRADUATION_YEAR}
  \\begin{itemize}
    \\item EDUCATION_DETAIL_1
    \\item EDUCATION_DETAIL_2
  \\end{itemize}
\\end{itemize}

\\end{document}`
};

// Sample placeholder data
const placeholderData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "(555) 123-4567",
  location: "San Francisco, CA",
  linkedin: "alexjohnson",
  website: "alexjohnson.dev"
};

// Extract keywords from job description
const extractKeywords = (jobDescription: string) => {
  // In a real implementation, this would use NLP to extract keywords
  // For now, we'll use a simple approach
  
  // Example skills to look for in the job description
  const commonSkills = [
    "JavaScript", "React", "TypeScript", "Node.js", "Python",
    "SQL", "NoSQL", "MongoDB", "PostgreSQL", "AWS",
    "Docker", "Kubernetes", "CI/CD", "Git", "DevOps",
    "Machine Learning", "Data Analysis", "UI/UX", "Agile", "Scrum"
  ];
  
  // Check which skills are mentioned in the job description
  const mentionedSkills = commonSkills.filter(skill => 
    jobDescription.toLowerCase().includes(skill.toLowerCase())
  );
  
  // Add some generic skills if we didn't find enough
  if (mentionedSkills.length < 5) {
    const genericSkills = ["JavaScript", "React", "TypeScript", "Node.js", "Git"];
    mentionedSkills.push(...genericSkills.filter(s => !mentionedSkills.includes(s)));
  }
  
  return {
    skills: mentionedSkills.slice(0, 8),
    softSkills: ["Communication", "Problem Solving", "Teamwork", "Leadership", "Time Management"]
  };
};

// Generate a summary based on job description
const generateSummary = (jobDescription: string, keywords: any) => {
  // In a real implementation, this would use an LLM to generate a summary
  // For now, we'll create a template-based summary
  
  let jobTitle = "Software Engineer";
  const titles = ["Software Engineer", "Frontend Developer", "Full Stack Developer", "UX Designer", "Product Manager", "Data Scientist"];
  
  for (const title of titles) {
    if (jobDescription.includes(title)) {
      jobTitle = title;
      break;
    }
  }
  
  const yearsOfExperience = Math.floor(Math.random() * 5) + 3;
  
  return `Experienced ${jobTitle} with ${yearsOfExperience}+ years of expertise in ${keywords.skills.slice(0, 3).join(", ")}. Proven track record of delivering high-quality solutions in fast-paced environments. Strong skills in ${keywords.skills.slice(3, 5).join(" and ")} with a passion for creating efficient and scalable applications.`;
};

// Generate experience based on job description and keywords
const generateExperience = (jobDescription: string, keywords: any) => {
  // In a real implementation, this would use an LLM to generate experience
  // For now, we'll create template-based experiences
  
  const experiences = [
    {
      company: "TechCorp Industries",
      title: "Senior Software Engineer",
      startDate: "Jan 2020",
      endDate: "Present",
      achievements: [
        `Developed and maintained ${keywords.skills[0]} applications that improved user engagement by 45%`,
        `Led a team of 5 engineers to implement ${keywords.skills[1]} solutions for critical business processes`,
        `Optimized database queries using ${keywords.skills.find(s => s.includes("SQL")) || "SQL"} resulting in 60% faster application performance`
      ]
    },
    {
      company: "InnovateSoft",
      title: "Software Developer",
      startDate: "Mar 2017",
      endDate: "Dec 2019",
      achievements: [
        `Built responsive web interfaces using ${keywords.skills.find(s => s.includes("React") || s.includes("JavaScript")) || "modern frameworks"}`,
        `Implemented automated testing that reduced bugs by 35%`,
        `Collaborated with product managers to refine requirements and deliver features ahead of schedule`
      ]
    }
  ];
  
  return experiences;
};

// Generate education section
const generateEducation = () => {
  return {
    university: "University of Technology",
    degree: "Bachelor of Science in Computer Science",
    graduationYear: "2017",
    details: [
      "Graduated with honors, 3.8 GPA",
      "Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems"
    ]
  };
};

// Main function to generate a resume based on a job description
export const generateResume = async (jobDescription: string): Promise<string> => {
  // Extract keywords from job description
  const keywords = extractKeywords(jobDescription);
  
  // Generate summary
  const summary = generateSummary(jobDescription, keywords);
  
  // Generate experience
  const experiences = generateExperience(jobDescription, keywords);
  
  // Generate education
  const education = generateEducation();
  
  // Get the template and replace placeholders
  let resumeLatex = resumeTemplates.basic;
  
  // Replace personal information
  resumeLatex = resumeLatex
    .replace("FULL_NAME", placeholderData.name)
    .replace("EMAIL", placeholderData.email)
    .replace("PHONE_NUMBER", placeholderData.phone)
    .replace("LOCATION", placeholderData.location)
    .replace("LINKEDIN_ID", placeholderData.linkedin);
  
  // Replace summary
  resumeLatex = resumeLatex.replace("SUMMARY_TEXT", summary);
  
  // Replace experience section
  let experienceSection = "";
  experiences.forEach(exp => {
    experienceSection += `  \\item \\textbf{${exp.company}}, \\textit{${exp.title}} \\hfill \\textit{${exp.startDate} - ${exp.endDate}}\n`;
    experienceSection += "  \\begin{itemize}\n";
    exp.achievements.forEach(achievement => {
      experienceSection += `    \\item ${achievement}\n`;
    });
    experienceSection += "  \\end{itemize}\n";
  });
  
  resumeLatex = resumeLatex.replace("\\begin{itemize}[leftmargin=*]\n  \\item \\textbf{COMPANY_NAME}, \\textit{JOB_TITLE} \\hfill \\textit{START_DATE - END_DATE}\n  \\begin{itemize}\n    \\item ACHIEVEMENT_1\n    \\item ACHIEVEMENT_2\n    \\item ACHIEVEMENT_3\n  \\end{itemize}\n\\end{itemize}", 
    `\\begin{itemize}[leftmargin=*]\n${experienceSection}\\end{itemize}`);
  
  // Replace skills
  resumeLatex = resumeLatex
    .replace("SKILLS_LIST", keywords.skills.join(", "))
    .replace("SOFT_SKILLS_LIST", keywords.softSkills.join(", "));
  
  // Replace education
  resumeLatex = resumeLatex
    .replace("UNIVERSITY_NAME", education.university)
    .replace("DEGREE_NAME", education.degree)
    .replace("GRADUATION_YEAR", education.graduationYear)
    .replace("EDUCATION_DETAIL_1", education.details[0])
    .replace("EDUCATION_DETAIL_2", education.details[1]);
  
  return resumeLatex;
};
