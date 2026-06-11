/**
 * Template registry — use getLazyTemplate from lib/templateLoader for previews.
 * Avoid eager imports here to prevent loading all 25 templates at once.
 */
export { getLazyTemplate, TEMPLATE_IDS } from '../../lib/templateLoader';
