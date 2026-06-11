import { useNavigate } from 'react-router-dom';
import useResumeStore from '../store/useResumeStore';

export default function BuilderStepTwoPlaceholder() {
  const navigate = useNavigate();
  const selectedTemplate = useResumeStore((s) => s.selectedTemplate);

  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <button
        type="button"
        onClick={() => navigate('/resume-builder/step-1')}
        className="mb-6 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        ← Back to Step 1
      </button>

      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Step 2: Resume Details (Coming Next)</h1>
        <p className="mt-3 text-slate-600">
          You selected template:{' '}
          <span className="font-semibold text-gray-700">{selectedTemplate || 'Not selected'}</span>
        </p>
      </div>
    </section>
  );
}
