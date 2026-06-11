import { createEmptyResume, requiredPersonalInfoKeys } from "../models/resume.schema.js";

export function getResumeTemplate(_req, res) {
  return res.json(createEmptyResume());
}

export function validateResumePayload(req, res) {
  const payload = req.body || {};
  const issues = [];

  if (!payload.personalInfo || typeof payload.personalInfo !== "object") {
    issues.push("personalInfo must be an object.");
  } else {
    for (const key of requiredPersonalInfoKeys) {
      if (!(key in payload.personalInfo)) {
        issues.push(`personalInfo.${key} is missing.`);
      }
    }
  }

  if (!Array.isArray(payload.experience)) issues.push("experience must be an array.");
  if (!Array.isArray(payload.education)) issues.push("education must be an array.");
  if (!Array.isArray(payload.skills)) issues.push("skills must be an array.");

  if (!("atsScore" in payload)) issues.push("atsScore field is missing.");

  return res.json({
    valid: issues.length === 0,
    issues,
  });
}
