import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useResumeStore from '../store/useResumeStore';

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

export default function TemplateSelectionStep() {
  const navigate = useNavigate();
  const location = useLocation();
  const setSelectedTemplate = useResumeStore((s) => s.setSelectedTemplate);
  const selectedTemplate = useResumeStore((s) => s.selectedTemplate);
  const [showAll, setShowAll] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // Restore templateId from location state if editing a saved resume
  useEffect(() => {
    if (location.state?.templateId && !selectedTemplate) {
      setSelectedTemplate(location.state.templateId);
    }
  }, [location.state?.templateId, selectedTemplate, setSelectedTemplate]);

  const visibleTemplates = useMemo(
    () => (showAll ? TEMPLATE_OPTIONS : TEMPLATE_OPTIONS.slice(0, 4)),
    [showAll]
  );

  const handleSelectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
    navigate('/resume-builder/step-2');
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          ← Back
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Step 1: Select Template</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visibleTemplates.map((template) => (
          <article
            key={template.id}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <img
              src={template.preview}
              alt={`${template.label} template preview`}
              className="h-56 w-full object-cover object-top bg-slate-100"
            />
            <div className="space-y-3 p-4">
              <p className="text-sm font-semibold text-slate-800">{template.label}</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(template)}
                  className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Full View
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectTemplate(template.id)}
                  className="flex-1 rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-300"
                >
                  Select
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!showAll && TEMPLATE_OPTIONS.length > 4 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="rounded-lg border border-gray-200 bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray2100"
          >
            See All Templates
          </button>
        </div>
      )}

      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative h-full w-full max-w-6xl overflow-auto rounded-xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">{previewTemplate.label} Full View</h2>
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
            <img
              src={previewTemplate.preview}
              alt={`${previewTemplate.label} full preview`}
              className="mx-auto max-h-[78vh] w-auto rounded-lg border border-slate-200 object-contain"
            />
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => handleSelectTemplate(previewTemplate.id)}
                className="rounded-md bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-300"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
