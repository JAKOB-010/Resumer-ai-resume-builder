import React, { useState } from 'react';
import useResumeStore from '../store/useResumeStore';

export default function SkillsInput() {
  const skills = useResumeStore((s) => s.skills);
  const addSkill = useResumeStore((s) => s.addSkill);
  const removeSkill = useResumeStore((s) => s.removeSkill);
  const [value, setValue] = useState('');

  const handleAdd = () => {
    const v = value.trim();
    if (!v) return;
    addSkill(v);
    setValue('');
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Skills</h3>
      <div className="mt-2 flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a skill (e.g., React)"
          className="mt-1 block w-full flex-1 rounded-md border border-slate-300 bg-white p-2 text-base text-slate-900 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <button onClick={handleAdd} className="px-3 py-2 bg-gray-300 text-gray-800 rounded-md">Add</button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((s) => (
          <span key={s} className="inline-flex items-center gap-2 bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded-full text-sm">
            <span className="text-sm">{s}</span>
            <button onClick={() => removeSkill(s)} className="text-red-500 text-xs">×</button>
          </span>
        ))}
      </div>
    </div>
  );
}
