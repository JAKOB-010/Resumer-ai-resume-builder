import React, { useMemo, useState } from 'react';
import useResumeStore from '../store/useResumeStore';
import { storeToTemplateData } from '../lib/resumeDataTransform';
import { FullSizeTemplatePreview } from './TemplatePreviewPanel';

export default function LivePreview({
  template: templateProp,
  showDownloadButtons = true,
  embedded = false,
}) {
  const personalInfo = useResumeStore((s) => s.personalInfo);
  const experience = useResumeStore((s) => s.experience);
  const education = useResumeStore((s) => s.education);
  const skills = useResumeStore((s) => s.skills);
  const resumeDataBlob = useResumeStore((s) => s.resumeData);
  const storeTemplate = useResumeStore((s) => s.selectedTemplate);
  const [pdfLoading, setPdfLoading] = useState(false);

  const activeTemplate = templateProp ?? storeTemplate;

  const resumeData = useMemo(
    () => ({ personalInfo, experience, education, skills, resumeData: resumeDataBlob }),
    [personalInfo, experience, education, skills, resumeDataBlob]
  );

  const templateData = useMemo(() => storeToTemplateData(resumeData), [resumeData]);

  const downloadPdf = async () => {
    const el = document.getElementById('resume-preview');
    if (!el) {
      return;
    }

    setPdfLoading(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const fileName = `${personalInfo.fullName?.trim() || 'resume'}.pdf`;

      await html2pdf()
        .set({
          margin: [0.35, 0.35, 0.35, 0.35],
          filename: fileName,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            scrollX: 0,
            scrollY: 0,
          },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
          pagebreak: { mode: ['css', 'legacy'] },
        })
        .from(el)
        .save();
    } catch (err) {
      window.print();
    } finally {
      setPdfLoading(false);
    }
  };

  const downloadDocx = async () => {
    const el = document.getElementById('resume-preview');
    if (!el) return;
    try {
      const { convertHtmlStringToDocx } = await import('html-to-docx');
      const docxBlob = await convertHtmlStringToDocx({
        html: el.innerHTML,
        orientation: 'portrait',
      });
      const link = document.createElement('a');
      const url = URL.createObjectURL(docxBlob);
      link.href = url;
      link.download = `${personalInfo.fullName?.trim() || 'resume'}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('DOCX export failed. Try downloading PDF instead.');
    }
  };

  const previewPaper = (
    <div
      id="resume-preview"
      className={[
        'bg-white shadow-lg',
        embedded ? 'w-full max-w-none' : 'w-full max-w-3xl rounded-lg border border-gray-200',
      ].join(' ')}
      style={{
        aspectRatio: '8.5 / 11',
        minHeight: embedded ? '480px' : '600px',
      }}
    >
      {activeTemplate ? (
        <FullSizeTemplatePreview templateId={activeTemplate} templateData={templateData} />
      ) : (
        <div className="flex h-full min-h-[400px] items-center justify-center p-8 text-center text-slate-500">
          <p>Select a template in Step 1 to see your live preview.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className={embedded ? 'w-full' : 'flex w-full flex-col items-center'}>
      {showDownloadButtons && (
        <div className={`flex flex-wrap gap-2 ${embedded ? 'mb-4' : 'mb-4 w-full max-w-3xl justify-center'}`}>
          <button
            type="button"
            onClick={downloadPdf}
            disabled={pdfLoading || !activeTemplate}
            className="rounded-lg bg-gray-300 px-4 py-2 text-base font-semibold text-gray-800 hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pdfLoading ? 'Generating PDF…' : 'Download PDF'}
          </button>
          <button
            type="button"
            onClick={downloadDocx}
            disabled={!activeTemplate}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-base font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Download DOCX
          </button>
        </div>
      )}

      {embedded ? (
        <div
          className="w-full overflow-x-hidden overflow-y-auto rounded-lg border border-slate-200 bg-slate-100 p-3 sm:p-4"
          style={{ maxHeight: 'min(75vh, 900px)' }}
        >
          <div className="mx-auto w-full max-w-full [&_#resume-preview]:!min-h-0 [&_#resume-preview]:!w-full [&_#resume-preview]:!max-w-none [&_#resume-container]:!max-w-none">
            {previewPaper}
          </div>
        </div>
      ) : (
        previewPaper
      )}
    </div>
  );
}
