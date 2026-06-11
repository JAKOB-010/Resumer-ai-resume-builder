import Groq from "groq-sdk";

function safeJsonParse(raw) {
  if (!raw || typeof raw !== "string") return null;
  const trimmed = raw.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      try {
        return JSON.parse(trimmed.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

export async function parseResumeText(req, res, next) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(503).json({
        error: "Server misconfiguration: GROQ_API_KEY is not set.",
      });
    }

    const resumeText =
      typeof req.body?.resumeText === "string" ? req.body.resumeText.trim() : "";

    if (!resumeText) {
      return res.status(400).json({
        error: "Missing or empty resumeText in request body.",
      });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const systemPrompt = `You are an expert resume parser. Extract structured data from the provided resume text and return it as JSON matching this EXACT structure:
{
  "personalInfo": {
    "fullName": "string or empty",
    "email": "string or empty",
    "phone": "string or empty",
    "linkedin": "string or empty",
    "portfolio": "string or empty",
    "summary": "string or empty"
  },
  "experience": [
    {
      "id": "unique id",
      "company": "string",
      "role": "string",
      "startDate": "string (YYYY-MM or similar)",
      "endDate": "string (YYYY-MM or similar, or 'Present')",
      "description": "string"
    }
  ],
  "education": [
    {
      "id": "unique id",
      "school": "string",
      "degree": "string",
      "graduationYear": "string (YYYY format)"
    }
  ],
  "skills": ["skill1", "skill2", ...]
}

Rules:
- Extract ONLY data that is explicitly present in the resume
- Use empty strings for missing fields, not null
- Generate simple IDs for experience and education (e.g., "exp_1", "edu_1")
- Break experience descriptions into clear bullet points if multiple bullets exist
- Return ONLY the JSON object, no markdown, no commentary`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `Parse this resume text into structured JSON:\n\n${resumeText}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const raw = chatCompletion.choices[0]?.message?.content ?? "";
    const parsed = safeJsonParse(raw);

    if (!parsed || typeof parsed !== "object") {
      return res.status(502).json({
        error: "AI returned an unreadable response. Try again or rephrase the resume text.",
        raw: typeof raw === "string" ? raw.slice(0, 500) : undefined,
      });
    }

    return res.json(parsed);
  } catch (err) {
    const msg = err?.message || "Groq request failed.";
    if (/API key|API_KEY|401|403/i.test(msg)) {
      return res.status(503).json({ error: "Invalid or rejected Groq API key." });
    }
    return next(err);
  }
}

export async function rewriteText(req, res, next) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(503).json({
        error: "Server misconfiguration: GROQ_API_KEY is not set.",
      });
    }

    const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";

    if (!text) {
      return res.status(400).json({
        error: "Missing or empty text in request body.",
      });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const systemPrompt = `You are an expert resume writer. The user has written the following draft for a resume section. Rewrite it to be concise, action-oriented, professional, and grammatically perfect. Do not add made-up facts.

Take the following user input and rewrite it to be highly professional, impactful, and tailored for a resume.

Return JSON only: { "text": "..." }. No markdown.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Draft:\n${text}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.45,
      response_format: { type: "json_object" },
    });

    const raw = chatCompletion.choices[0]?.message?.content ?? "";
    const parsed = safeJsonParse(raw);
    const rewritten =
      typeof parsed?.text === "string"
        ? parsed.text.trim()
        : typeof parsed?.summary === "string"
          ? parsed.summary.trim()
          : "";

    if (!rewritten) {
      return res.status(502).json({
        error: "AI returned an empty rewrite. Try again.",
      });
    }

    return res.json({ text: rewritten });
  } catch (err) {
    return next(err);
  }
}

export async function atsScoreResumeData(req, res, next) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(503).json({
        error: "Server misconfiguration: GROQ_API_KEY is not set.",
      });
    }

    const resumeData = req.body?.resumeData;
    if (!resumeData || typeof resumeData !== "object") {
      return res.status(400).json({
        error: "Missing resumeData object in request body.",
      });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const systemPrompt = `You are an ATS (Applicant Tracking System). Analyze the following resume JSON data. Give it an ATS compatibility score out of 100 based on standard resume formatting, keyword density, lack of buzzwords, and clear descriptions.

Return ONLY a JSON object with two keys:
- "score" (number 0-100)
- "feedback" (1-2 sentences of brief advice)

No markdown.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: JSON.stringify(resumeData, null, 2),
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const raw = chatCompletion.choices[0]?.message?.content ?? "";
    const parsed = safeJsonParse(raw);

    if (!parsed || typeof parsed.score !== "number") {
      return res.status(502).json({
        error: "AI returned an invalid ATS score. Try again.",
      });
    }

    const score = Math.min(100, Math.max(0, Math.round(parsed.score)));
    const feedback =
      typeof parsed.feedback === "string"
        ? parsed.feedback.trim()
        : "Review your formatting and keywords for better ATS compatibility.";

    return res.json({ score, feedback });
  } catch (err) {
    return next(err);
  }
}

export async function rewriteSummary(req, res, next) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(503).json({
        error: "Server misconfiguration: GROQ_API_KEY is not set.",
      });
    }

    const summary =
      typeof req.body?.summary === "string" ? req.body.summary.trim() : "";
    const jobTitle =
      typeof req.body?.jobTitle === "string" ? req.body.jobTitle.trim() : "";
    const experience = Array.isArray(req.body?.experience)
      ? req.body.experience
      : [];

    if (!summary && experience.length === 0) {
      return res.status(400).json({
        error: "Provide a summary or at least one experience entry to rewrite.",
      });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const contextLines = experience
      .slice(0, 4)
      .map((exp) => {
        const role = exp.role || exp.jobTitle || exp.title || "";
        const company = exp.company || "";
        return [role, company].filter(Boolean).join(" at ");
      })
      .filter(Boolean);

    const userContent = [
      jobTitle ? `Target role: ${jobTitle}` : "",
      contextLines.length
        ? `Recent experience:\n${contextLines.join("\n")}`
        : "",
      summary ? `Current summary:\n${summary}` : "No summary yet — write one from the experience.",
      "Rewrite as a concise 2–4 sentence professional summary. Use first person implied (no 'I'). Return JSON only.",
    ]
      .filter(Boolean)
      .join("\n\n");

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            'You are an expert resume writer. Return JSON: { "summary": "..." }. No markdown.',
        },
        { role: "user", content: userContent },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      response_format: { type: "json_object" },
    });

    const raw = chatCompletion.choices[0]?.message?.content ?? "";
    const parsed = safeJsonParse(raw);
    const rewritten =
      typeof parsed?.summary === "string" ? parsed.summary.trim() : "";

    if (!rewritten) {
      return res.status(502).json({
        error: "AI returned an empty summary. Try again.",
      });
    }

    return res.json({ summary: rewritten });
  } catch (err) {
    return next(err);
  }
}

export async function suggestSkills(req, res, next) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(503).json({
        error: "Server misconfiguration: GROQ_API_KEY is not set.",
      });
    }

    const summary =
      typeof req.body?.summary === "string" ? req.body.summary.trim() : "";
    const jobTitle =
      typeof req.body?.jobTitle === "string" ? req.body.jobTitle.trim() : "";
    const skills = Array.isArray(req.body?.skills) ? req.body.skills : [];
    const experience = Array.isArray(req.body?.experience)
      ? req.body.experience
      : [];

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const userContent = JSON.stringify(
      {
        jobTitle: jobTitle || null,
        summary: summary || null,
        currentSkills: skills,
        experience: experience.slice(0, 5).map((e) => ({
          role: e.role || e.jobTitle || e.title,
          company: e.company,
        })),
      },
      null,
      2
    );

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Suggest 8–12 relevant resume skills (short phrases, no duplicates).
Return JSON: { "skills": ["skill1", "skill2", ...] }.
Do not repeat skills already in currentSkills. No markdown.`,
        },
        { role: "user", content: userContent },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
      response_format: { type: "json_object" },
    });

    const raw = chatCompletion.choices[0]?.message?.content ?? "";
    const parsed = safeJsonParse(raw);
    const suggested = Array.isArray(parsed?.skills)
      ? parsed.skills.filter((s) => typeof s === "string" && s.trim())
      : [];

    const existing = new Set(skills.map((s) => String(s).toLowerCase()));
    const filtered = suggested
      .map((s) => s.trim())
      .filter((s) => s && !existing.has(s.toLowerCase()));

    return res.json({ skills: filtered.slice(0, 12) });
  } catch (err) {
    return next(err);
  }
}

export function getResumeSuggestions(req, res) {
  const { jobTitle = "", summary = "", skills = [] } = req.body || {};

  const cleanedSkills = Array.isArray(skills)
    ? skills.filter(Boolean).slice(0, 6)
    : [];

  const suggestions = [
    `Start your summary with a clear value proposition for ${jobTitle || "the target role"}.`,
    "Use action verbs and measurable outcomes in each experience bullet.",
    "Mirror the most important keywords from the job posting.",
  ];

  if (!summary) {
    suggestions.push("Add a 2-3 line professional summary for recruiter context.");
  }

  if (cleanedSkills.length < 5) {
    suggestions.push("Expand your skills section with role-specific tools and technologies.");
  }

  return res.json({
    suggestions,
    model: "rule-based-stub",
  });
}
