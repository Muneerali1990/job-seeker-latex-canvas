interface SkillCategories {
  languages: string[];
  frameworks: string[];
  databases: string[];
  concepts: string[];
  tools: string[];
  [key: string]: string[]; // Index signature for dynamic access
}

interface EducationItem {
  institute?: string;
  duration?: string;
  degree?: string;
  gpa?: string;
  coursework?: string[];
}

interface Project {
  name?: string;
  techStack?: string;
  bullets?: string[];
}

interface Experience {
  company?: string;
  duration?: string;
  title?: string;
  location?: string;
  bullets?: string[];
}

interface UserData {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  education?: EducationItem[];
  skills?: Partial<SkillCategories>;
  projects?: Project[];
  experience?: Experience[];
  certifications?: string[];
  strengths?: string[];
}

export function createPerfectATSResumePrompt(userData: UserData, jobDescription: string): string {
  const {
    name = "Unknown Name",
    title = "Unknown Title",
    email = "N/A",
    phone = "N/A",
    location = "N/A",
    github = "N/A",
    linkedin = "N/A",
    education = [],
    skills = { languages: [], frameworks: [], databases: [], concepts: [], tools: [] },
    projects = [],
    experience = [],
    certifications = [],
    strengths = [],
  } = userData;

  // Enhanced sanitization with additional checks
  const sanitizeHTML = (text: string): string => {
    if (!text) return "N/A";
    return text.toString()
               .replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;")
               .replace(/"/g, "&quot;")
               .replace(/'/g, "&#039;")
               .replace(/\n/g, "<br>");
  };

  // Generate metrics-rich bullet points
  const processBullets = (bullets: string[] = []): string => {
    return bullets.map(bullet => {
      // Add metrics emphasis if detected
      const metricMatch = bullet.match(/(\d+%|\$\d+k?|\d+x|\d+\.\d+)/);
      if (metricMatch) {
        return `<li>${sanitizeHTML(bullet.replace(metricMatch[0], `<strong>${metricMatch[0]}</strong>`))}</li>`;
      }
      return `<li>${sanitizeHTML(bullet)}</li>`;
    }).join("\n");
  };

  // EDUCATION SECTION WITH IMPROVED FORMATTING
  const educationSection = education.length
    ? education
        .map(
          (edu) => `
          <div class="section-item">
            <div class="item-header">
              <span class="item-title">${sanitizeHTML(edu.degree || "N/A")}</span>
              <span class="item-date">${sanitizeHTML(edu.duration || "N/A")}</span>
            </div>
            <div class="item-subtitle">${sanitizeHTML(edu.institute || "N/A")}</div>
            ${edu.gpa ? `<div class="item-detail"><strong>GPA:</strong> ${sanitizeHTML(edu.gpa)}</div>` : ''}
            ${edu.coursework?.length ? `<div class="item-detail"><strong>Relevant Coursework:</strong> ${edu.coursework.map(sanitizeHTML).join(", ")}</div>` : ''}
          </div>`
        )
        .join("\n")
    : "<div class='empty-section'>No education information provided</div>";

  // SKILLS SECTION WITH CATEGORIZATION
  const skillsEntries = Object.entries(skills) as [string, string[]][];
  const skillsSection = skillsEntries.some(([_, values]) => values.length > 0)
    ? `
    <div class="skills-container">
      ${skillsEntries
        .filter(([_, values]) => values.length > 0)
        .map(([category, values]) => `
        <div class="skill-category">
          <strong>${category.charAt(0).toUpperCase() + category.slice(1)}:</strong>
          ${values.map(sanitizeHTML).join(", ")}
        </div>`)
        .join("\n")}
    </div>`
    : "<div class='empty-section'>No skills information provided</div>";

  // PROJECTS SECTION WITH METRICS EMPHASIS
  const projectsSection = projects.length
    ? projects
        .map(
          (project) => `
          <div class="section-item">
            <div class="item-header">
              <span class="item-title">${sanitizeHTML(project.name || "Unnamed Project")}</span>
            </div>
            ${project.techStack ? `<div class="item-subtitle">${sanitizeHTML(project.techStack)}</div>` : ''}
            <ul class="item-bullets">
              ${project.bullets ? processBullets(project.bullets) : "<li>No details provided</li>"}
            </ul>
          </div>`
        )
        .join("\n")
    : "<div class='empty-section'>No projects information provided</div>";

  // EXPERIENCE SECTION WITH IMPACTFUL BULLETS
  const experienceSection = experience.length
    ? experience
        .map(
          (exp) => `
          <div class="section-item">
            <div class="item-header">
              <span class="item-title">${sanitizeHTML(exp.company || "N/A")}</span>
              <span class="item-date">${sanitizeHTML(exp.duration || "N/A")}</span>
            </div>
            <div class="item-subtitle">${sanitizeHTML(exp.title || "N/A")} ${exp.location ? `(${sanitizeHTML(exp.location)})` : ''}</div>
            <ul class="item-bullets">
              ${exp.bullets ? processBullets(exp.bullets) : "<li>No details provided</li>"}
            </ul>
          </div>`
        )
        .join("\n")
    : "<div class='empty-section'>No experience information provided</div>";

  // CERTIFICATIONS SECTION
  const certificationsSection = certifications.length
    ? `<ul class="certification-list">${certifications.map((cert) => `<li>${sanitizeHTML(cert)}</li>`).join("\n")}</ul>`
    : "<div class='empty-section'>No certifications provided</div>";

  // STRENGTHS SECTION
  const strengthsSection = strengths.length
    ? `<ul class="strengths-list">${strengths.map((strength) => `<li>${sanitizeHTML(strength)}</li>`).join("\n")}</ul>`
    : "<div class='empty-section'>No strengths provided</div>";

  // Generate keyword analysis from job description
  const keywords = jobDescription.match(/\b[\w']+(?:\s+[\w']+){0,2}\b/g) || [];
  const uniqueKeywords = [...new Set(keywords)].slice(0, 20).join(", ");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - ${sanitizeHTML(name)}</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        /* PROFESSIONAL RESUME STYLING */
        :root {
            --primary-color: #2b6cb0;
            --secondary-color: #4a5568;
            --accent-color: #4299e1;
            --text-color: #2d3748;
            --light-gray: #f7fafc;
            --medium-gray: #e2e8f0;
        }
        
        body {
            font-family: 'Roboto', 'Open Sans', sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            max-width: 850px;
            margin: 0 auto;
            padding: 2rem;
            background: white;
        }
        
        /* PROMINENT NAME HEADER */
        .resume-header {
            text-align: center;
            margin-bottom: 1.5rem;
            border-bottom: 3px solid var(--primary-color);
            padding-bottom: 1rem;
        }
        
        .resume-name {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--primary-color);
            margin: 0;
            letter-spacing: -0.5px;
        }
        
        .resume-title {
            font-size: 1.3rem;
            font-weight: 500;
            color: var(--secondary-color);
            margin: 0.5rem 0;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1.5rem;
            margin-top: 0.5rem;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
        }
        
        /* SECTION STYLING */
        .resume-section {
            margin-bottom: 1.5rem;
        }
        
        .section-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--primary-color);
            border-bottom: 2px solid var(--medium-gray);
            padding-bottom: 0.3rem;
            margin-bottom: 0.8rem;
        }
        
        .section-item {
            margin-bottom: 1.2rem;
        }
        
        .item-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.3rem;
        }
        
        .item-title {
            font-weight: 600;
            font-size: 1.05rem;
        }
        
        .item-date {
            font-style: italic;
            color: var(--secondary-color);
        }
        
        .item-subtitle {
            font-weight: 500;
            color: var(--secondary-color);
            margin-bottom: 0.3rem;
        }
        
        .item-detail {
            margin-bottom: 0.3rem;
            font-size: 0.95rem;
        }
        
        .item-bullets {
            margin: 0.5rem 0 0 1rem;
            padding-left: 1rem;
        }
        
        .item-bullets li {
            margin-bottom: 0.3rem;
        }
        
        /* SKILLS STYLING */
        .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem 2rem;
        }
        
        .skill-category {
            line-height: 1.4;
        }
        
        /* EMPTY STATE */
        .empty-section {
            color: var(--secondary-color);
            font-style: italic;
        }
        
        /* PRINT OPTIMIZATION */
        @media print {
            body {
                padding: 0;
                font-size: 12pt;
            }
            
            .resume-name {
                font-size: 24pt;
            }
            
            a {
                text-decoration: none;
                color: inherit;
            }
        }
        
        /* RESPONSIVE ADJUSTMENTS */
        @media (max-width: 768px) {
            .resume-name {
                font-size: 2rem;
            }
            
            .contact-info {
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
            }
            
            .item-header {
                flex-direction: column;
            }
            
            .item-date {
                margin-top: 0.2rem;
            }
        }
    </style>
</head>
<body>
    <div class="resume-header">
        <h1 class="resume-name">${sanitizeHTML(name)}</h1>
        <div class="resume-title">${sanitizeHTML(title)}</div>
        <div class="contact-info">
            ${email !== "N/A" ? `<div class="contact-item"><i class="fas fa-envelope"></i> ${sanitizeHTML(email)}</div>` : ''}
            ${phone !== "N/A" ? `<div class="contact-item"><i class="fas fa-phone"></i> ${sanitizeHTML(phone)}</div>` : ''}
            ${location !== "N/A" ? `<div class="contact-item"><i class="fas fa-map-marker-alt"></i> ${sanitizeHTML(location)}</div>` : ''}
            ${github !== "N/A" ? `<div class="contact-item"><i class="fab fa-github"></i> ${sanitizeHTML(github)}</div>` : ''}
            ${linkedin !== "N/A" ? `<div class="contact-item"><i class="fab fa-linkedin"></i> ${sanitizeHTML(linkedin)}</div>` : ''}
        </div>
    </div>
    
    ${strengths.length ? `
    <div class="resume-section">
        <h2 class="section-title">PROFESSIONAL SUMMARY</h2>
        ${strengthsSection}
    </div>` : ''}
    
    <div class="resume-section">
        <h2 class="section-title">TECHNICAL SKILLS</h2>
        ${skillsSection}
    </div>
    
    ${experience.length ? `
    <div class="resume-section">
        <h2 class="section-title">PROFESSIONAL EXPERIENCE</h2>
        ${experienceSection}
    </div>` : ''}
    
    ${projects.length ? `
    <div class="resume-section">
        <h2 class="section-title">PROJECTS</h2>
        ${projectsSection}
    </div>` : ''}
    
    ${education.length ? `
    <div class="resume-section">
        <h2 class="section-title">EDUCATION</h2>
        ${educationSection}
    </div>` : ''}
    
    ${certifications.length ? `
    <div class="resume-section">
        <h2 class="section-title">CERTIFICATIONS</h2>
        ${certificationsSection}
    </div>` : ''}
</body>
</html>
`;
}