export function checkAts(req, res) {
  const resumeFile = req.file;

  if (!resumeFile) {
    return res.status(400).json({ message: "Resume file is required." });
  }

  const filename = resumeFile.originalname.toLowerCase();
  const sizeKb = Math.round(resumeFile.size / 1024);

  let score = 68;
  if (filename.endsWith(".pdf")) score += 8;
  if (sizeKb < 512) score += 6;
  if (sizeKb > 2048) score -= 10;

  const suggestions = [
    "Use role-specific keywords from the job description.",
    "Keep section headings simple (Summary, Experience, Education, Skills).",
    "Quantify impact with metrics in experience bullets.",
  ];

  if (!filename.endsWith(".pdf")) {
    suggestions.push("Prefer PDF format for consistent ATS parsing.");
  }

  return res.json({
    score: Math.max(0, Math.min(100, score)),
    suggestions,
    meta: {
      filename: resumeFile.originalname,
      sizeKb,
      mimeType: resumeFile.mimetype,
    },
  });
}
