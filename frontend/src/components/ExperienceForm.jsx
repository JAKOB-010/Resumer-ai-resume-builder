import React from 'react';
import useResumeStore from '../store/useResumeStore';

export default function ExperienceForm() {
  const experience = useResumeStore((s) => s.experience);
  const addExperience = useResumeStore((s) => s.addExperience);
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Experience</h3>
        <button
          onClick={() => addExperience({ company: '', role: '', startDate: '', endDate: '', description: '' })}
          className="text-sm text-gray-600"
        >
          + Add
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {experience.map((e) => (
          <div key={e.id} className="p-3 border rounded bg-gray-100 dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                value={e.company}
                onChange={(ev) => updateExperience(e.id, { company: ev.target.value })}
                placeholder="Company"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-base text-slate-900 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <input
                value={e.role}
                onChange={(ev) => updateExperience(e.id, { role: ev.target.value })}
                placeholder="Role"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-base text-slate-900 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <input
                value={e.startDate}
                onChange={(ev) => updateExperience(e.id, { startDate: ev.target.value })}
                placeholder="Start date"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-base text-slate-900 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <input
                value={e.endDate}
                onChange={(ev) => updateExperience(e.id, { endDate: ev.target.value })}
                placeholder="End date"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-base text-slate-900 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <textarea
              value={e.description}
              onChange={(ev) => updateExperience(e.id, { description: ev.target.value })}
              placeholder="Description"
              className="mt-2 block w-full rounded-md border border-slate-300 bg-white p-2 text-base text-slate-900 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
              rows={3}
            />

            <div className="mt-2 text-right">
              <button onClick={() => removeExperience(e.id)} className="text-sm text-red-600">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
