
/**
 * Resume generator that produces LaTeX code based on job descriptions
 */

// The comprehensive LaTeX resume template
const resumeTemplate = `\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{multicol}
\\usepackage{graphicx}
\\setlength{\\multicolsep}{-3.0pt}
\\setlength{\\columnsep}{-1pt}

% Define colors
\\definecolor{cvblue}{HTML}{0E5484}
\\definecolor{black}{HTML}{130810}
\\definecolor{darkcolor}{HTML}{0F4539}
\\definecolor{cvgreen}{HTML}{3BD80D}
\\definecolor{taggreen}{HTML}{00E278}
\\definecolor{SlateGrey}{HTML}{2E2E2E}
\\definecolor{LightGrey}{HTML}{666666}
\\colorlet{name}{black}
\\colorlet{tagline}{darkcolor}
\\colorlet{heading}{darkcolor}
\\colorlet{headingrule}{cvblue}
\\colorlet{accent}{darkcolor}
\\colorlet{emphasis}{SlateGrey}
\\colorlet{body}{LightGrey}

\\addtolength{\\oddsidemargin}{-0.6in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.19in}
\\addtolength{\\topmargin}{-.7in}
\\addtolength{\\textheight}{1.4in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{\\large#1} & \\textbf{\\small #2} \\\\
      \\textit{\\large#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & \\textbf{\\small #2}\\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\newcommand\\sbullet[1][.5]{\\mathbin{\\vcenter{\\hbox{\\scalebox{#1}{$\\bullet$}}}}}

\\begin{document}

\\begin{center}
    {\\Huge \\scshape CANDIDATE_NAME} \\\\ \\vspace{1pt}
    CANDIDATE_LOCATION (Remote Ready) \\\\ \\vspace{1pt}
    \\small 
    \\href{tel:CANDIDATE_PHONE}{\\raisebox{-0.1\\height}\\faPhone\\ \\underline{CANDIDATE_PHONE}} ~
    \\href{mailto:CANDIDATE_EMAIL}{\\raisebox{-0.2\\height}\\faEnvelope\\ \\underline{CANDIDATE_EMAIL}} ~
    \\href{https://linkedin.com/in/LINKEDIN_ID}{\\raisebox{-0.2\\height}\\faLinkedinSquare\\ \\underline{linkedin.com/in/LINKEDIN_ID}} ~
    \\href{https://github.com/GITHUB_ID}{\\raisebox{-0.2\\height}\\faGithub\\ \\underline{github.com/GITHUB_ID}}
    \\vspace{-8pt}
\\end{center}

\\section{EDUCATION}
  \\resumeSubHeadingListStart
    
    \\resumeSubheading
      {UNIVERSITY_NAME}{EDUCATION_YEARS}
      {DEGREE_NAME - \\textbf{GPA}}{}
    
  \\resumeSubHeadingListEnd

\\section{COURSEWORK / SKILLS}
    \\begin{multicols}{4}
        \\begin{itemize}[itemsep=-2pt, parsep=5pt]
            COURSEWORK_ITEMS
        \\end{itemize}
    \\end{multicols}
    \\vspace*{2.0\\multicolsep}

\\section{PROJECTS}
    \\vspace{-5pt}
    \\resumeSubHeadingListStart
      
      \\resumeProjectHeading
        {\\href{} {\\textbf{\\large{\\underline{PROJECT_1_TITLE}}}}}{}
        \\resumeItemListStart
          PROJECT_1_ITEMS
        \\resumeItemListEnd
        \\vspace{-13pt}
      
      \\resumeProjectHeading
        {\\href{} {\\textbf{\\large{\\underline{PROJECT_2_TITLE}}}}}{}
        \\resumeItemListStart
          PROJECT_2_ITEMS
        \\resumeItemListEnd
        \\vspace{-13pt}
      
    \\resumeSubHeadingListEnd
\\vspace{-12pt}

\\section{EXPERIENCE}
  \\resumeSubHeadingListStart
    
    \\resumeSubheading
      {COMPANY_NAME}{WORK_DATES}
      {\\underline{JOB_TITLE}}{WORK_LOCATION}
      \\resumeItemListStart
        EXPERIENCE_ITEMS
      \\resumeItemListEnd
    
  \\resumeSubHeadingListEnd
\\vspace{-12pt}

\\section{TECHNICAL SKILLS}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{\\normalsize{Languages:}}{ \\normalsize{LANGUAGES}} \\\\
     \\textbf{\\normalsize{Frameworks:}}{ \\normalsize{FRAMEWORKS}} \\\\
     \\textbf{\\normalsize{Databases:}}{ \\normalsize{DATABASES}} \\\\
     \\textbf{\\normalsize{Concepts:}}{ \\normalsize{CONCEPTS}}
    }}
 \\end{itemize}
 \\vspace{-15pt}

\\section{CERTIFICATIONS}

\\sbullet[.75] \\hspace{0.2cm}{\\href{}{CERTIFICATION_1}} \\\\
\\sbullet[.75] \\hspace{0.2cm}{\\href{}{CERTIFICATION_2}} \\\\
\\sbullet[.75] \\hspace{0.2cm}{\\href{}{CERTIFICATION_3}}

\\end{document}`;

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

// Generate coursework items based on job description
const generateCourseworkItems = (jobDescription: string, keywords: any) => {
  const items = [];
  
  // Add programming languages coursework
  for (const skill of keywords.skills.slice(0, 6)) {
    items.push(`\\item ${skill} Programming`);
  }
  
  // Add some general CS coursework
  const commonCoursework = [
    "Data Structures & Algorithms",
    "Web Development",
    "Database Systems",
    "Computer Networks",
    "Software Engineering",
    "Object-Oriented Design"
  ];
  
  for (const course of commonCoursework.slice(0, 6 - items.length)) {
    items.push(`\\item ${course}`);
  }
  
  return items.join('\n');
};

// Generate project items
const generateProjectItems = (jobDescription: string, keywords: any, projectTitle: string) => {
  const items = [];
  const relevantSkills = keywords.skills.slice(0, 3);
  
  if (projectTitle.toLowerCase().includes("management")) {
    items.push(`\\resumeItem{\\normalsize{Designed and developed a CRUD web application using ${relevantSkills[0]} resulting in improved efficiency.}}`);
    items.push(`\\resumeItem{\\normalsize{Successfully implemented JWT-based authentication resulting in improved security.}}`);
    items.push(`\\resumeItem{\\normalsize{Designed responsive UI using ${relevantSkills.includes("React") ? "React" : "Bootstrap"} resulting in enhanced user experience.}}`);
  } else if (projectTitle.toLowerCase().includes("api")) {
    items.push(`\\resumeItem{\\normalsize{Built RESTful APIs for managing data using ${relevantSkills[0]}.}}`);
    items.push(`\\resumeItem{\\normalsize{Integrated third-party APIs using ${relevantSkills[0]} libraries.}}`);
    items.push(`\\resumeItem{\\normalsize{Documented all endpoints with Postman for improved collaboration and maintainability.}}`);
  } else {
    items.push(`\\resumeItem{\\normalsize{Developed ${projectTitle} using ${relevantSkills.join(", ")} to solve business challenges.}}`);
    items.push(`\\resumeItem{\\normalsize{Implemented automated testing resulting in 30% fewer bugs in production.}}`);
    items.push(`\\resumeItem{\\normalsize{Optimized performance by refactoring code, resulting in 50% faster load times.}}`);
  }
  
  return items.join('\n');
};

// Generate experience items
const generateExperienceItems = (jobDescription: string, keywords: any) => {
  const items = [
    `\\resumeItem{\\normalsize{Engineered applications using ${keywords.skills.slice(0, 2).join(" and ")}.}}`,
    `\\resumeItem{\\normalsize{Resolved 10+ bugs, improving code quality and application stability.}}`,
    `\\resumeItem{\\normalsize{Led team code reviews and contributed to feature development.}}`
  ];
  
  return items.join('\n');
};

// Main function to generate a resume based on a job description
export const generateResume = async (jobDescription: string): Promise<string> => {
  // Extract keywords from job description
  const keywords = extractKeywords(jobDescription);
  
  // Define candidate information (using placeholder data)
  const candidate = {
    name: "Alex Johnson",
    location: "San Francisco, CA",
    phone: "+1-555-123-4567",
    email: "alex.johnson@example.com",
    linkedin: "alexjohnson",
    github: "alexjohnson-dev"
  };
  
  // Define education information
  const education = {
    university: "University of Technology",
    years: "2019 -- 2023",
    degree: "Bachelor of Science in Computer Science",
    gpa: "3.8/4.0"
  };
  
  // Define projects
  const projects = {
    project1: {
      title: "Inventory Management System",
      items: generateProjectItems(jobDescription, keywords, "Inventory Management System")
    },
    project2: {
      title: "API Integration Platform",
      items: generateProjectItems(jobDescription, keywords, "API Integration Platform")
    }
  };
  
  // Define work experience
  const experience = {
    company: "Tech Innovations Inc.",
    dates: "Jun 2023 -- Present",
    title: "Software Developer",
    location: "Remote",
    items: generateExperienceItems(jobDescription, keywords)
  };
  
  // Define skills
  const skills = {
    languages: keywords.skills.filter(skill => 
      ["JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Ruby"].includes(skill)
    ).join(", ") + ", HTML5, CSS3",
    frameworks: "React, Node.js, Express, " + keywords.skills.filter(skill => 
      ["Angular", "Vue", "Django", "Flask", "Spring", "ASP.NET"].includes(skill)
    ).join(", ") + ", Git",
    databases: "MySQL, MongoDB, PostgreSQL",
    concepts: "REST APIs, GraphQL, Microservices, OOP, Data Structures, Algorithms"
  };
  
  // Define certifications
  const certifications = [
    `${keywords.skills[0]} Certification – Udemy, 2023`,
    `Advanced ${keywords.skills[1]} – Coursera, 2024`,
    `${keywords.skills[2]} Professional – Industry Certificate`
  ];
  
  // Generate coursework items
  const courseworkItems = generateCourseworkItems(jobDescription, keywords);
  
  // Replace template placeholders with actual content
  let resumeLatex = resumeTemplate
    // Replace personal information
    .replace("CANDIDATE_NAME", candidate.name)
    .replace("CANDIDATE_LOCATION", candidate.location)
    .replace("CANDIDATE_PHONE", candidate.phone)
    .replace("CANDIDATE_EMAIL", candidate.email)
    .replace("LINKEDIN_ID", candidate.linkedin)
    .replace("GITHUB_ID", candidate.github)
    
    // Replace education
    .replace("UNIVERSITY_NAME", education.university)
    .replace("EDUCATION_YEARS", education.years)
    .replace("DEGREE_NAME", education.degree)
    .replace("GPA", education.gpa)
    
    // Replace coursework
    .replace("COURSEWORK_ITEMS", courseworkItems)
    
    // Replace project 1
    .replace("PROJECT_1_TITLE", projects.project1.title)
    .replace("PROJECT_1_ITEMS", projects.project1.items)
    
    // Replace project 2
    .replace("PROJECT_2_TITLE", projects.project2.title)
    .replace("PROJECT_2_ITEMS", projects.project2.items)
    
    // Replace experience
    .replace("COMPANY_NAME", experience.company)
    .replace("WORK_DATES", experience.dates)
    .replace("JOB_TITLE", experience.title)
    .replace("WORK_LOCATION", experience.location)
    .replace("EXPERIENCE_ITEMS", experience.items)
    
    // Replace skills
    .replace("LANGUAGES", skills.languages)
    .replace("FRAMEWORKS", skills.frameworks)
    .replace("DATABASES", skills.databases)
    .replace("CONCEPTS", skills.concepts)
    
    // Replace certifications
    .replace("CERTIFICATION_1", certifications[0])
    .replace("CERTIFICATION_2", certifications[1])
    .replace("CERTIFICATION_3", certifications[2]);
  
  return resumeLatex;
};
