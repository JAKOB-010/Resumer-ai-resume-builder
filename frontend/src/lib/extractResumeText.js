import * as pdfjs from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import mammoth from 'mammoth';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

/**
 * Extract plain text from a resume file (PDF via pdfjs-dist, DOCX via mammoth).
 */
export async function extractResumeText(file) {
  if (!file || typeof file.name !== 'string') {
    throw new Error('No file selected.');
  }

  const lower = file.name.toLowerCase();

  if (lower.endsWith('.pdf')) {
    let pdf;
    try {
      const data = new Uint8Array(await file.arrayBuffer());
      const loadingTask = pdfjs.getDocument({ data, stopAtErrors: false });
      pdf = await loadingTask.promise;
    } catch {
      throw new Error('Could not open this PDF. It may be corrupted or password-protected.');
    }

    let text = '';
    try {
      for (let i = 1; i <= pdf.numPages; i += 1) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items
          .map((item) => ('str' in item && typeof item.str === 'string' ? item.str : ''))
          .filter(Boolean);
        text += `${strings.join(' ')}\n`;
      }
    } catch {
      throw new Error('Could not read text from this PDF. Try exporting “text” PDF or use DOCX.');
    }

    const trimmed = text.replace(/\s+/g, ' ').trim();
    if (!trimmed) {
      throw new Error('No readable text found in this PDF (it may be image-only). Try a text-based PDF or DOCX.');
    }
    return trimmed;
  }

  if (lower.endsWith('.docx')) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const { value } = await mammoth.extractRawText({ arrayBuffer });
      const trimmed = (value || '').replace(/\s+/g, ' ').trim();
      if (!trimmed) {
        throw new Error('No readable text found in this DOCX.');
      }
      return trimmed;
    } catch (e) {
      if (e.message && e.message.startsWith('No readable')) throw e;
      throw new Error('Could not read this DOCX. The file may be corrupted.');
    }
  }

  throw new Error('Unsupported file type. Use PDF or DOCX.');
}
