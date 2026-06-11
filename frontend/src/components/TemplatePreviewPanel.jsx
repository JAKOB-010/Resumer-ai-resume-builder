import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getLazyTemplate } from '../lib/templateLoader';
import TemplatePreviewErrorBoundary from './TemplatePreviewErrorBoundary';

const PREVIEW_WIDTH_PX = 794;

export function LoadingSpinner({ label = 'Loading preview…' }) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-8">
      <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
      <p className="text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
}

function MissingTemplateFallback() {
  return (
    <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
      Select a template in Step 1 to preview your resume here.
    </div>
  );
}

function LazyTemplateInner({ templateId, templateData }) {
  const LazyTemplate = useMemo(() => getLazyTemplate(templateId), [templateId]);

  if (!LazyTemplate) {
    return <MissingTemplateFallback />;
  }

  return (
    <TemplatePreviewErrorBoundary resetKey={templateId}>
      <Suspense fallback={<LoadingSpinner />}>
        <LazyTemplate data={templateData} />
      </Suspense>
    </TemplatePreviewErrorBoundary>
  );
}

/**
 * Scaled live preview for the Step 2 right panel.
 */
export function ScaledTemplatePreview({ templateId, templateData }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const padding = 32;
      const available = el.clientWidth - padding;
      setScale(Math.min(1, Math.max(0.28, available / PREVIEW_WIDTH_PX)));
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex h-full w-full justify-center overflow-hidden py-4">
      <div
        className="origin-top"
        style={{
          transform: `scale(${scale})`,
          width: PREVIEW_WIDTH_PX,
        }}
      >
        <div className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-slate-200">
          <LazyTemplateInner templateId={templateId} templateData={templateData} />
        </div>
      </div>
    </div>
  );
}

/**
 * Full-size preview (modal) without scale transform.
 */
export function FullSizeTemplatePreview({ templateId, templateData }) {
  return (
    <div className="mx-auto max-w-[210mm] bg-white shadow-2xl">
      <LazyTemplateInner templateId={templateId} templateData={templateData} />
    </div>
  );
}
