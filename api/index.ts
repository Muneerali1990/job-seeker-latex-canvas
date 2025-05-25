import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { writeFileSync } from "fs";
import { createPerfectATSResumePrompt } from "./prompt";
import path from "path";
import type { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3001;
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.post("/api/generate-resume", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userData, jobDescription } = req.body;

  if (!userData || !jobDescription) {
    res.status(400).json({ error: "Missing userData or jobDescription" });
    return;
  }

  try {
    const prompt = createPerfectATSResumePrompt(userData, jobDescription);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.2,
        topP: 0.9,
        topK: 40,
      },
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      systemInstruction: {
        role: "system",
        parts: [{
          text: `You are an ATS resume expert that generates perfect HTML resumes. Follow these rules:
1. Output ONLY valid HTML code with embedded CSS styling (no external files)
2. Include a complete HTML document structure with proper head and body tags
3. Use professional fonts (like Open Sans or Roboto from Google Fonts)
4. Include Font Awesome icons for contact information
5. Maintain a clean, professional design with a blue color scheme
6. Ensure the resume is responsive and works on different screen sizes
7. Required sections:
   - Header with contact info (name, title, email, phone, location, GitHub, LinkedIn)
   - Professional Summary
   - Technical Skills (multi-column layout)
   - Professional Experience
   - Education
   - Projects
   - Certifications & Achievements
8. Use semantic HTML and proper section organization
9. Include CSS styling that mimics a professional LaTeX resume aesthetic
10. Format for ATS compatibility with clear section headings
11. Use strong action verbs and metrics where possible
12. and please ignore  code block markers
13. Example structure:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - [Name]</title>
    <style>
        /* Professional CSS styling here */
    </style>
</head>
<body>
    <!-- Resume content here -->
</body>
</html>`
        }],
      },
    });

    const html = await result.response.text();

    // Validate the HTML structure
    const requiredPatterns = [
      /<!DOCTYPE html>/i,
      /<html.*>/i,
      /<head>.*<\/head>/is,
      /<body>.*<\/body>/is,
      /<h1.*?>.*?<\/h1>/i,
      /Professional Summary/i,
      /Technical Skills/i,
      /Professional Experience/i,
      /Education/i,
      /Projects/i,
    ];

    const isValid = requiredPatterns.every((pattern) => pattern.test(html));
    if (!isValid) {
      throw new Error("Invalid HTML format: Missing required sections or document structure");
    }

    // Save the HTML file (optional)
    const htmlFilePath = path.join(__dirname, "resume.html");
    writeFileSync(htmlFilePath, html);

    res.json({ htmlCode: html });
  } catch (error: any) {
    next(error);
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});