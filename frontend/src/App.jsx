import React, { useState, useEffect, useRef } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Home from './components/Home';
import ATSChecker from './components/ATSChecker';
import TemplateSelectionStep from './components/TemplateSelectionStep';
import ResumeBuilderStepTwo from './components/ResumeBuilderStepTwo';
import ResumeBuilderStepThree from './components/ResumeBuilderStepThree';
import AuthModal from './components/AuthModal';
import MyResumes from './components/MyResumes';
import { User, ChevronDown, FileText, Target, Layout, BookOpen, Star, LogOut, AlertCircle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">An error occurred while loading this page.</p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Trap focus in the mobile menu and handle Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const el = menuRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const prevFocused = document.activeElement;
    if (first && first.focus) first.focus();

    function onKey(e) {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }
      if (e.key === 'Tab') {
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (prevFocused && prevFocused.focus) prevFocused.focus();
    };
  }, [mobileOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setProfileDropdownOpen(false);
      navigate('/');
    } catch (error) {
    }
  };

  const handleNavigate = (path) => {
    setProfileDropdownOpen(false);
    navigate(path);
  };

  const handleScrollTo = (id) => {
    setProfileDropdownOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex h-16 md:h-18 items-center justify-between">
            {/* Left: logo */}
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-gray-100">
                <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L22 12L12 22L2 12Z" fill="currentColor" />
                </svg>
              </div>
              <div className="text-xl font-extrabold tracking-tight text-slate-900">RESUMER</div>
            </div>

            {/* Right: actions */}
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu" title="Toggle menu" className="lg:hidden p-2 rounded-md border bg-white text-gray-600">
                {mobileOpen ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
                )}
              </button>

              {!user ? (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-black text-white text-xs sm:text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  Get Started
                </button>
              ) : (
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-sm font-semibold">
                        {getInitials(user.displayName || user.email)}
                      </div>
                    )}
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-60">
                      <button
                        onClick={() => handleNavigate('/my-resumes')}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                      >
                        <FileText className="w-4 h-4" />
                        My Resumes
                      </button>
                      <button
                        onClick={() => handleNavigate('/ats-checker')}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                      >
                        <Target className="w-4 h-4" />
                        ATS Checker
                      </button>
                      <button
                        onClick={() => handleNavigate('/resume-builder/step-1')}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                      >
                        <Layout className="w-4 h-4" />
                        Build Resume
                      </button>
                      <button
                        onClick={() => handleScrollTo('guide')}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                      >
                        <BookOpen className="w-4 h-4" />
                        Guide
                      </button>
                      <button
                        onClick={() => handleScrollTo('reviews')}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                      >
                        <Star className="w-4 h-4" />
                        Reviews
                      </button>
                      <div className="border-t border-gray-200 my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-3"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-60">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200" ref={menuRef}>
            <div className="p-4">
              {!user ? (
                <button
                  onClick={() => { setMobileOpen(false); setAuthModalOpen(true); }}
                  className="w-full px-4 py-3 bg-gray-300 text-gray-800 rounded-lg text-sm font-semibold"
                >
                  Get Started
                </button>
              ) : (
                <div className="space-y-1">
                  <button
                    onClick={() => { setMobileOpen(false); handleNavigate('/my-resumes'); }}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-gray-100 rounded-lg flex items-center gap-3"
                  >
                    <FileText className="w-4 h-4" />
                    My Resumes
                  </button>
                  <button
                    onClick={() => { setMobileOpen(false); handleNavigate('/ats-checker'); }}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-gray-100 rounded-lg flex items-center gap-3"
                  >
                    <Target className="w-4 h-4" />
                    ATS Checker
                  </button>
                  <button
                    onClick={() => { setMobileOpen(false); handleNavigate('/resume-builder/step-1'); }}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-gray-100 rounded-lg flex items-center gap-3"
                  >
                    <Layout className="w-4 h-4" />
                    Build Resume
                  </button>
                  <button
                    onClick={() => { setMobileOpen(false); handleLogout(); }}
                    className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-gray-100 rounded-lg flex items-center gap-3"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="w-full">
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onCreate={() => navigate('/resume-builder/step-1')}
                  onCheckATS={() => navigate('/ats-checker')}
                />
              }
            />
            <Route path="/resume-builder/step-1" element={<TemplateSelectionStep />} />
            <Route path="/resume-builder/step-2" element={<ResumeBuilderStepTwo />} />
            <Route path="/resume-builder/step-3" element={<ResumeBuilderStepThree />} />
            <Route path="/ats-checker" element={<ATSChecker onBack={() => navigate('/')} />} />
            <Route path="/my-resumes" element={<MyResumes />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </main>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
}

export default App;
