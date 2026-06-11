import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUpload, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { extractResumeText } from '../lib/extractResumeText';

const ANALYZE_URL = '/api/analyze';

const ACCEPT = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
};

const MAX_BYTES = 2 * 1024 * 1024;

function clamp(n, min, max) {
  const x = Number(n);
  if (Number.isNaN(x)) return min;
  return Math.min(max, Math.max(min, x));
}

function MockScoreGauge({ score }) {
  const s = clamp(score, 0, 100);
  const r = 52;
  const cx = 60;
  const cy = 60;
  const circumference = Math.PI * r;
  const offset = circumference * (1 - s / 100);

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-28 w-44">
        <svg className="h-full w-full" viewBox="0 0 120 80" aria-hidden>
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="rgb(226 232 240)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <motion.path
            key={s}
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            stroke="url(#gaugeGradAts)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          />
          <defs>
            <linearGradient id="gaugeGradAts" x1="0" y1="0" x2="120" y2="0">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-1">
          <span className="text-4xl font-extrabold tracking-tight text-emerald-600">{s}</span>
          <span className="text-sm font-semibold text-slate-500">/ 100</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-700">Resume score</p>
    </div>
  );
}

function MockProgressBar({ label, value, tone }) {
  const v = clamp(value, 0, 100);
  const bar =
    tone === 'emerald'
      ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
      : 'bg-gradient-to-r from-gray-600 to-gray-800';

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-600">
        <span>{label}</span>
        <span className="text-slate-900">{v}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200/80">
        <motion.div
          key={`${label}-${v}`}
          className={`h-full rounded-full ${bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${v}%` }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
        />
      </div>
    </div>
  );
}

function ResultsPreviewCard({ live }) {
  const isLive = live && typeof live.score === 'number' && !live.error;
  const score = isLive ? live.score : 92;
  const m = live?.metrics || {};
  const ats = isLive ? clamp(m.atsParseRate, 0, 100) : 98;
  const fmt = isLive ? clamp(m.formatAndBrevity, 0, 100) : 84;
  const imp = isLive ? clamp(m.impactMetrics, 0, 100) : 70;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
      className="rounded-3xl border border-white bg-white/80 p-6 shadow-2xl shadow-indigo-900/10 backdrop-blur-md sm:p-8"
    >
      <div className="mb-6 flex items-center justify-between border-b border-slate-200/80 pb-4">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-600">Preview</span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            isLive ? 'bg-gray-50 text-gray-700' : 'bg-emerald-50 text-emerald-700'
          }`}
        >
          {isLive ? 'Your results' : 'Sample results'}
        </span>
      </div>

      <MockScoreGauge score={score} />

      {isLive && live.summary && (
        <p className="mt-4 text-center text-sm text-slate-600">{live.summary}</p>
      )}

      <div className="mt-8 space-y-5">
        <MockProgressBar label="ATS parse rate" value={ats} tone="emerald" />
        <MockProgressBar label="Format & brevity" value={fmt} tone="violet" />
        <MockProgressBar label="Impact metrics" value={imp} tone="indigo" />
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        {isLive ? 'Scores from your latest AI check.' : 'Upload and run a check to see your real scores here.'}
      </p>
    </motion.div>
  );
}

export default function ATSChecker({ onBack }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [rejectMsg, setRejectMsg] = useState(null);
  const [livePreview, setLivePreview] = useState(null);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    setRejectMsg(null);
    setResult(null);
    setLivePreview(null);
    if (fileRejections?.length) {
      const r = fileRejections[0];
      const err = r.errors[0];
      if (err?.code === 'file-too-large') {
        setRejectMsg('File is larger than 2MB. Please use a smaller file.');
      } else if (err?.code === 'file-invalid-type') {
        setRejectMsg('Only PDF and DOCX files are allowed.');
      } else {
        setRejectMsg(err?.message || 'File was rejected.');
      }
      setFile(null);
      return;
    }
    if (acceptedFiles?.[0]) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: ACCEPT,
    maxSize: MAX_BYTES,
    multiple: false,
    noClick: true,
    noKeyboard: true,
  });

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setRejectMsg(null);
    setLivePreview(null);

    try {
      let resumeText;
      try {
        resumeText = await extractResumeText(file);
      } catch (extractErr) {
        const msg = extractErr?.message || 'Could not read the file.';
        setResult({ error: msg });
        return;
      }

      const res = await fetch(ANALYZE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        throw new Error('Server returned an invalid response (not JSON).');
      }

      if (!res.ok) {
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      if (data.error) {
        throw new Error(typeof data.error === 'string' ? data.error : 'Analysis failed.');
      }

      const normalized = {
        score: clamp(data.score, 0, 100),
        suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
        metrics: {
          atsParseRate: clamp(data.metrics?.atsParseRate, 0, 100),
          formatAndBrevity: clamp(data.metrics?.formatAndBrevity, 0, 100),
          impactMetrics: clamp(data.metrics?.impactMetrics, 0, 100),
        },
        summary: typeof data.summary === 'string' ? data.summary : '',
      };

      setLivePreview(normalized);
      setResult({ ok: true, ...normalized });
    } catch (err) {
      const msg =
        err?.message ||
        (err?.name === 'TypeError' && String(err.message).includes('fetch')
          ? 'Cannot reach the server. Start the backend on port 3000 and check CORS.'
          : 'Analysis failed.');
      setResult({ error: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] w-full bg-linear-to-br from-gray-50 via-white to-gray-100 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-black"
        >
          <span aria-hidden>←</span> Back to home
        </button>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-600">Resume checker</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Is your resume good enough?
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
              A free and fast AI resume checker doing 20+ crucial checks to ensure your resume is ready to get you
              interview callbacks.
            </p>

            <div className="mt-10">
              <div
                {...getRootProps()}
                className={[
                  'rounded-2xl border-2 border-dashed bg-white/70 p-8 text-center transition-colors sm:p-10',
                  isDragActive ? 'border-gray-500 bg-gray-50/80' : 'border-gray-300',
                ].join(' ')}
              >
                <input {...getInputProps()} />

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-200 text-gray-600">
                  <CloudUpload className="h-7 w-7" strokeWidth={1.75} aria-hidden />
                </div>

                <p className="mt-5 text-base font-semibold text-slate-900 sm:text-lg">
                  {isDragActive ? 'Drop your resume here' : 'Drop your resume here or choose a file'}
                </p>
                <p className="mt-2 text-sm text-slate-500">PDF &amp; DOCX only. Max 2MB file size.</p>

                {file && (
                  <p className="mt-4 text-sm font-medium text-gray-700">
                    Selected: <span className="text-slate-900">{file.name}</span> ({Math.round(file.size / 1024)} KB)
                  </p>
                )}

                {rejectMsg && <p className="mt-4 text-sm font-medium text-red-600">{rejectMsg}</p>}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    open();
                  }}
                  className="mt-8 w-full max-w-full sm:max-w-sm rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-500/25 transition hover:bg-gray-800 sm:text-base"
                >
                  Upload your resume
                </button>

                {file && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      analyze();
                    }}
                    disabled={loading}
                    className="mt-3 w-full max-w-full sm:max-w-sm rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60 sm:text-base"
                  >
                    {loading ? 'Analyzing…' : 'Run AI check'}
                  </button>
                )}

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <Lock className="h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={2} aria-hidden />
                  <span>Privacy guaranteed</span>
                </div>
              </div>
            </div>

            {result && (
              <div className="mt-8 rounded-2xl border border-gray-100 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
                {result.error ? (
                  <p className="text-sm font-medium text-red-600">Error: {result.error}</p>
                ) : (
                  <div className="space-y-3">
                    <p className="text-lg font-bold text-gray-900">
                      ATS score: <span className="text-gray-600">{result.score ?? '—'}</span>
                    </p>
                    {result.summary && <p className="text-sm text-slate-600">{result.summary}</p>}
                    {Array.isArray(result.suggestions) && result.suggestions.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800">Suggestions</h4>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                          {result.suggestions.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-linear-to-br from-gray-200/40 via-gray-100/30 to-transparent blur-2xl"
            />
            <div className="relative w-full max-w-full sm:max-w-md">
              <ResultsPreviewCard live={livePreview} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
