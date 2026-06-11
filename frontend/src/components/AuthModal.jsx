import { useState } from 'react';
import { X } from 'lucide-react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function AuthModal({ isOpen, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative overflow-hidden w-full max-w-4xl min-h-125 bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-60 rounded-full bg-white/80 p-2 text-gray-600 hover:bg-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Sign-In Form Container (Left Side) */}
        <div
          className={`relative w-full md:w-1/2 h-full flex flex-col items-center justify-center px-6 md:px-12 bg-white transition-all duration-700 ease-in-out ${
            isSignUp ? 'opacity-0 z-0 translate-x-12 md:translate-x-12' : 'opacity-100 z-10 translate-x-0'
          }`}
        >
          <div className="w-full max-w-sm flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h2>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Mobile toggle button */}
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className="md:hidden mb-4 text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Don't have an account? Sign Up
            </button>

            <button
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 mb-6 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-all text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="w-full flex items-center mb-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-xs text-gray-500 uppercase tracking-wider">or sign in with email</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <form onSubmit={handleSignIn} className="w-full">
              <input
                id="signin-email"
                type="email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className="w-full px-4 py-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all text-sm"
                placeholder="Email"
                required
              />
              <input
                id="signin-password"
                type="password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="w-full px-4 py-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all text-sm"
                placeholder="Password"
                required
              />
              <div className="w-full flex justify-end mb-4">
                <button type="button" className="text-xs text-gray-600 hover:underline">Forgot your password?</button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-semibold tracking-wide transition-all text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'SIGN IN'}
              </button>
            </form>
          </div>
        </div>

        {/* Sign-Up Form Container (Right Side) */}
        <div
          className={`relative w-full md:w-1/2 h-full flex flex-col items-center justify-center px-6 md:px-12 bg-white transition-all duration-700 ease-in-out ${
            isSignUp ? 'opacity-100 z-10 translate-x-0' : 'opacity-0 z-0 -translate-x-12 md:-translate-x-12'
          }`}
        >
          <div className="w-full max-w-sm flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Account</h2>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Mobile toggle button */}
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className="md:hidden mb-4 text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Already have an account? Sign In
            </button>

            <button
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 mb-6 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-all text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="w-full flex items-center mb-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-xs text-gray-500 uppercase tracking-wider">or sign up with email</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <form onSubmit={handleSignUp} className="w-full">
              <input
                id="signup-name"
                type="text"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                className="w-full px-4 py-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all text-sm"
                placeholder="Full Name"
                required
              />
              <input
                id="signup-email"
                type="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="w-full px-4 py-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all text-sm"
                placeholder="Email"
                required
              />
              <input
                id="signup-password"
                type="password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="w-full px-4 py-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all text-sm"
                placeholder="Password"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-semibold tracking-wide transition-all text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'SIGN UP'}
              </button>
            </form>
          </div>
        </div>

        {/* Sliding Purple Overlay (Top Layer) */}
        <div
          className={`hidden md:flex absolute top-0 left-1/2 w-1/2 h-full bg-gray-600 text-white z-50 flex-col justify-center items-center px-10 transition-transform duration-700 ease-in-out ${
            isSignUp ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <div className="text-center">
            {isSignUp ? (
              <>
                <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                <p className="mb-6">To keep connected with us please login with your personal info</p>
                <button
                  onClick={() => setIsSignUp(false)}
                  className="px-8 py-2 border-2 border-white rounded-full hover:bg-white hover:text-gray-600 transition-colors"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
                <p className="mb-6">Enter your personal details and start journey with us</p>
                <button
                  onClick={() => setIsSignUp(true)}
                  className="px-8 py-2 border-2 border-white rounded-full hover:bg-white hover:text-gray-600 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
