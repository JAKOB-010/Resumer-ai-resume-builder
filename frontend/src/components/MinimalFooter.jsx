import React from 'react';

export default function MinimalFooter() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0a0a0a] px-6 py-10 sm:py-12">
      <div className="mx-auto grid max-w-6xl gap-8 text-center md:grid-cols-2 md:items-center md:gap-6 md:text-left">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full bg-gray-400 shadow-[0_0_12px_rgba(156,163,175,0.75)]"
              aria-hidden
            />
            <span className="text-sm font-semibold tracking-tight text-white">Resumer</span>
          </div>
          <p className="text-xs text-gray-500 sm:text-sm">© 2026. All rights reserved.</p>
        </div>

        <p className="text-xs text-gray-500 sm:text-sm md:text-center">
          Built with <span className="text-red-400/90">❤️</span> for job seekers.
        </p>
      </div>
    </footer>
  );
}
