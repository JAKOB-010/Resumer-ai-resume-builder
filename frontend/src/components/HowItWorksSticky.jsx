import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';

function GlowBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full bg-gray-500/20 blur-3xl" />
      <div className="absolute -right-32 top-10 h-80 w-80 rounded-full bg-gray-400/20 blur-3xl" />
      <div className="absolute left-1/2 top-[55%] h-72 w-72 -translate-x-1/2 rounded-full bg-gray-300/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(255,255,255,0.10),transparent)]" />
    </div>
  );
}

function GlassCard({ children }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.9)] backdrop-blur-xl">
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_60%)]" />
      <div className="relative p-6 sm:p-7 md:p-8">{children}</div>
    </div>
  );
}

function TemplateStackVisual() {
  return (
    <div className="relative h-[340px] sm:h-[380px]">
      <div className="absolute left-1/2 top-1/2 h-[260px] w-[220px] -translate-x-1/2 -translate-y-1/2 rotate-[-10deg] rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl shadow-black/60" />
      <div className="absolute left-1/2 top-1/2 h-[260px] w-[220px] -translate-x-[52%] -translate-y-[52%] rotate-[-5deg] rounded-2xl border border-white/10 bg-gradient-to-br from-white/12 to-white/5 shadow-2xl shadow-black/60" />

      <motion.div
        initial={{ x: -6, y: -10, rotate: -2, opacity: 0.95 }}
        animate={{ x: 18, y: -16, rotate: 2, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute left-1/2 top-1/2 h-[260px] w-[220px] -translate-x-[45%] -translate-y-[54%] rounded-2xl border border-gray-400/30 bg-gradient-to-br from-white/14 to-white/5 shadow-2xl shadow-gray-900/40"
      >
        <div className="p-4">
          <div className="h-3 w-24 rounded bg-white/30" />
          <div className="mt-5 space-y-2">
            <div className="h-2 w-full rounded bg-white/20" />
            <div className="h-2 w-11/12 rounded bg-white/18" />
            <div className="h-2 w-10/12 rounded bg-white/18" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="h-16 rounded-lg bg-white/10" />
            <div className="h-16 rounded-lg bg-white/10" />
          </div>
        </div>
        <div aria-hidden className="absolute -inset-1 rounded-2xl bg-gray-500/20 blur-xl" />
      </motion.div>
    </div>
  );
}

function TypingDetailsVisual() {
  return (
    <div className="relative h-[340px] sm:h-[380px]">
      <div className="mx-auto h-full max-w-[420px]">
        <div className="grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-white/60">
              Personal info
            </div>
            <div className="h-10 rounded-xl border border-white/10 bg-black/20 px-3" />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-white/60">
              Experience
            </div>
            <div className="space-y-2">
              <div className="h-10 rounded-xl border border-white/10 bg-gray-800/20" />
              <div className="h-10 rounded-xl border border-white/10 bg-gray-800/20" />
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-white/60">
              Completion
            </div>
            <div className="text-xs font-semibold text-white/70">68%</div>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: '18%' }}
              animate={{ width: '68%' }}
              transition={{ duration: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-orange-300 to-amber-400"
            />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ x: 0, y: 0, opacity: 0 }}
        animate={{ x: 130, y: 78, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="pointer-events-none absolute left-10 top-12"
      >
        <div className="h-6 w-6 rotate-45 rounded-md bg-gradient-to-br from-orange-300 to-amber-400 shadow-[0_10px_30px_rgba(245,158,11,0.35)]" />
      </motion.div>
    </div>
  );
}

function AiRewriteVisual() {
  return (
    <div className="relative h-[340px] sm:h-[380px]">
      <div className="mx-auto h-full max-w-[460px]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-white/60">
              Bullet rewrite
            </div>
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-300/90" />
              AI
            </motion.div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-gray-800/25 p-4 text-sm text-white/70">
              Did marketing stuff
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="relative rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-4 text-sm text-white"
            >
              <div aria-hidden className="absolute -right-2 -top-2 h-10 w-10 rounded-full bg-emerald-400/25 blur-xl" />
              <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold text-emerald-200">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-300" />
                Improved
              </div>
              Spearheaded Q3 marketing campaigns, driving a 24% increase in ROI.
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AtsScoreVisual() {
  return (
    <div className="relative h-[340px] sm:h-[380px]">
      <div className="mx-auto flex h-full max-w-[460px] flex-col items-center justify-center gap-6">
        <div className="relative grid place-items-center">
          <svg width="170" height="170" viewBox="0 0 120 120" className="block">
            <circle cx="60" cy="60" r="44" stroke="rgba(255,255,255,0.10)" strokeWidth="10" fill="none" />
            <motion.circle
              cx="60"
              cy="60"
              r="44"
              stroke="url(#atsGrad)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 44}
              initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
              animate={{ strokeDashoffset: (2 * Math.PI * 44) * (1 - 0.98) }}
              transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
              transform="rotate(-90 60 60)"
            />
            <defs>
              <linearGradient id="atsGrad" x1="0" y1="0" x2="120" y2="0">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="60%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-white/60">
                ATS Score
              </div>
              <div className="mt-1 text-4xl font-extrabold tracking-tight text-white">98</div>
              <div className="text-sm font-semibold text-white/60">/ 100</div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="relative w-full"
        >
          <div className="mx-auto w-full max-w-[360px] rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-white/60">
                Export
              </div>
              <div className="text-xs font-semibold text-white/70">PDF</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/10" />
              <div className="flex-1">
                <div className="h-2 w-2/3 rounded bg-white/15" />
                <div className="mt-2 h-2 w-1/2 rounded bg-white/10" />
              </div>
            </div>
          </div>
          <motion.div
            initial={{ x: -10, y: 18, opacity: 0 }}
            animate={{ x: 22, y: -2, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          >
            <div className="h-36 w-28 rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl shadow-black/60" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

const STEP_CONTENT = [
  {
    id: 'template',
    num: '01',
    title: 'Select a Template',
    subtitle: 'Start with an ATS-optimized foundation designed by top recruiters.',
    visual: TemplateStackVisual,
  },
  {
    id: 'details',
    num: '02',
    title: 'Update Details',
    subtitle: 'Seamlessly input your experience or let our smart-fill do the heavy lifting.',
    visual: TypingDetailsVisual,
  },
  {
    id: 'ai',
    num: '03',
    title: 'Get AI Suggestions',
    subtitle: 'Watch our AI instantly rewrite your bullets to highlight impact and metrics.',
    visual: AiRewriteVisual,
  },
  {
    id: 'download',
    num: '04',
    title: 'Download & Dominate',
    subtitle: 'Export your pixel-perfect, ATS-friendly PDF and start applying.',
    visual: AtsScoreVisual,
  },
];

function StepItem({ step, isActive, onActiveChange, isLast }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { amount: 0.5, margin: '-10% 0px -40% 0px' });

  useEffect(() => {
    if (inView) onActiveChange(step.id);
  }, [inView, onActiveChange, step.id]);

  return (
    <div ref={ref} className={isLast ? 'py-16 pb-28 sm:py-20 sm:pb-36' : 'py-16 sm:py-20'}>
      <div className="flex items-start gap-4">
        <div
          className={[
            'mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-extrabold',
            isActive
              ? 'border-gray-400/40 bg-white/5 text-white shadow-[0_0_0_6px_rgba(156,163,175,0.12)]'
              : 'border-white/10 bg-white/0 text-white/70',
          ].join(' ')}
        >
          {step.num}
        </div>
        <div>
          <h3
            className={[
              'text-2xl font-extrabold tracking-tight sm:text-3xl',
              isActive ? 'text-white' : 'text-white/85',
            ].join(' ')}
          >
            {step.title}
          </h3>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
            {step.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksSticky() {
  const steps = useMemo(() => STEP_CONTENT, []);
  const [active, setActive] = useState(steps[0]?.id ?? 'template');

  const activeStep = steps.find((s) => s.id === active) ?? steps[0];
  const ActiveVisual = activeStep.visual;

  return (
    <section className="relative w-full bg-[#0a0a0a]">
      <GlowBackdrop />

      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wide text-white/70">
            How it works
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Build an offer-ready resume with AI — in minutes.
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-white/65">
            Scroll through the steps. The preview updates as you go.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            {steps.map((step, idx) => (
              <StepItem
                key={step.id}
                step={step}
                isActive={step.id === active}
                onActiveChange={setActive}
                isLast={idx === steps.length - 1}
              />
            ))}
            <div aria-hidden className="h-10 md:h-20" />
          </div>

          <div className="md:sticky md:top-24 md:self-start">
            <GlassCard>
              <div className="mb-5 flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wide text-white/55">
                  Preview
                </div>
                <div className="text-xs font-semibold text-white/60">
                  Step {activeStep.num}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                  transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <ActiveVisual />
                </motion.div>
              </AnimatePresence>
            </GlassCard>

            <div className="mt-6 hidden items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/70 md:flex">
              <div className="font-semibold text-white/85">{activeStep.title}</div>
              <div className="text-white/55">Scroll to continue</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

