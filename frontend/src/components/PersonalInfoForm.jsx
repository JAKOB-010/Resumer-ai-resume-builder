import React, { useEffect, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import useResumeStore from '../store/useResumeStore';

export default function PersonalInfoForm() {
  const personalInfo = useResumeStore((s) => s.personalInfo);
  const setPersonalInfo = useResumeStore((s) => s.setPersonalInfo);

  const { register, watch, reset, getValues } = useForm({ defaultValues: personalInfo, mode: 'onChange' });
  const isMountedRef = useRef(false);
  const isSettingFromStoreRef = useRef(false);
  const lastFormValuesRef = useRef(personalInfo);
  const fileInputRef = useRef(null);

  // Mark component as mounted after first render
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // sync store -> form when store changes externally (e.g., from file upload or other sources)
  // Don't reset if we just updated the store
  useEffect(() => {
    if (!isSettingFromStoreRef.current && isMountedRef.current) {
      reset(personalInfo);
      lastFormValuesRef.current = personalInfo;
    }
    isSettingFromStoreRef.current = false;
  }, [personalInfo, reset]);

  // live-sync form -> store as user types
  useEffect(() => {
    // Only set up the subscription after component is mounted
    if (!isMountedRef.current) return;

    const subscription = watch((values) => {
      if (!values || !Object.keys(values).length) return;

      // Only update store if values actually changed from the last time
      // and we're not in the middle of a store update
      if (!isSettingFromStoreRef.current) {
        const lastValues = lastFormValuesRef.current;
        const hasChanged =
          JSON.stringify(values.fullName) !== JSON.stringify(lastValues.fullName) ||
          JSON.stringify(values.email) !== JSON.stringify(lastValues.email) ||
          JSON.stringify(values.phone) !== JSON.stringify(lastValues.phone) ||
          JSON.stringify(values.linkedin) !== JSON.stringify(lastValues.linkedin) ||
          JSON.stringify(values.portfolio) !== JSON.stringify(lastValues.portfolio) ||
          JSON.stringify(values.summary) !== JSON.stringify(lastValues.summary);

        if (hasChanged) {
          lastFormValuesRef.current = values;
          isSettingFromStoreRef.current = true;
          setPersonalInfo(values);
          // Reset the flag after a microtask to ensure store update is processed
          Promise.resolve().then(() => {
            isSettingFromStoreRef.current = false;
          });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setPersonalInfo]);

  // Handle photo upload
  const handlePhotoUpload = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Convert to Base64 Data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const photoUrl = e.target?.result;
      if (photoUrl) {
        isSettingFromStoreRef.current = true;
        setPersonalInfo({ photoUrl });
        Promise.resolve().then(() => {
          isSettingFromStoreRef.current = false;
        });
      }
    };
    reader.readAsDataURL(file);
  }, [setPersonalInfo]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      {/* Photo Upload */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-gray-700">Profile Photo</label>
        <div className="flex items-center gap-4">
          {personalInfo.photoUrl && (
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-500 shadow-sm">
              <img
                src={personalInfo.photoUrl}
                alt="Profile preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="inline-flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 hover:bg-gray-50 transition-colors cursor-pointer bg-white"
            >
              <span className="text-sm font-medium text-gray-600">
                {personalInfo.photoUrl ? 'Change Photo' : 'Upload Photo'}
              </span>
            </label>
            {personalInfo.photoUrl && (
              <button
                type="button"
                onClick={() => {
                  isSettingFromStoreRef.current = true;
                  setPersonalInfo({ photoUrl: '' });
                  Promise.resolve().then(() => {
                    isSettingFromStoreRef.current = false;
                  });
                }}
                className="ml-2 text-xs text-red-600 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        <input
          {...register('fullName')}
          placeholder=" "
          aria-label="Full name"
          className="peer w-full rounded-lg border border-slate-300 bg-white p-2 text-base text-slate-900 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <label className="absolute left-3 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs">Full name</label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="relative">
          <input
            {...register('email')}
            type="email"
            placeholder=" "
            aria-label="Email"
            className="peer w-full rounded-lg border border-slate-300 bg-white p-2 text-base text-slate-900 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <label className="absolute left-3 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs">Email</label>
        </div>

        <div className="relative">
          <input
            {...register('phone')}
            placeholder=" "
            aria-label="Phone"
            className="peer w-full rounded-lg border border-slate-300 bg-white p-2 text-base text-slate-900 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <label className="absolute left-3 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs">Phone</label>
        </div>
      </div>

      <div className="relative">
        <input
          {...register('linkedin')}
          placeholder=" "
          aria-label="LinkedIn"
          className="peer w-full rounded-lg border border-slate-300 bg-white p-2 text-base text-slate-900 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <label className="absolute left-3 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs">LinkedIn</label>
      </div>

      <div className="relative">
        <input
          {...register('portfolio')}
          placeholder=" "
          aria-label="Portfolio"
          className="peer w-full rounded-lg border border-slate-300 bg-white p-2 text-base text-slate-900 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <label className="absolute left-3 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs">Portfolio</label>
      </div>

      <div className="relative">
        <textarea
          {...register('summary')}
          placeholder=" "
          rows={4}
          aria-label="Professional summary"
          className="peer w-full rounded-lg border border-slate-300 bg-white p-2 text-base text-slate-900 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <label className="absolute left-3 top-3 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs">Professional summary</label>
      </div>
    </form>
  );
}
