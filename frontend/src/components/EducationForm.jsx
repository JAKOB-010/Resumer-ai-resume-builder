import React from 'react';
import useResumeStore from '../store/useResumeStore';

export default function EducationForm() {
  const education = useResumeStore((s) => s.education);
  const addEducation = useResumeStore((s) => s.addEducation);
  const updateEducation = useResumeStore((s) => s.updateEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Education</h3>
        <button
          onClick={() => addEducation({ school: '', degree: '', graduationYear: '' })}
          className="text-sm text-gray-600"
        >
          + Add
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {education.map((ed) => (
          <div key={ed.id} className="p-3 border rounded bg-gray-100 dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-3">
              <input
                value={ed.school}
                onChange={(ev) => updateEducation(ed.id, { school: ev.target.value })}
                placeholder="School"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-base text-slate-900 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <input
                value={ed.degree}
                onChange={(ev) => updateEducation(ed.id, { degree: ev.target.value })}
                placeholder="Degree"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-base text-slate-900 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <input
                value={ed.graduationYear}
                onChange={(ev) => updateEducation(ed.id, { graduationYear: ev.target.value })}
                placeholder="Graduation year"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-base text-slate-900 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div className="mt-2 text-right">
              <button onClick={() => removeEducation(ed.id)} className="text-sm text-red-600">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
