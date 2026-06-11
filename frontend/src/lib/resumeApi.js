import { buildApiUrl } from './api';

async function parseJsonResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || data.message || `Request failed (${response.status})`);
  }
  return data;
}

/**
 * Parse resume text into structured data using AI (/api/ai/parse).
 */
export async function parseResumeTextWithAI(resumeText) {
  const response = await fetch(buildApiUrl('/api/ai/parse'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeText }),
  });
  return parseJsonResponse(response);
}

/**
 * Rewrite any resume section text (/api/ai/rewrite).
 */
export async function rewriteTextWithAI(text) {
  const response = await fetch(buildApiUrl('/api/ai/rewrite'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return parseJsonResponse(response);
}

/**
 * ATS score from full resumeData JSON (/api/ai/ats-score or /api/ats-score).
 */
export async function fetchAtsScore(resumeData) {
  // Only send text data to avoid "request entity too large" error from base64 images
  const textOnlyData = {
    summary: resumeData?.summary || '',
    experience: resumeData?.experience || [],
    education: resumeData?.education || [],
    skills: resumeData?.skills || [],
    personalInfo: {
      firstName: resumeData?.personalInfo?.firstName || '',
      lastName: resumeData?.personalInfo?.lastName || '',
      email: resumeData?.personalInfo?.email || '',
      phone: resumeData?.personalInfo?.phone || '',
      // Exclude profilePicture to avoid sending base64 images
    },
  };
  const response = await fetch(buildApiUrl('/api/ats-score'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeData: textOnlyData }),
  });
  return parseJsonResponse(response);
}

/**
 * Fetch AI skill suggestions (/api/ai/skill-suggestions).
 */
export async function fetchSkillSuggestionsWithAI({ summary, skills, experience, jobTitle }) {
  const response = await fetch(buildApiUrl('/api/ai/skill-suggestions'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ summary, skills, experience, jobTitle }),
  });
  return parseJsonResponse(response);
}

/**
 * Convert resumeData to plain text format for ATS analysis.
 */
export function resumeDataToText(resumeData) {
  const lines = [];
  const pi = resumeData?.personalInfo || resumeData?.personal || {};

  const fullName = [pi.firstName, pi.lastName].filter(Boolean).join(' ') || pi.fullName;
  if (fullName) lines.push(`NAME: ${fullName}`);
  if (pi.email) lines.push(`EMAIL: ${pi.email}`);
  if (pi.phone) lines.push(`PHONE: ${pi.phone}`);
  if (pi.linkedin) lines.push(`LINKEDIN: ${pi.linkedin}`);
  if (pi.portfolio) lines.push(`PORTFOLIO: ${pi.portfolio}`);

  if (resumeData?.summary) {
    lines.push('');
    lines.push('PROFESSIONAL SUMMARY:');
    lines.push(resumeData.summary);
  }

  if (resumeData?.experience?.length > 0) {
    const hasAny = resumeData.experience.some((e) => e.company || e.jobTitle || e.role);
    if (hasAny) {
      lines.push('');
      lines.push('EXPERIENCE:');
      resumeData.experience.forEach((exp) => {
        const role = exp.jobTitle || exp.role;
        if (exp.company || role) {
          if (role) lines.push(`${role}`);
          if (exp.company) lines.push(`${exp.company}`);
          if (exp.startDate || exp.endDate) {
            lines.push(`${exp.startDate} - ${exp.isPresent ? 'Present' : exp.endDate || 'Present'}`);
          }
          if (exp.description) lines.push(exp.description);
          lines.push('');
        }
      });
    }
  }

  if (resumeData?.education?.length > 0) {
    const hasAny = resumeData.education.some((e) => e.school || e.degree);
    if (hasAny) {
      lines.push('');
      lines.push('EDUCATION:');
      resumeData.education.forEach((edu) => {
        if (edu.school || edu.degree) {
          if (edu.degree) lines.push(`${edu.degree}`);
          if (edu.school) lines.push(`${edu.school}`);
          if (edu.endDate || edu.graduationYear) {
            lines.push(`Graduation: ${edu.endDate || edu.graduationYear}`);
          }
          lines.push('');
        }
      });
    }
  }

  if (resumeData?.skills?.length > 0) {
    lines.push('');
    lines.push('SKILLS:');
    lines.push(resumeData.skills.join(', '));
  }

  return lines.join('\n');
}

/**
 * Analyze resume with ATS scoring.
 */
export async function analyzeResumeForATS(resumeText) {
  const response = await fetch(buildApiUrl('/api/analyze'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeText }),
  });
  return parseJsonResponse(response);
}
