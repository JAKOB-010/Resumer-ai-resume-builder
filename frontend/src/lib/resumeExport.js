/**
 * Resume export utilities — targets the live preview wrapper (#resume-preview).
 */

export async function downloadResumePDF(fileName = 'resume') {
  const element = document.getElementById('resume-preview');
  if (!element) {
    return;
  }

  const html2pdf = (await import('html2pdf.js')).default;

  await html2pdf()
    .set({
      margin: [0.35, 0.35, 0.35, 0.35],
      filename: `${fileName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: true, logging: false },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    })
    .from(element)
    .save();
}

export async function downloadResumeDocx(fileName = 'resume') {
  const element = document.getElementById('resume-preview');
  if (!element) {
    return;
  }

  const { convertHtmlStringToDocx } = await import('html-to-docx');
  const docxBlob = await convertHtmlStringToDocx({
    html: element.innerHTML,
    orientation: 'portrait',
  });

  const link = document.createElement('a');
  const url = URL.createObjectURL(docxBlob);
  link.href = url;
  link.download = `${fileName}.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const exportResume = {
  pdf: (name) => downloadResumePDF(name || 'my-resume'),
  docx: (name) => downloadResumeDocx(name || 'my-resume'),
};
