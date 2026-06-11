import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Eye,
  FileUp,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { ScaledTemplatePreview, FullSizeTemplatePreview } from './TemplatePreviewPanel';
import useResumeStore from '../store/useResumeStore';
import { extractResumeText } from '../lib/extractResumeText';
import AiRewriteButton from './AiRewriteButton';
import {
  fetchSkillSuggestionsWithAI,
  parseResumeTextWithAI,
  rewriteTextWithAI,
} from '../lib/resumeApi';
import {
  getTemplateDisplayName,
  templateSupportsProfilePhoto,
} from '../lib/templateConfig';

const TEMPLATE_OPTIONS = [
  { id: 'azurill', label: 'Template 01', preview: '/azurill-preview.jpg' },
  { id: 'bronzong', label: 'Template 02', preview: '/bronzor-preview.jpg' },
  { id: 'chikorita', label: 'Template 03', preview: '/chikorita-preview.jpg' },
  { id: 'ditto', label: 'Template 04', preview: '/ditgar-preview.jpg' },
  { id: 'gengar', label: 'Template 05', preview: '/gengar-preview.jpg' },
  { id: 'kakuna', label: 'Template 06', preview: '/kakuna-preview.jpg' },
  { id: 'lapras', label: 'Template 07', preview: '/lapras-preview.jpg' },
  { id: 'leafish', label: 'Template 08', preview: '/leafish-preview.jpg' },
  { id: 'pikachu', label: 'Template 09', preview: '/pikachu-preview.jpg' },
  { id: 'temp1', label: 'Template 10', preview: '/temp1.jpg' },
  { id: 'temp2', label: 'Template 11', preview: '/temp2.jpg' },
  { id: 'temp3', label: 'Template 12', preview: '/temp3.jpg' },
  { id: 'temp4', label: 'Template 13', preview: '/temp4.jpg' },
  { id: 'temp5', label: 'Template 14', preview: '/temp5.jpg' },
  { id: 'temp6', label: 'Template 15', preview: '/temp6.jpg' },
  { id: 'temp7', label: 'Template 16', preview: '/temp7.jpg' },
  { id: 'temp8', label: 'Template 17', preview: '/temp8.jpg' },
  { id: 'temp9', label: 'Template 18', preview: '/temp9.jpg' },
  { id: 'temp10', label: 'Template 19', preview: '/temp10.jpg' },
  { id: 'temp11', label: 'Template 20', preview: '/temp11.jpg' },
  { id: 'temp12', label: 'Template 21', preview: '/temp12.jpg' },
  { id: 'temp13', label: 'Template 22', preview: '/temp13.jpg' },
  { id: 'temp14', label: 'Template 23', preview: '/temp14.jpg' },
  { id: 'temp15', label: 'Template 24', preview: '/temp15.jpg' },
  { id: 'temp16', label: 'Template 25', preview: '/temp16.jpg' },
];
import {
  createEmptyCustomSection,
  createEmptyEducation,
  createEmptyExperience,
  normalizeResumeData,
  parsedApiToResumeData,
  resumeDataFromStore,
  resumeDataToTemplateData,
  syncResumeDataToStore,
} from '../lib/resumeBuilderData';

function FloatingField({ label, className = '', ...props }) {
  return (
    <label className={`group relative block ${className}`}>
      <input
        {...props}
        placeholder=" "
        className="peer w-full rounded-xl border border-slate-200 bg-white px-4 pb-2.5 pt-6 text-sm text-slate-900 shadow-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
      />
      <span className="pointer-events-none absolute left-4 top-2 text-xs font-medium text-slate-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-600">
        {label}
      </span>
    </label>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
}

function FullPreviewModal({ open, onClose, templateId, templateData }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex flex-col bg-slate-900/90 backdrop-blur-sm">
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-slate-900/80 px-6 py-4">
        <h2 className="text-lg font-semibold text-white">Full Preview</h2>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
        >
          <X className="h-4 w-4" />
          Close
        </button>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <FullSizeTemplatePreview templateId={templateId} templateData={templateData} />
      </div>
    </div>
  );
}

export default function ResumeBuilderStepTwo() {
  const navigate = useNavigate();
  const selectedTemplate = useResumeStore((s) => s.selectedTemplate);
  const storedResumeData = useResumeStore((s) => s.resumeData);

  const [entryMode, setEntryMode] = useState('manual');
  const [resumeData, setResumeData] = useState(() =>
    normalizeResumeData(resumeDataFromStore(useResumeStore.getState()))
  );
  const [fullPreviewOpen, setFullPreviewOpen] = useState(false);
  const [additionalOpen, setAdditionalOpen] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [hobbyInput, setHobbyInput] = useState('');
  const [aiRewriteLoading, setAiRewriteLoading] = useState(false);
  const [aiRewriteJobId, setAiRewriteJobId] = useState(null);
  const [aiSkillsLoading, setAiSkillsLoading] = useState(false);
  const [uploadParsing, setUploadParsing] = useState(false);
  const [apiError, setApiError] = useState('');
  const [aiSkillSuggestions, setAiSkillSuggestions] = useState([]);
  const [showAiSkillSuggestions, setShowAiSkillSuggestions] = useState(false);
  const resumeFileInputRef = useRef(null);

  useEffect(() => {
    if (!selectedTemplate) {
      navigate('/resume-builder/step-1', { replace: true });
    }
  }, [selectedTemplate, navigate]);

  useEffect(() => {
    if (storedResumeData) {
      setResumeData(normalizeResumeData(storedResumeData));
    }
  }, [storedResumeData]);

  const safeResumeData = useMemo(() => normalizeResumeData(resumeData), [resumeData]);
  const templateData = useMemo(() => resumeDataToTemplateData(safeResumeData), [safeResumeData]);

  const primaryJobTitle = safeResumeData.experience?.[0]?.jobTitle || '';
  const currentTemplateInfo = TEMPLATE_OPTIONS.find(t => t.id === selectedTemplate);
  const templateLabel = currentTemplateInfo ? currentTemplateInfo.label : 'Unknown Template';
  const showProfileUpload = templateSupportsProfilePhoto(selectedTemplate);

  const patchResumeData = useCallback((updater) => {
    setResumeData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      return normalizeResumeData(next);
    });
  }, []);

  const patchPersonalInfo = (field, value) => {
    patchResumeData((prev) => ({
      ...prev,
      personalInfo: { ...(prev.personalInfo || {}), [field]: value },
    }));
  };

  const handleAiRewrite = async (text, onApply) => {
    const trimmed = String(text ?? '').trim();
    if (!trimmed) return;

    setApiError('');
    setAiRewriteLoading(true);
    try {
      const { text: rewritten } = await rewriteTextWithAI(trimmed);
      onApply(rewritten);
    } catch (err) {
      setApiError(err.message || 'Failed to rewrite text.');
    } finally {
      setAiRewriteLoading(false);
      setAiRewriteJobId(null);
    }
  };

  const handleAiRewriteSummary = () =>
    handleAiRewrite(safeResumeData.summary, (rewritten) => patchResumeData({ summary: rewritten }));

  const handleAiRewriteJobDescription = (jobId, description) => {
    setAiRewriteJobId(jobId);
    handleAiRewrite(description, (rewritten) =>
      patchResumeData((prev) => ({
        ...prev,
        experience: prev.experience.map((x) =>
          x.id === jobId ? { ...x, description: rewritten } : x
        ),
      }))
    );
  };

  const fetchAiSkillSuggestions = async () => {
    setApiError('');
    setAiSkillsLoading(true);
    try {
      const { skills } = await fetchSkillSuggestionsWithAI({
        summary: safeResumeData.summary,
        skills: safeResumeData.skills,
        jobTitle: primaryJobTitle,
        experience: safeResumeData.experience.map((e) => ({
          role: e.jobTitle,
          company: e.company,
        })),
      });
      setAiSkillSuggestions(skills || []);
      setShowAiSkillSuggestions(true);
      return skills;
    } catch (err) {
      setApiError(err.message || 'Failed to load skill suggestions.');
    } finally {
      setAiSkillsLoading(false);
    }
  };

  const onProfileDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => patchPersonalInfo('profilePicture', reader.result);
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onProfileDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
    multiple: false,
    disabled: !showProfileUpload,
  });

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    patchResumeData((prev) => ({
      ...prev,
      skills: prev.skills.includes(trimmed) ? prev.skills : [...prev.skills, trimmed],
    }));
    setSkillInput('');
  };

  const addHobby = () => {
    const trimmed = hobbyInput.trim();
    if (!trimmed) return;
    patchResumeData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.includes(trimmed) ? prev.hobbies : [...prev.hobbies, trimmed],
    }));
    setHobbyInput('');
  };

  const handleContinue = () => {
    try {
      if (!safeResumeData) {
        alert('Please fill in at least your personal information before continuing.');
        return;
      }
      syncResumeDataToStore(safeResumeData, useResumeStore.getState());
      navigate('/resume-builder/step-3', { state: { resumeData: safeResumeData } });
    } catch (error) {
      alert('An error occurred while navigating. Please try again.');
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    setEntryMode('upload');
    setApiError('');
    setUploadParsing(true);

    try {
      const resumeText = await extractResumeText(file);
      const parsed = await parseResumeTextWithAI(resumeText);
      const merged = parsedApiToResumeData(parsed);
      setResumeData(merged);
    } catch (err) {
      setApiError(err.message || 'Could not parse resume. Try PDF or DOCX.');
    } finally {
      setUploadParsing(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4.5rem)] flex-col bg-slate-50">
      {/* Top action bar */}
      <div className="shrink-0 border-b border-slate-200 bg-white px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-400">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-600">Step 2</p>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Build your resume</h1>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
            <span className="text-gray-600">Currently Editing:</span>
            {templateLabel}
          </div>

          {apiError && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {apiError}
            </div>
          )}

          {uploadParsing && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-800">
              <Loader2 className="h-4 w-4 animate-spin" />
              Parsing your resume with AI…
            </div>
          )}

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setEntryMode('upload');
                resumeFileInputRef.current?.click();
              }}
              className={`group flex items-start gap-4 rounded-2xl border p-4 text-left shadow-sm transition ${
                entryMode === 'upload'
                  ? 'border-gray-300 bg-gray-100/80 ring-2 ring-gray-200'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                <Upload className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900">Upload from Resume</span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  Import a PDF or DOCX to auto-fill your form
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setEntryMode('manual')}
              className={`group flex items-start gap-4 rounded-2xl border p-4 text-left shadow-sm transition ${
                entryMode === 'manual'
                  ? 'border-gray-300 bg-gray-100/80 ring-2 ring-gray-200'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Pencil className="h-5 w-5" />
              </span>
              <span>
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  Start Manually
                  <span className="rounded-full bg-gray-300 px-2 py-0.5 text-[10px] font-bold uppercase text-gray-800">
                    Default
                  </span>
                </span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  Enter your details in the form — preview updates live
                </span>
              </span>
            </button>
          </div>

          <input
            ref={resumeFileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleResumeUpload}
          />
        </div>
      </div>

      {/* Split screen */}
      <div className="mx-auto flex w-full max-w-400 flex-1 flex-col lg:flex-row lg:overflow-hidden">
        {/* Left: form */}
        <div className="w-full shrink-0 overflow-y-auto border-r border-slate-200 bg-white lg:w-[40%] lg:max-h-[calc(100vh-4.5rem-88px)]">
          <div className="space-y-8 p-5 sm:p-6">
            {/* Personal */}
            <section className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
              <SectionHeading title="Personal Details" subtitle="How employers will reach you" />

              {showProfileUpload ? (
                <div
                  {...getRootProps()}
                  className={`mb-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-4 transition ${
                    isDragActive
                      ? 'border-gray-400 bg-gray-100'
                      : 'border-slate-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <input {...getInputProps()} />
                  {safeResumeData.personalInfo.profilePicture ? (
                    <img
                      src={safeResumeData.personalInfo.profilePicture}
                      alt="Profile"
                      className="h-24 w-24 rounded-full object-cover ring-4 ring-gray-100"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <FileUp className="h-8 w-8" />
                    </div>
                  )}
                  <p className="mt-2 text-xs font-medium text-slate-600">
                    {isDragActive ? 'Drop photo here' : 'Drag & drop or click to upload photo'}
                  </p>
                </div>
              ) : (
                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-100/80 px-4 py-3">
                  <FileUp className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                  <p className="text-sm text-slate-600">
                    Profile picture is not available for this specific template.
                  </p>
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <FloatingField
                  label="First Name"
                  value={safeResumeData.personalInfo.firstName}
                  onChange={(e) => patchPersonalInfo('firstName', e.target.value)}
                />
                <FloatingField
                  label="Last Name"
                  value={safeResumeData.personalInfo.lastName}
                  onChange={(e) => patchPersonalInfo('lastName', e.target.value)}
                />
                <FloatingField
                  label="Email Address"
                  type="email"
                  value={safeResumeData.personalInfo.email}
                  onChange={(e) => patchPersonalInfo('email', e.target.value)}
                />
                <FloatingField
                  label="Phone Number"
                  type="tel"
                  value={safeResumeData.personalInfo.phone}
                  onChange={(e) => patchPersonalInfo('phone', e.target.value)}
                />
                <FloatingField
                  label="City"
                  value={safeResumeData.personalInfo.city}
                  onChange={(e) => patchPersonalInfo('city', e.target.value)}
                />
                <FloatingField
                  label="Country"
                  value={safeResumeData.personalInfo.country}
                  onChange={(e) => patchPersonalInfo('country', e.target.value)}
                />
              </div>
            </section>

            {/* Summary */}
            <section className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
              <SectionHeading title="Professional Summary" />
              <textarea
                rows={4}
                value={safeResumeData.summary}
                onChange={(e) => patchResumeData({ summary: e.target.value })}
                placeholder="Write a compelling summary of your experience and goals…"
                className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              />
              <AiRewriteButton
                text={safeResumeData.summary}
                loading={aiRewriteLoading && !aiRewriteJobId}
                onClick={handleAiRewriteSummary}
              />
            </section>

            {/* Experience */}
            <section className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
              <SectionHeading title="Work Experience" />
              <AnimatePresence initial={false}>
                {safeResumeData.experience.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Role {index + 1}
                      </span>
                      {safeResumeData.experience.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            patchResumeData((prev) => ({
                              ...prev,
                              experience: prev.experience.filter((e) => e.id !== job.id),
                            }))
                          }
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                          aria-label="Remove experience"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <FloatingField
                        label="Job Title"
                        value={job.jobTitle}
                        onChange={(e) =>
                          patchResumeData((prev) => ({
                            ...prev,
                            experience: prev.experience.map((x) =>
                              x.id === job.id ? { ...x, jobTitle: e.target.value } : x
                            ),
                          }))
                        }
                      />
                      <FloatingField
                        label="Company"
                        value={job.company}
                        onChange={(e) =>
                          patchResumeData((prev) => ({
                            ...prev,
                            experience: prev.experience.map((x) =>
                              x.id === job.id ? { ...x, company: e.target.value } : x
                            ),
                          }))
                        }
                      />
                      <FloatingField
                        label="Start Date"
                        type="month"
                        value={job.startDate}
                        onChange={(e) =>
                          patchResumeData((prev) => ({
                            ...prev,
                            experience: prev.experience.map((x) =>
                              x.id === job.id ? { ...x, startDate: e.target.value } : x
                            ),
                          }))
                        }
                      />
                      <div>
                        <FloatingField
                          label="End Date"
                          type="month"
                          value={job.endDate}
                          disabled={job.isPresent}
                          onChange={(e) =>
                            patchResumeData((prev) => ({
                              ...prev,
                              experience: prev.experience.map((x) =>
                                x.id === job.id ? { ...x, endDate: e.target.value } : x
                              ),
                            }))
                          }
                        />
                        <label className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                          <input
                            type="checkbox"
                            checked={job.isPresent}
                            onChange={(e) =>
                              patchResumeData((prev) => ({
                                ...prev,
                                experience: prev.experience.map((x) =>
                                  x.id === job.id
                                    ? { ...x, isPresent: e.target.checked, endDate: e.target.checked ? '' : x.endDate }
                                    : x
                                ),
                              }))
                            }
                            className="rounded border-slate-300 text-gray-600 focus:ring-gray-500"
                          />
                          Present
                        </label>
                      </div>
                    </div>
                    <textarea
                      rows={3}
                      value={job.description}
                      onChange={(e) =>
                        patchResumeData((prev) => ({
                          ...prev,
                          experience: prev.experience.map((x) =>
                            x.id === job.id ? { ...x, description: e.target.value } : x
                          ),
                        }))
                      }
                      placeholder="Describe your impact and responsibilities…"
                      className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                    />
                    <AiRewriteButton
                      text={job.description}
                      loading={aiRewriteLoading && aiRewriteJobId === job.id}
                      onClick={() => handleAiRewriteJobDescription(job.id, job.description)}
                      className="mt-2"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
              <button
                type="button"
                onClick={() =>
                  patchResumeData((prev) => ({
                    ...prev,
                    experience: [...prev.experience, createEmptyExperience()],
                  }))
                }
                className="inline-flex items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-100/50 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray2100"
              >
                <Plus className="h-4 w-4" />
                Add Experience
              </button>
            </section>

            {/* Education */}
            <section className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
              <SectionHeading title="Education" />
              <AnimatePresence initial={false}>
                {safeResumeData.education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Education {index + 1}
                      </span>
                      {safeResumeData.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            patchResumeData((prev) => ({
                              ...prev,
                              education: prev.education.filter((e) => e.id !== edu.id),
                            }))
                          }
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                          aria-label="Remove education"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <FloatingField
                        label="Degree"
                        value={edu.degree}
                        onChange={(e) =>
                          patchResumeData((prev) => ({
                            ...prev,
                            education: prev.education.map((x) =>
                              x.id === edu.id ? { ...x, degree: e.target.value } : x
                            ),
                          }))
                        }
                      />
                      <FloatingField
                        label="School / University"
                        value={edu.school}
                        onChange={(e) =>
                          patchResumeData((prev) => ({
                            ...prev,
                            education: prev.education.map((x) =>
                              x.id === edu.id ? { ...x, school: e.target.value } : x
                            ),
                          }))
                        }
                      />
                      <FloatingField
                        label="Start Date"
                        type="month"
                        value={edu.startDate}
                        onChange={(e) =>
                          patchResumeData((prev) => ({
                            ...prev,
                            education: prev.education.map((x) =>
                              x.id === edu.id ? { ...x, startDate: e.target.value } : x
                            ),
                          }))
                        }
                      />
                      <FloatingField
                        label="Graduation / End"
                        type="month"
                        value={edu.endDate}
                        onChange={(e) =>
                          patchResumeData((prev) => ({
                            ...prev,
                            education: prev.education.map((x) =>
                              x.id === edu.id ? { ...x, endDate: e.target.value } : x
                            ),
                          }))
                        }
                      />
                      <FloatingField
                        label="Location"
                        className="sm:col-span-2"
                        value={edu.location}
                        onChange={(e) =>
                          patchResumeData((prev) => ({
                            ...prev,
                            education: prev.education.map((x) =>
                              x.id === edu.id ? { ...x, location: e.target.value } : x
                            ),
                          }))
                        }
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <button
                type="button"
                onClick={() =>
                  patchResumeData((prev) => ({
                    ...prev,
                    education: [...prev.education, createEmptyEducation()],
                  }))
                }
                className="inline-flex items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-100/50 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray2100"
              >
                <Plus className="h-4 w-4" />
                Add Education
              </button>
            </section>

            {/* Skills */}
            <section className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
              <SectionHeading title="Skills" />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(skillInput);
                    }
                  }}
                  placeholder="Type a skill and press Enter"
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                />
                <button
                  type="button"
                  onClick={() => addSkill(skillInput)}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Add
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {safeResumeData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() =>
                        patchResumeData((prev) => ({
                          ...prev,
                          skills: prev.skills.filter((s) => s !== skill),
                        }))
                      }
                      className="rounded-full p-0.5 hover:bg-gray-200"
                      aria-label={`Remove ${skill}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={fetchAiSkillSuggestions}
                disabled={aiSkillsLoading}
                className="mt-3 inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100 disabled:opacity-60"
              >
                {aiSkillsLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span>💡</span>
                )}
                AI Suggestions
              </button>
              <AnimatePresence>
                {showAiSkillSuggestions && aiSkillSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mt-3 flex flex-wrap gap-2 rounded-xl border border-amber-100 bg-white p-3"
                  >
                    {aiSkillSuggestions.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => addSkill(skill)}
                        className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900 hover:bg-amber-100"
                      >
                        + {skill}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* Additional */}
            <section className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
              <button
                type="button"
                onClick={() => setAdditionalOpen((o) => !o)}
                className="flex w-full items-start justify-between gap-3 text-left"
              >
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-slate-900">Additional Sections</h2>
                  <p className="mt-0.5 text-sm text-slate-500">Optional links, hobbies & custom blocks</p>
                </div>
                <ChevronDown
                  className={`mt-1 h-5 w-5 shrink-0 text-slate-500 transition ${additionalOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {additionalOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-4 border-t border-slate-200 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Website & Social
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {(['website', 'linkedin', 'github', 'twitter']).map((key) => (
                          <FloatingField
                            key={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            type="url"
                            value={safeResumeData.links[key]}
                            onChange={(e) =>
                              patchResumeData((prev) => ({
                                ...prev,
                                links: { ...prev.links, [key]: e.target.value },
                              }))
                            }
                          />
                        ))}
                      </div>

                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Hobbies</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={hobbyInput}
                          onChange={(e) => setHobbyInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addHobby();
                            }
                          }}
                          placeholder="Add a hobby"
                          className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                        />
                        <button
                          type="button"
                          onClick={addHobby}
                          className="rounded-xl border border-slate-200 px-3 text-sm font-medium hover:bg-slate-50"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {safeResumeData.hobbies.map((hobby) => (
                          <span
                            key={hobby}
                            className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-800"
                          >
                            {hobby}
                            <button
                              type="button"
                              onClick={() =>
                                patchResumeData((prev) => ({
                                  ...prev,
                                  hobbies: prev.hobbies.filter((h) => h !== hobby),
                                }))
                              }
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>

                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Custom Sections
                      </p>
                      {safeResumeData.customSections.map((section) => (
                        <div
                          key={section.id}
                          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                        >
                          <div className="mb-2 flex justify-end">
                            <button
                              type="button"
                              onClick={() =>
                                patchResumeData((prev) => ({
                                  ...prev,
                                  customSections: prev.customSections.filter((s) => s.id !== section.id),
                                }))
                              }
                              className="text-slate-400 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <FloatingField
                            label="Section Title"
                            value={section.title}
                            onChange={(e) =>
                              patchResumeData((prev) => ({
                                ...prev,
                                customSections: prev.customSections.map((s) =>
                                  s.id === section.id ? { ...s, title: e.target.value } : s
                                ),
                              }))
                            }
                            className="mb-3"
                          />
                          <textarea
                            rows={3}
                            value={section.content}
                            onChange={(e) =>
                              patchResumeData((prev) => ({
                                ...prev,
                                customSections: prev.customSections.map((s) =>
                                  s.id === section.id ? { ...s, content: e.target.value } : s
                                ),
                              }))
                            }
                            placeholder="Section content…"
                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          patchResumeData((prev) => ({
                            ...prev,
                            customSections: [...prev.customSections, createEmptyCustomSection()],
                          }))
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        <Plus className="h-4 w-4" />
                        Add Custom Section
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            <div className="h-20 lg:hidden" />
          </div>
        </div>

        {/* Right: preview */}
        <div className="relative flex w-full flex-col bg-slate-100 lg:w-[60%] lg:max-h-[calc(100vh-4.5rem-88px)]">
          <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-100/95 px-4 py-3 backdrop-blur">
            <div>
              <div className="mb-1 inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-gray-700">
                {templateLabel}
              </div>
              <h2 className="text-sm font-semibold text-slate-800">Live Preview</h2>
              <p className="text-xs text-slate-500">Updates as you type</p>
            </div>
            <button
              type="button"
              onClick={() => setFullPreviewOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              <Eye className="h-4 w-4 text-gray-600" />
              Full Preview
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <ScaledTemplatePreview templateId={selectedTemplate} templateData={templateData} />
          </div>
        </div>
      </div>

      <FullPreviewModal
        open={fullPreviewOpen}
        onClose={() => setFullPreviewOpen(false)}
        templateId={selectedTemplate}
        templateData={templateData}
      />

      {/* Sticky footer */}
      <footer className="sticky bottom-0 z-20 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-400 items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('/resume-builder/step-1')}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex items-center gap-2 rounded-xl bg-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-800 shadow-lg shadow-gray-200 transition hover:bg-gray-300"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
