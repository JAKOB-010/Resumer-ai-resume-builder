import Groq from "groq-sdk";
import { ATS_ANALYZE_SYSTEM_PROMPT } from "../prompts/atsAnalyze.system.js";

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

export async function analyzeResumeText(req, res, next) {
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

    // Initialize Groq instead of Gemini
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Call Groq's Llama 3 model
    // Inside analyze.controller.js, update this block:
const chatCompletion = await groq.chat.completions.create({
  messages: [
    {
      role: "system",
      content: ATS_ANALYZE_SYSTEM_PROMPT,
    },
    {
      role: "user",
      content: `Please analyze this resume and return the output strictly in JSON format.\n\nResume plain text to analyze:\n\n${resumeText}`, // <-- Added the word JSON here!
    },
  ],
  model: "llama-3.3-70b-versatile", 
  temperature: 0.35,
  response_format: { type: "json_object" },
});

    const raw = chatCompletion.choices[0]?.message?.content ?? "";

    const parsed = safeJsonParse(raw);
    if (!parsed || typeof parsed !== "object") {
      return res.status(502).json({
        error: "AI returned an unreadable response. Try again or shorten the resume text.",
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