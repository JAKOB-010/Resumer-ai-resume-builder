export const createEmptyResume = () => ({
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    summary: "",
  },
  experience: [
    {
      id: "1",
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  education: [
    {
      id: "1",
      school: "",
      degree: "",
      graduationYear: "",
    },
  ],
  skills: [],
  atsScore: null,
});

export const requiredPersonalInfoKeys = [
  "fullName",
  "email",
  "phone",
  "linkedin",
  "portfolio",
  "summary",
];
