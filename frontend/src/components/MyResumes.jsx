import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Plus, Download, Edit2, Loader2, Trash2 } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { FullSizeTemplatePreview } from './TemplatePreviewPanel';
import {
  normalizeResumeData,
  resumeDataToTemplateData,
} from '../lib/resumeBuilderData';

export default function MyResumes() {
  const navigate = useNavigate();
  const [savedResumes, setSavedResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  const handleDownloadPDF = async (resume) => {
    const element = document.getElementById(`print-container-${resume.id}`);
    if (!element) {
      alert('Error: Resume preview not found.');
      return;
    }

    try {
      setDownloadingId(resume.id);

      // Convert the HTML element to a high-quality PNG
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true
      });

      // Create PDF and add the image
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (element.offsetHeight * imgWidth) / element.offsetWidth;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Generate filename
      const pi = resume.resumeData?.personalInfo || {};
      const fullName =
        pi.fullName?.trim() ||
        [pi.firstName, pi.lastName].filter(Boolean).join(' ').trim() ||
        'My';
      const sanitizedName = fullName.replace(/[^\w\s-]/g, '').replace(/\s+/g, '_') || 'My';

      pdf.save(`${sanitizedName}.pdf`);
    } catch (error) {
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDelete = async (resumeId) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'resumes', resumeId));
      setSavedResumes(prev => prev.filter(r => r.id !== resumeId));
    } catch (error) {
      alert('Failed to delete resume. Please try again.');
    }
  };

  useEffect(() => {
    const fetchResumes = async () => {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'resumes'),
          where('userId', '==', auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const resumes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSavedResumes(resumes);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return 'Unknown date';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Resumes</h1>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
          </div>
        ) : savedResumes.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <FileText className="h-12 w-12 text-gray-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No resumes found</h2>
            <p className="text-gray-600 text-center mb-8 max-w-md">
              Create your first ATS-friendly resume today and stand out from the crowd!
            </p>
            <button
              onClick={() => navigate('/resume-builder/step-1')}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Create Your First Resume
            </button>
          </div>
        ) : (
          /* Resume Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedResumes.map((resume) => (
              <div
                key={resume.id}
                className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-gray-400"
              >
                {/* Card Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center shadow-lg shadow-gray-200">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 truncate group-hover:text-gray-700 transition-colors">
                      {resume.title || 'My ATS Resume'}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Created {formatDate(resume.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      navigate('/resume-builder/step-1', { state: { resumeData: resume.resumeData, templateId: resume.templateId } });
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all duration-200 text-sm font-semibold shadow-md shadow-gray-200 hover:shadow-lg hover:shadow-gray-300"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDownloadPDF(resume)}
                    disabled={downloadingId === resume.id}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {downloadingId === resume.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    {downloadingId === resume.id ? 'Downloading...' : 'Download'}
                  </button>
                  <button
                    onClick={() => handleDelete(resume.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-200 text-sm font-semibold"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Off-Screen Preview for PDF Generation */}
                <div style={{ position: 'absolute', top: '-10000px', left: '-10000px', width: '210mm' }}>
                  <div id={`print-container-${resume.id}`} className="bg-white">
                    <FullSizeTemplatePreview
                      templateId={resume.templateId || 'azurill'}
                      templateData={resumeDataToTemplateData(normalizeResumeData(resume.resumeData || {}))}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
