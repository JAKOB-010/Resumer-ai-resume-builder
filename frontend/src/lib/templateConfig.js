/** Templates that do not render a profile photo slot. */
export const TEMPLATES_WITHOUT_PROFILE_PHOTO = [
  'temp1',
  'temp3',
  'temp5',
  'temp6',
  'temp7',
  'temp8',
  'temp9',
  'temp10',
  'temp11',
  'temp12',
  'temp13',
  'temp14',
  'temp15',
];

export function templateSupportsProfilePhoto(templateId) {
  if (!templateId) return true;
  return !TEMPLATES_WITHOUT_PROFILE_PHOTO.includes(templateId);
}

const NAMED_TEMPLATE_LABELS = {
  azurill: 'Template 01',
  bronzong: 'Template 02',
  chikorita: 'Template 03',
  ditto: 'Template 04',
  ditgar: 'Template 04',
  gengar: 'Template 05',
  kakuna: 'Template 06',
  lapras: 'Template 07',
  leafish: 'Template 08',
  pikachu: 'Template 09',
};

/**
 * Human-readable label, e.g. temp15 → "Template 15", azurill → "Template 01".
 */
export function getTemplateDisplayName(templateId) {
  if (!templateId) return 'No template';

  if (NAMED_TEMPLATE_LABELS[templateId]) {
    return NAMED_TEMPLATE_LABELS[templateId];
  }

  const tempMatch = /^temp(\d+)$/i.exec(templateId);
  if (tempMatch) {
    return `Template ${tempMatch[1]}`;
  }

  return templateId.charAt(0).toUpperCase() + templateId.slice(1);
}
