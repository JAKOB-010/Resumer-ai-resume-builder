import { Loader2, Sparkles } from 'lucide-react';

/**
 * AI rewrite control — disabled when source text is empty.
 */
export default function AiRewriteButton({
  text,
  onClick,
  loading = false,
  className = '',
  label = '✨ Rewrite with AI',
}) {
  const isEmpty = !String(text ?? '').trim();

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || isEmpty}
      title={isEmpty ? 'Type something first to use AI rewrite' : undefined}
      className={`mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto ${className}`}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
      {label}
    </button>
  );
}
