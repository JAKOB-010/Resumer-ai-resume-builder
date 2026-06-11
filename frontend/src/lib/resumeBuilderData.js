const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

export const createEmptyExperience = () => ({
  id: generateId(),
  jobTitle: '',
  company: '',
  startDate: '',
  endDate: '',
  isPresent: false,
  description: '',
});

export const createEmptyEducation = () => ({
  id: generateId(),
  degree: '',
  school: '',
  startDate: '',
  endDate: '',
  location: '',
});

export const createEmptyCustomSection = () => ({
  id: generateId(),
  title: '',
  content: '',
});

/** Safe defaults — prevents `.map()` crashes in forms and templates. */
export const EMPTY_RESUME_DATA = {
  personalInfo: {
    profilePicture: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  accomplishments: [],
  links: {
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
  },
  hobbies: [],
  customSections: [],
};

function normalizeExperienceItem(item) {
  if (!item || typeof item !== 'object') return createEmptyExperience();
  
  // Ensure dates are in YYYY-MM format for type="month" inputs
  const formatDateForMonthInput = (date) => {
    if (!date) return '';
    const trimmed = String(date).trim();
    // If it's already in YYYY-MM format, return as-is
    if (/^\d{4}-\d{2}$/.test(trimmed)) return trimmed;
    // If it's just a year (YYYY), convert to YYYY-01
    if (/^\d{4}$/.test(trimmed)) return `${trimmed}-01`;
    return trimmed;
  };
  
  return {
    id: item.id || generateId(),
    jobTitle: item.jobTitle || item.role || item.title || '',
    company: item.company || '',
    startDate: formatDateForMonthInput(item.startDate),
    endDate: item.endDate === 'Present' ? '' : formatDateForMonthInput(item.endDate),
    isPresent: Boolean(item.isPresent || item.endDate === 'Present'),
    description: item.description || '',
  };
}

function normalizeEducationItem(item) {
  if (!item || typeof item !== 'object') return createEmptyEducation();
  
  // Ensure dates are in YYYY-MM format for type="month" inputs
  const formatDateForMonthInput = (date) => {
    if (!date) return '';
    const trimmed = String(date).trim();
    // If it's already in YYYY-MM format, return as-is
    if (/^\d{4}-\d{2}$/.test(trimmed)) return trimmed;
    // If it's just a year (YYYY), convert to YYYY-01
    if (/^\d{4}$/.test(trimmed)) return `${trimmed}-01`;
    return trimmed;
  };
  
  return {
    id: item.id || generateId(),
    degree: item.degree || '',
    school: item.school || '',
    startDate: formatDateForMonthInput(item.startDate),
    endDate: formatDateForMonthInput(item.endDate || item.graduationYear || item.graduationDate),
    location: item.location || '',
  };
}

/**
 * Ensures every array/object exists before render — supports legacy `personal` key.
 */
export function normalizeResumeData(data) {
  if (!data || typeof data !== 'object') {
    return {
      ...EMPTY_RESUME_DATA,
      experience: [createEmptyExperience()],
      education: [createEmptyEducation()],
    };
  }

  const legacyPersonal = data.personal || {};
  const pi = data.personalInfo || legacyPersonal || {};

  const personalInfo = {
    profilePicture: pi.profilePicture || pi.photoUrl || '',
    firstName: pi.firstName || '',
    lastName: pi.lastName || '',
    email: pi.email || '',
    phone: pi.phone || '',
    city: pi.city || '',
    country: pi.country || '',
  };

  const experience = Array.isArray(data.experience)
    ? data.experience.map(normalizeExperienceItem)
    : [];
  const education = Array.isArray(data.education)
    ? data.education.map(normalizeEducationItem)
    : [];

  return {
    personalInfo,
    summary: typeof data.summary === 'string' ? data.summary : '',
    experience: experience.length > 0 ? experience : [createEmptyExperience()],
    education: education.length > 0 ? education : [createEmptyEducation()],
    skills: Array.isArray(data.skills) ? data.skills.filter(Boolean) : [],
    accomplishments: Array.isArray(data.accomplishments) ? data.accomplishments.filter(Boolean) : [],
    links: {
      ...EMPTY_RESUME_DATA.links,
      ...(data.links && typeof data.links === 'object' ? data.links : {}),
    },
    hobbies: Array.isArray(data.hobbies) ? data.hobbies.filter(Boolean) : [],
    customSections: Array.isArray(data.customSections)
      ? data.customSections.map((s) => ({
          id: s?.id || generateId(),
          title: s?.title || '',
          content: s?.content || '',
        }))
      : [],
  };
}

/**
 * Maps Step 2 `resumeData` to the unified template `data` prop.
 */
export function resumeDataToTemplateData(resumeData) {
  const safe = normalizeResumeData(resumeData);
  const pi = safe.personalInfo;
  const fullName = [pi.firstName, pi.lastName].filter(Boolean).join(' ').trim();
  const location = [pi.city, pi.country].filter(Boolean).join(', ');
  const links = safe.links || EMPTY_RESUME_DATA.links;

  return {
    personalInfo: {
      fullName,
      email: pi.email || '',
      phone: pi.phone || '',
      location,
      image: pi.profilePicture || '',
      photoUrl: pi.profilePicture || '',
      website: links.website || '',
      linkedin: links.linkedin || '',
      portfolio: links.github || links.website || '',
    },
    summary: safe.summary || '',
    experience: safe.experience
      .filter((job) => job.company || job.jobTitle || job.description)
      .map((job) => ({
        company: job.company || '',
        title: job.jobTitle || '',
        role: job.jobTitle || '',
        startDate: job.startDate || '',
        endDate: job.isPresent ? 'Present' : job.endDate || '',
        description: job.description || '',
      })),
    education: safe.education
      .filter((edu) => edu.school || edu.degree)
      .map((edu) => ({
        school: edu.school || '',
        degree: edu.degree || '',
        graduationDate: edu.endDate || '',
        startDate: edu.startDate || '',
        location: edu.location || '',
      })),
    skills: safe.skills.map((skill) =>
      typeof skill === 'string' ? { name: skill } : { name: skill?.name || '' }
    ),
    accomplishments: safe.accomplishments,
    hobbies: safe.hobbies,
    customSections: safe.customSections,
  };
}

/** Convert /api/ai/parse response into Step 2 form state. */
export function parsedApiToResumeData(apiPayload) {
  if (!apiPayload || typeof apiPayload !== 'object') {
    return normalizeResumeData(null);
  }

  const pi = apiPayload.personalInfo || {};
  const nameParts = (pi.fullName || '').trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return normalizeResumeData({
    personalInfo: {
      firstName,
      lastName,
      email: pi.email || '',
      phone: pi.phone || '',
      city: '',
      country: '',
      profilePicture: pi.photoUrl || '',
    },
    summary: pi.summary || '',
    experience: (apiPayload.experience || []).map((exp) => ({
      id: exp.id || generateId(),
      jobTitle: exp.role || exp.jobTitle || '',
      company: exp.company || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate === 'Present' ? '' : exp.endDate || '',
      isPresent: exp.endDate === 'Present',
      description: exp.description || '',
    })),
    education: (apiPayload.education || []).map((edu) => ({
      id: edu.id || generateId(),
      degree: edu.degree || '',
      school: edu.school || '',
      startDate: '',
      endDate: edu.graduationYear || edu.graduationDate || '',
      location: edu.location || '',
    })),
    skills: Array.isArray(apiPayload.skills) ? apiPayload.skills : [],
    links: {
      website: pi.portfolio || '',
      linkedin: pi.linkedin || '',
      github: '',
      twitter: '',
    },
  });
}

export function resumeDataFromStore(state) {
  if (state?.resumeData) {
    return normalizeResumeData(state.resumeData);
  }

  const pi = state?.personalInfo || {};
  const [firstName, ...rest] = (pi.fullName || '').trim().split(/\s+/);

  return normalizeResumeData({
    personalInfo: {
      profilePicture: pi.photoUrl || '',
      firstName: firstName || '',
      lastName: rest.join(' ') || '',
      email: pi.email || '',
      phone: pi.phone || '',
    },
    summary: pi.summary || '',
    experience:
      state?.experience?.length > 0
        ? state.experience.map((e) => ({
            id: e.id,
            jobTitle: e.role || '',
            company: e.company || '',
            startDate: e.startDate || '',
            endDate: e.endDate === 'Present' ? '' : e.endDate || '',
            isPresent: e.endDate === 'Present',
            description: e.description || '',
          }))
        : [],
    education:
      state?.education?.length > 0
        ? state.education.map((e) => ({
            id: e.id,
            degree: e.degree || '',
            school: e.school || '',
            endDate: e.graduationYear || '',
          }))
        : [],
    skills: state?.skills || [],
    links: {
      linkedin: pi.linkedin || '',
      website: pi.portfolio || '',
    },
  });
}

/** Persist Step 2 data into the Zustand store. */
export function syncResumeDataToStore(resumeData, store) {
  const safe = normalizeResumeData(resumeData);
  const templateShape = resumeDataToTemplateData(safe);
  const pi = templateShape.personalInfo;

  store.setPersonalInfo({
    fullName: pi.fullName,
    email: pi.email,
    phone: pi.phone,
    linkedin: pi.linkedin,
    portfolio: pi.portfolio,
    summary: templateShape.summary,
    photoUrl: pi.photoUrl || pi.image || '',
  });

  store.setExperience(
    safe.experience.map((job) => ({
      id: job.id,
      company: job.company,
      role: job.jobTitle,
      startDate: job.startDate,
      endDate: job.isPresent ? 'Present' : job.endDate,
      description: job.description,
    }))
  );

  store.setEducation(
    safe.education.map((edu) => ({
      id: edu.id,
      school: edu.school,
      degree: edu.degree,
      graduationYear: edu.endDate,
    }))
  );

  store.setSkills(safe.skills);
  store.setResumeData(safe);
}
