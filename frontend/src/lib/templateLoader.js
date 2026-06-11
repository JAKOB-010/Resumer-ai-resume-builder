import { lazy } from 'react';

/** Step 1 template id → dynamic import (code-split per template). */
const TEMPLATE_IMPORTERS = {
  azurill: () => import('../components/templates/azurill.jsx'),
  bronzong: () => import('../components/templates/bronzong.jsx'),
  chikorita: () => import('../components/templates/chikorita.jsx'),
  ditto: () => import('../components/templates/ditgar.jsx'),
  ditgar: () => import('../components/templates/ditgar.jsx'),
  gengar: () => import('../components/templates/gengar.jsx'),
  kakuna: () => import('../components/templates/kakuna.jsx'),
  lapras: () => import('../components/templates/lapras.jsx'),
  leafish: () => import('../components/templates/leafish.jsx'),
  pikachu: () => import('../components/templates/pikachu.jsx'),
  temp1: () => import('../components/templates/temp1.jsx'),
  temp2: () => import('../components/templates/temp2.jsx'),
  temp3: () => import('../components/templates/temp3.jsx'),
  temp4: () => import('../components/templates/temp4.jsx'),
  temp5: () => import('../components/templates/temp5.jsx'),
  temp6: () => import('../components/templates/temp6.jsx'),
  temp7: () => import('../components/templates/temp7.jsx'),
  temp8: () => import('../components/templates/temp8.jsx'),
  temp9: () => import('../components/templates/temp9.jsx'),
  temp10: () => import('../components/templates/temp10.jsx'),
  temp11: () => import('../components/templates/temp11.jsx'),
  temp12: () => import('../components/templates/temp12.jsx'),
  temp13: () => import('../components/templates/temp13.jsx'),
  temp14: () => import('../components/templates/temp14.jsx'),
  temp15: () => import('../components/templates/temp15.jsx'),
  temp16: () => import('../components/templates/temp16.jsx'),
};

const lazyCache = new Map();

/**
 * Returns a React.lazy component for the template id, or null if unknown.
 */
export function getLazyTemplate(templateId) {
  if (!templateId || typeof templateId !== 'string') return null;

  const key = templateId.trim();
  if (lazyCache.has(key)) return lazyCache.get(key);

  const importer = TEMPLATE_IMPORTERS[key];
  if (!importer) return null;

  const LazyComponent = lazy(importer);
  lazyCache.set(key, LazyComponent);
  return LazyComponent;
}

export const TEMPLATE_IDS = Object.keys(TEMPLATE_IMPORTERS).filter(
  (id, i, arr) => arr.indexOf(id) === i
);
