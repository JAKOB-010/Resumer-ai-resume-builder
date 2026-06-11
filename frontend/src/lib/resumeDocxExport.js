import {
  Document,
  HeadingLevel,
  Paragraph,
  TextRun,
} from 'docx';

function getFullName(personalInfo = {}) {
  if (personalInfo.fullName?.trim()) return personalInfo.fullName.trim();
  return [personalInfo.firstName, personalInfo.lastName].filter(Boolean).join(' ').trim();
}

function heading(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 120 },
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, ...opts })],
    spacing: { after: 120 },
  });
}

function bulletLines(text) {
  if (!text?.trim()) return [];
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map(
      (line) =>
        new Paragraph({
          text: line.replace(/^[-•*]\s*/, ''),
          bullet: { level: 0 },
          spacing: { after: 80 },
        })
    );
}

/**
 * Build a structured Word document from Step 2/3 `resumeData`.
 */
export function buildResumeDocx(resumeData) {
  const pi = resumeData.personalInfo || {};
  const fullName = getFullName(pi) || 'My Resume';
  const location = [pi.city, pi.country].filter(Boolean).join(', ');
  const contactParts = [pi.email, pi.phone, location].filter(Boolean);

  const children = [
    new Paragraph({
      children: [new TextRun({ text: fullName, bold: true, size: 36 })],
      heading: HeadingLevel.TITLE,
      spacing: { after: 160 },
    }),
  ];

  if (contactParts.length > 0) {
    children.push(body(contactParts.join('  •  '), { size: 22, color: '444444' }));
  }

  const links = resumeData.links || {};
  const linkLine = [links.linkedin, links.website, links.github].filter(Boolean).join('  •  ');
  if (linkLine) {
    children.push(body(linkLine, { size: 20, color: '444444' }));
  }

  if (resumeData.summary?.trim()) {
    children.push(heading('Professional Summary'));
    children.push(body(resumeData.summary.trim()));
  }

  const experience = (resumeData.experience || []).filter(
    (e) => e.jobTitle || e.company || e.description
  );
  if (experience.length > 0) {
    children.push(heading('Experience'));
    experience.forEach((job) => {
      const titleLine = [job.jobTitle, job.company].filter(Boolean).join(' — ');
      if (titleLine) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: titleLine, bold: true, size: 24 })],
            spacing: { before: 120, after: 60 },
          })
        );
      }
      const dates = [job.startDate, job.isPresent ? 'Present' : job.endDate]
        .filter(Boolean)
        .join(' – ');
      if (dates) {
        children.push(body(dates, { italics: true, size: 20, color: '555555' }));
      }
      children.push(...bulletLines(job.description));
    });
  }

  const education = (resumeData.education || []).filter((e) => e.degree || e.school);
  if (education.length > 0) {
    children.push(heading('Education'));
    education.forEach((edu) => {
      const line = [edu.degree, edu.school].filter(Boolean).join(' — ');
      if (line) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: line, bold: true, size: 24 })],
            spacing: { before: 120, after: 60 },
          })
        );
      }
      const meta = [edu.location, edu.endDate].filter(Boolean).join('  •  ');
      if (meta) children.push(body(meta, { size: 20, color: '555555' }));
    });
  }

  if (resumeData.skills?.length > 0) {
    children.push(heading('Skills'));
    children.push(body(resumeData.skills.join(', ')));
  }

  if (resumeData.accomplishments?.length > 0) {
    children.push(heading('Accomplishments'));
    resumeData.accomplishments.forEach((item) => {
      children.push(body(String(item)));
    });
  }

  return new Document({
    sections: [{ properties: {}, children }],
  });
}

export function getResumeExportBaseName(resumeData) {
  const name = getFullName(resumeData?.personalInfo) || 'My';
  return name.replace(/[^\w\s-]/g, '').replace(/\s+/g, '_') || 'My';
}
