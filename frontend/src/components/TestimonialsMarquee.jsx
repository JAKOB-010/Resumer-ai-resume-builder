import React from 'react';

const reviews = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Product Manager',
    text: 'Landed 3 interviews in a week. The AI rewrite feature is basically magic. It turned my boring bullet points into high-impact metrics.',
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Full Stack Engineer',
    text: "Finally, a resume builder that doesn't look like it was made in 2005. The ATS score checker saved my applications.",
  },
  {
    id: 3,
    name: 'Emily Carter',
    role: 'Marketing Director',
    text: 'I was struggling to quantify my impact. This tool extracted the exact data recruiters wanted to see. Best tool out there.',
  },
  {
    id: 4,
    name: 'Marcus Johnson',
    role: 'UX/UI Designer',
    text: 'Sleek, fast, and no hidden paywalls at the end. The generated PDF perfectly parsed into Workday without errors.',
  },
  {
    id: 5,
    name: 'Priya Patel',
    role: 'Data Scientist',
    text: 'The UI is gorgeous. It actually made updating my resume enjoyable. Got my dream role at a fintech startup within a month.',
  },
];

function ReviewCard({ review }) {
  return (
    <article className="w-[min(100vw-2.5rem,20.5rem)] shrink-0 rounded-[2rem] border border-white/10 bg-white/5 px-7 py-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-md sm:w-[22rem] md:w-[24rem]">
      <p className="text-sm leading-relaxed text-white/85 sm:text-[0.9375rem]">&ldquo;{review.text}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gray-500/40 to-gray-400/30 text-xs font-bold text-white">
          {review.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-white">{review.name}</div>
          <div className="text-xs text-gray-400">{review.role}</div>
        </div>
      </div>
    </article>
  );
}

function ReviewRow({ keyPrefix }) {
  return (
    <>
      {reviews.map((review) => (
        <ReviewCard key={`${keyPrefix}-${review.id}`} review={review} />
      ))}
    </>
  );
}

export default function TestimonialsMarquee() {
  return (
    <section className="w-full bg-[#0a0a0a] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="bg-gradient-to-r from-white via-white to-gray-200/90 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl md:text-5xl">
          Career defining results.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-400 sm:text-lg">
          Join thousands of professionals landing roles at top tech companies.
        </p>
      </div>

      {/*
        w-max + two identical rows: each row is as wide as its cards + gaps.
        translate3d(-50%) moves exactly one row width (seamless loop).
        Do NOT use w-[200%]/w-1/2 here — that caps each row to ~100vw and causes overlap.
      */}
      <div className="marquee-edge-fade relative mt-12 w-full overflow-hidden py-2">
        <div className="flex w-max shrink-0 animate-testimonials-marquee will-change-transform [backface-visibility:hidden]">
          <div className="flex shrink-0 items-stretch gap-6 px-3 sm:gap-8 md:px-4">
            <ReviewRow keyPrefix="a" />
          </div>
          <div className="flex shrink-0 items-stretch gap-6 px-3 sm:gap-8 md:px-4" aria-hidden>
            <ReviewRow keyPrefix="b" />
          </div>
        </div>
      </div>
    </section>
  );
}
