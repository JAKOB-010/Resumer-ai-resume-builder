import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, Loader2, Target, Save } from 'lucide-react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { FullSizeTemplatePreview } from './TemplatePreviewPanel';
import useResumeStore from '../store/useResumeStore';
import { fetchAtsScore } from '../lib/resumeApi';
import {
  normalizeResumeData,
  resumeDataFromStore,
  resumeDataToTemplateData,
} from '../lib/resumeBuilderData';
import { getTemplateDisplayName } from '../lib/templateConfig';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

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

function clamp(n, min, max) {
  const x = Number(n);
  if (Number.isNaN(x)) return min;
  return Math.min(max, Math.max(min, x));
}

function scoreTone(score) {
  if (score >= 80) return 'emerald';
  if (score >= 50) return 'amber';
  return 'red';
}

function AtsScoreRing({ score, feedback }) {
  const s = clamp(score, 0, 100);
  const tone = scoreTone(s);
  const r = 56;
  const cx = 64;
  const cy = 64;
  const circumference = Math.PI * r;
  const offset = circumference * (1 - s / 100);

  const stroke =
    tone === 'emerald' ? '#10b981' : tone === 'amber' ? '#f59e0b' : '#ef4444';
  const text =
    tone === 'emerald' ? 'text-emerald-600' : tone === 'amber' ? 'text-amber-600' : 'text-red-600';
  const bg =
    tone === 'emerald' ? 'bg-emerald-50 border-emerald-200' : tone === 'amber' ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200';

  return (
    <div className={`mt-6 rounded-2xl border p-6 ${bg}`}>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-8">
        <div className="relative h-32 w-36 shrink-0">
          <svg className="h-full w-full" viewBox="0 0 128 88" aria-hidden>
            <path
              d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
              fill="none"
              stroke="rgb(226 232 240)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <motion.path
              key={s}
              d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
              fill="none"
              stroke={stroke}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            />
          </svg>
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-1">
            <span className={`text-4xl font-extrabold tracking-tight ${text}`}>{s}</span>
            <span className="text-sm font-semibold text-slate-500">/ 100</span>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <p className={`text-lg font-bold ${text}`}>ATS Compatibility Score</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{feedback}</p>
          <p className="mt-2 text-xs text-slate-500">
            {s >= 80 ? 'Strong ATS readiness' : s >= 50 ? 'Room for improvement' : 'Needs significant optimization'}
          </p>
        </div>
      </div>
    </div>
  );
}

function PdfIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8 12h8v1.5H8V12zm0 3h8v1.5H8V15zm0 3h5.5V19.5H8V18z" />
    </svg>
  );
}

function WordIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 2h8l6 6v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V9h5.5L14 3.5zM8 12h2.2l1.1 3.4L12.4 12H14.5l-2 5.5h-1.4L8 12zm5.8 0h1.5v5.5h-1.5V12z" />
    </svg>
  );
}

export default function ResumeBuilderStepThree() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTemplate = useResumeStore((s) => s.selectedTemplate);
  const storedResumeData = useResumeStore((s) => s.resumeData);
  const setAtsResult = useResumeStore((s) => s.setAtsResult);
  const personalInfo = useResumeStore((s) => s.personalInfo);

  // Massive safety net to prevent undefined rendering errors
  const locationResumeData = location.state?.resumeData || {
    personalInfo: { firstName: '', lastName: '', email: '', phone: '', summary: '' },
    experience: [],
    education: [],
    skills: [],
    projects: []
  };

  const previewRef = useRef(null);
  const [atsLoading, setAtsLoading] = useState(false);
  const [atsError, setAtsError] = useState('');
  const [downloadError, setDownloadError] = useState('');
  const [atsResult, setAtsResultLocal] = useState(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const resumeData = useMemo(() => {
    try {
      if (locationResumeData && Object.keys(locationResumeData).length > 0) {
        return normalizeResumeData(locationResumeData);
      }
      if (storedResumeData) return normalizeResumeData(storedResumeData);
      return normalizeResumeData(resumeDataFromStore(useResumeStore.getState()));
    } catch (error) {
      return {
        personalInfo: { firstName: '', lastName: '', email: '', phone: '', summary: '' },
        experience: [],
        education: [],
        skills: [],
        projects: []
      };
    }
  }, [storedResumeData, locationResumeData]);

  const templateData = useMemo(() => {
    try {
      return resumeDataToTemplateData(resumeData);
    } catch (error) {
      return {};
    }
  }, [resumeData]);
  const currentTemplate = TEMPLATE_OPTIONS.find(t => t.id === selectedTemplate);
  const templateName = currentTemplate ? currentTemplate.label : 'Selected Template';
  const templateLabel = currentTemplate ? currentTemplate.label : 'Resume';

  const exportFileBase = useMemo(() => {
    try {
      const pi = resumeData?.personalInfo || {};
      const fullName =
        pi?.fullName?.trim() ||
        [pi?.firstName, pi?.lastName].filter(Boolean).join(' ').trim() ||
        'My';
      return (fullName || 'My').replace(/[^\w\s-]/g, '').replace(/\s+/g, '_') || 'My';
    } catch (error) {
      return 'My';
    }
  }, [resumeData]);

  useEffect(() => {
    if (!selectedTemplate) {
      navigate('/resume-builder/step-1', { replace: true });
    }
  }, [selectedTemplate, navigate]);

  const handleRunAts = async () => {
    setAtsError('');
    setAtsLoading(true);
    try {
      const result = await fetchAtsScore(resumeData || {});
      setAtsResultLocal(result);
      setAtsResult({ score: result.score, feedback: result.feedback });
    } catch (err) {
      setAtsError(err.message || 'ATS scoring failed.');
    } finally {
      setAtsLoading(false);
    }
  };

  const handleBackToEdit = () => navigate('/resume-builder/step-2');
  const handleHome = () => navigate('/');

  const saveResumeToDatabase = async () => {
    if (!auth.currentUser) {
      alert('Please sign in to save your resume to your account.');
      return;
    }

    try {
      setIsSaving(true);
      const resumePayload = {
        userId: auth.currentUser?.uid || '',
        resumeData: resumeData || {},
        templateId: selectedTemplate || '',
        title: `${exportFileBase.replace(/_/g, ' ')} Resume`,
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'resumes'), resumePayload);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      alert('Failed to save resume. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    try {
      setIsDownloadingPdf(true);
      const element = previewRef.current;

      if (!element) {
        throw new Error('Preview element not found');
      }

      // Convert the HTML element to a high-quality PNG
      // html-to-image handles modern CSS and oklch much better than html2canvas
      const dataUrl = await toPng(element, { 
        quality: 1.0, 
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        useCORS: true,      // CRITICAL: Allows profile pictures to render
        allowTaint: true    // CRITICAL: Fallback for tainted canvases
      });

      // Calculate dimensions to fit A4 paper perfectly
      const pdf = new jsPDF({ format: 'a4', unit: 'px' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (element.offsetHeight * pdfWidth) / element.offsetWidth;

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Silent, direct download
      // AGENT: The correct path is personalInfo.fullName from the store (not normalized data)
      const rawName = personalInfo?.fullName || "";

      // 1. Check if the name exists and is a string
      let finalFileName = "Resume";

      if (typeof rawName === 'string' && rawName.trim() !== '') {
        // 2. Grab just the first name (everything before the first space)
        const firstName = rawName.split(' ')[0];
        
        // 3. Strip out any weird characters just in case
        const sanitizedName = firstName.replace(/[^a-zA-Z0-9]/g, "").trim();
        
        // 4. Update the final variable if we have a valid string left
        if (sanitizedName) {
          finalFileName = sanitizedName;
        }
      }

      // 5. Trigger the download with the verified name
      pdf.save(`${finalFileName}.pdf`);
    } catch (error) {
      alert("Failed to generate PDF. Please ensure all images are loaded.");
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <>
      <style>
        {`
          @media print {
            /* Hide EVERYTHING in the body by default */
            body * {
              visibility: hidden;
            }

            /* Only make the resume container and its children visible */
            #printable-resume-container, #printable-resume-container * {
              visibility: visible;
            }

            /* Move the resume to the absolute top left of the page to remove web margins */
            #printable-resume-container {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0 !important;
              padding: 0 !important;
            }

            /* Force exact background colors to render */
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            @page {
              margin: 0; /* Strip browser headers and footers */
            }
          }
        `}
      </style>
      <section className="min-h-[calc(100vh-4.5rem)] bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">Step 3</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">Final Review & Download</h1>
        <p className="mt-2 text-slate-600">
          Template: <span className="font-semibold text-gray-700">{templateName}</span>
        </p>

        {/* ATS */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm no-print">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">ATS Analysis</h2>
              <p className="mt-1 text-sm text-slate-500">
                Score how well your resume may pass applicant tracking systems.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRunAts}
              disabled={atsLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-300 px-6 py-3 text-sm font-semibold text-gray-800 shadow-lg shadow-gray-200 transition hover:bg-gray-400 disabled:opacity-60"
            >
              {atsLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Target className="h-5 w-5" />
              )}
              Run ATS Score
            </button>
          </div>

          {atsError && (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {atsError}
            </p>
          )}

          {atsResult && (
            <AtsScoreRing score={atsResult.score} feedback={atsResult.feedback} />
          )}
        </div>

        {downloadError && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {downloadError}
          </p>
        )}

        {/* Downloads */}
        <div className="mt-6 no-print">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isDownloadingPdf || !selectedTemplate}
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-red-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDownloadingPdf ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <PdfIcon className="h-5 w-5" />
              )}
              Download as PDF
            </button>
            <button
              type="button"
              onClick={saveResumeToDatabase}
              disabled={isSaving || !selectedTemplate}
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gray-300 px-6 py-4 text-base font-semibold text-gray-800 shadow-lg shadow-gray-200 transition hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Save className="h-5 w-5" />
              )}
              Save to Account
            </button>
            {saveSuccess && (
              <p className="text-center text-sm text-green-600">Resume saved successfully!</p>
            )}
          </div>
        </div>

        {/* Final preview */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Your Resume</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-100 p-6 shadow-inner">
            <div
              ref={previewRef}
              id="printable-resume-container"
              className="mx-auto bg-white shadow-2xl ring-1 ring-slate-200"
              style={{ width: '210mm', minHeight: '297mm' }}
            >
              {selectedTemplate ? (
                <FullSizeTemplatePreview templateId={selectedTemplate} templateData={templateData} />
              ) : (
                <p className="p-12 text-center text-slate-500">No template selected.</p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:justify-between no-print">
          <button
            type="button"
            onClick={handleBackToEdit}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Edit
          </button>
          <button
            type="button"
            onClick={handleHome}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
          >
            <Home className="h-4 w-4" />
            Home
          </button>
        </div>
      </div>
    </section>
    </>
  );
}
