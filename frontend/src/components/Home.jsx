import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoMarquee from './LogoMarquee';
import HowItWorksSticky from './HowItWorksSticky';
import TestimonialsMarquee from './TestimonialsMarquee';
import MinimalFooter from './MinimalFooter';
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

export default function Home({ onCreate, onCheckATS }) {
  const navigate = useNavigate();
  const setSelectedTemplate = useResumeStore((s) => s.setSelectedTemplate);
  const visibleTemplates = TEMPLATE_OPTIONS.slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-12 sm:pb-18 text-center">
          <div className="mb-5 sm:mb-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-700 bg-white">
              <span className="text-xs tracking-tight">⭐⭐⭐⭐⭐</span>
              <span className="mx-1 text-slate-300">|</span>
              <span>4.5 rating</span>
              <span className="mx-1 text-slate-300">★</span>
              <span className="font-semibold">Trustpilot</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
            <div>Build your ATS Resume</div>
            <div className="text-gray-700">in just 2 minutes for FREE!</div>
          </h1>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">20+ ATS-friendly templates trusted by recruiters</p>

          <p className="mt-4 sm:mt-5 text-2xl sm:text-3xl font-bold text-slate-900">Land 8x more interviews</p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onCreate}
              className="w-full sm:w-auto max-w-full px-6 sm:px-8 py-3 bg-gray-200 text-gray-800 rounded-xl shadow-md hover:bg-gray-300 font-semibold text-sm sm:text-base"
            >
              Create New Resume
            </button>

            <button
              onClick={onCheckATS}
              className="w-full sm:w-auto max-w-full px-4 sm:px-6 py-3 bg-gray-200 border border-gray-300 text-gray-700 rounded-xl shadow-sm hover:bg-gray-300 font-semibold text-sm sm:text-base"
            >
              Check Resume ATS Score
            </button>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-5">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Get started with a template</h3>
          <button onClick={() => navigate('/resume-builder/step-1')} className="text-gray-600 font-semibold text-base sm:text-lg hover:text-gray-800 transition-colors self-start sm:self-auto">See All ›</button>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex gap-3 sm:gap-4 overflow-x-auto py-3 sm:py-4 -mx-4 sm:mx-0 px-4 sm:px-0">
            {visibleTemplates.map((t) => (
              <div 
                key={t.id} 
                onClick={() => {
                  setSelectedTemplate(t.id);
                  navigate('/resume-builder/step-1');
                }}
                className="min-w-50 sm:min-w-64 bg-white border border-slate-300 rounded-xl p-2 shadow-[0_2px_8px_rgba(2,6,23,0.06)] cursor-pointer hover:border-gray-400 transition-colors shrink-0"
              >
                <img
                  src={t.preview}
                  alt={`${t.label} template preview`}
                  className="h-44 sm:h-56 w-full object-cover object-top bg-slate-100"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="mt-2 sm:mt-3 flex items-center justify-between px-1">
                  <div className="text-xs sm:text-sm font-medium text-slate-700">{t.label}</div>
                  <button className="text-xs sm:text-sm text-gray-600 font-semibold">Preview</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LogoMarquee />
      <div id="guide">
        <HowItWorksSticky />
      </div>
      <div id="reviews">
        <TestimonialsMarquee />
      </div>
      <MinimalFooter />
    </div>
  );
}
