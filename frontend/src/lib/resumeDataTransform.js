import { resumeDataToTemplateData } from './resumeBuilderData';

/**
 * Maps Zustand resume store shape to the template `data` prop (Azurill format).
 */
export function storeToTemplateData({ personalInfo, experience, education, skills, resumeData }) {
  if (resumeData) {
    return resumeDataToTemplateData(resumeData);
  }
  const pi = personalInfo || {};
  return {
    personalInfo: {
      name: pi.fullName || '',
      email: pi.email || '',
      phone: pi.phone || '',
      role: pi.portfolio || pi.linkedin || 'Professional',
      photoUrl: pi.photoUrl || '',
      linkedin: pi.linkedin || '',
    },
    summary: pi.summary || '',
    experience: (experience || [])
      .filter((exp) => exp.company || exp.role)
      .map((exp) => ({
        company: exp.company || 'Company',
        role: exp.role || 'Position',
        date: `${exp.startDate || ''}${exp.startDate || exp.endDate ? ' - ' : ''}${exp.endDate || 'Present'}`,
        description: exp.description || '',
      })),
    education: (education || [])
      .filter((edu) => edu.school || edu.degree)
      .map((edu) => ({
        school: edu.school || 'School',
        degree: edu.degree || 'Degree',
        date: edu.graduationYear || '',
      })),
    skills: skills || [],
  };
}
