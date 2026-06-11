import React from 'react';

const Lapras = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];

  return (
    <div 
      className="w-full bg-white flex flex-col select-none text-slate-800 font-sans tracking-normal leading-relaxed p-10 gap-6"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto' }}
    >
      
      {/* =========================================================================
          HEADER SECTION: Bordered Container
          ========================================================================= */}
      <div className="border border-slate-300 rounded-2xl p-6 flex flex-row items-center gap-6 bg-white">
        {personalInfo.image && (
          <img 
            src={personalInfo.image} 
            alt={personalInfo.fullName || "Profile"} 
            className="w-24 h-24 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
          />
        )}
        
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mt-1">
              {personalInfo.title || "Professional Title"}
            </p>
          </div>

          {/* Horizontal Wrapped Contact Items List */}
          <div className="flex flex-row flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-600">
            {personalInfo.email && (
              <span className="flex items-center gap-1.5">
                <span className="text-slate-400">✉</span> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                <span className="text-slate-400">📞</span> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5">
                <span className="text-slate-400">📍</span> {personalInfo.location}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1.5">
                <span className="text-slate-400">🌐</span> {personalInfo.website}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN SECTIONS: Using Fieldset/Legend to match Lapras's Intersecting Headings
          ========================================================================= */}
      
      {/* Summary Profile Block */}
      {summary && (
        <fieldset className="border border-slate-300 rounded-2xl p-6 pt-4">
          <legend className="px-3 ml-2 text-xs font-bold text-slate-800 uppercase tracking-widest bg-white">
            Profile
          </legend>
          <p className="text-[13px] text-slate-700 leading-relaxed text-justify">
            {summary}
          </p>
        </fieldset>
      )}

      {/* Chronological Experience Timeline */}
      {experience.length > 0 && (
        <fieldset className="border border-slate-300 rounded-2xl p-6 pt-4">
          <legend className="px-3 ml-2 text-xs font-bold text-slate-800 uppercase tracking-widest bg-white">
            Experience
          </legend>
          <div className="flex flex-col gap-6">
            {experience.map((job, index) => (
              <div key={index} className="flex flex-col gap-1">
                {/* Balanced Meta Split Header */}
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-900 text-[14px]">
                    {job.title || "Position Title"}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-4">
                    {job.startDate} — {job.endDate || "Present"}
                  </span>
                </div>
                <p className="text-[13px] text-slate-600 font-semibold mb-1">
                  {job.company || "Company / Organization"}
                </p>
                <p className="text-[13px] text-slate-700 leading-relaxed text-justify whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </fieldset>
      )}

      {/* Academic Credentials Block */}
      {education.length > 0 && (
        <fieldset className="border border-slate-300 rounded-2xl p-6 pt-4">
          <legend className="px-3 ml-2 text-xs font-bold text-slate-800 uppercase tracking-widest bg-white">
            Education
          </legend>
          <div className="flex flex-col gap-5">
            {education.map((edu, index) => (
              <div key={index} className="flex flex-col gap-0.5">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-900 text-[14px]">{edu.degree || "Degree Title"}</h3>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-4">
                    {edu.graduationDate}
                  </span>
                </div>
                <p className="text-[13px] text-slate-600">{edu.school}</p>
              </div>
            ))}
          </div>
        </fieldset>
      )}

      {/* Skills Matrix / Core Competencies */}
      {skills.length > 0 && (
        <fieldset className="border border-slate-300 rounded-2xl p-6 pt-4">
          <legend className="px-3 ml-2 text-xs font-bold text-slate-800 uppercase tracking-widest bg-white">
            Skills
          </legend>
          <div className="flex flex-row flex-wrap items-center gap-3">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 w-[48%] md:w-[31%]" // Grid-like structure using widths
              >
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                <span className="text-[13px] font-medium text-slate-700 truncate">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </fieldset>
      )}

    </div>
  );
};

export default Lapras;