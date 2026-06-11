import { create } from 'zustand';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

const initialState = {
  // Template Selection
  selectedTemplate: null,
  
  // Resume Data
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    summary: '',
    photoUrl: ''
  },
  experience: [{ id: '1', company: '', role: '', startDate: '', endDate: '', description: '' }],
  education: [{ id: '1', school: '', degree: '', graduationYear: '' }],
  skills: [],
  resumeData: null,
  atsScore: null,
  atsFeedback: null,
};

const useResumeStore = create((set) => ({
  ...initialState,

  // Template Selection
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),

  // Personal info
  setPersonalInfo: (payload) => set((state) => ({ personalInfo: { ...state.personalInfo, ...payload } })),
  updatePersonalInfoField: (field, value) => set((state) => ({ personalInfo: { ...state.personalInfo, [field]: value } })),

  // Experience
  addExperience: (item = {}) => set((state) => ({ experience: [...state.experience, { id: generateId(), company: '', role: '', startDate: '', endDate: '', description: '', ...item }] })),
  updateExperience: (id, updates) => set((state) => ({ experience: state.experience.map((e) => e.id === id ? { ...e, ...updates } : e) })),
  removeExperience: (id) => set((state) => ({ experience: state.experience.filter((e) => e.id !== id) })),
  setExperience: (items) => set({ experience: items }),

  // Education
  addEducation: (item = {}) => set((state) => ({ education: [...state.education, { id: generateId(), school: '', degree: '', graduationYear: '', ...item }] })),
  updateEducation: (id, updates) => set((state) => ({ education: state.education.map((ed) => ed.id === id ? { ...ed, ...updates } : ed) })),
  removeEducation: (id) => set((state) => ({ education: state.education.filter((ed) => ed.id !== id) })),
  setEducation: (items) => set({ education: items }),

  // Skills
  setSkills: (skills) => set({ skills }),
  addSkill: (skill) => set((state) => ({ skills: Array.from(new Set([...state.skills, skill])) })),
  removeSkill: (skill) => set((state) => ({ skills: state.skills.filter((s) => s !== skill) })),

  // Step 2 unified resume payload
  setResumeData: (resumeData) => set({ resumeData }),

  // ATS
  setAtsScore: (score) => set({ atsScore: score }),
  setAtsResult: ({ score, feedback }) => set({ atsScore: score, atsFeedback: feedback ?? null }),

  // Utilities
  reset: () => set(initialState)
}));

export default useResumeStore;
