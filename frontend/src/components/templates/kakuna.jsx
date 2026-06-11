import React from 'react';

const Kakuna = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];

  return (
    <div 
      className="w-full bg-white flex flex-col select-none text-slate-800 font-sans tracking-normal leading-relaxed p-12 gap-8"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto' }}
    >
      
      {/* =========================================================================
          CENTERED HEADER SECTION: Centralized Profile, Identity, and Contact Row
          ========================================================================= */}
      <div className="w-full flex flex-col items-center text-center gap-4 border-b border-slate-100 pb-6">
        {personalInfo.image && (
          <img 
            src={personalInfo.image} 
            alt={personalInfo.fullName || "Profile"} 
            className="w-24 h-24 rounded-full object-cover border border-slate-200 shadow-sm"
          />
        )}
        
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {personalInfo.fullName || "Your Full Name"}
          </h1>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            {personalInfo.title || "Professional Title"}
          </p>
        </div>

        {/* Horizontal Wrapped Contact Items List */}
        <div className="w-full flex flex-row flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-2 text-xs text-slate-600 font-medium">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <span className="text-slate-400 text-sm">✉</span> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <span className="text-slate-400 text-sm">📞</span> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <span className="text-slate-400 text-sm">📍</span> {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1.5">
              <span className="text-slate-400 text-sm">🌐</span> {personalInfo.website}
            </span>
          )}
        </div>
      </div>

      {/* =========================================================================
          SEQUENTIAL FULL-WIDTH SECTIONS: Centered Headings + Stacked Layout Feed
          ========================================================================= */}
      
      {/* Summary Profile Block */}
      {summary && (
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-bold text-slate-990 uppercase tracking-widest text-center border-b border-slate-900 pb-1.5">
            Professional Summary
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed text-justify px-2">
            {summary}
          </p>
        </div>
      )}

      {/* Chronological Experience Timeline */}
      {experience.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest text-center border-b border-slate-900 pb-1.5">
            Experience
          </h2>
          <div className="flex flex-col gap-6 px-2">
            {experience.map((job, index) => (
              <div key={index} className="flex flex-col gap-1">
                {/* Balanced Meta Split Header */}
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-900 text-sm">
                    {job.title || "Position Title"}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-4">
                    {job.startDate} — {job.endDate || "Present"}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-semibold italic">
                  {job.company || "Company / Organization"}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed text-justify mt-1.5 whitespace-pre-line font-normal">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Academic Credentials Block */}
      {education.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest text-center border-b border-slate-900 pb-1.5">
            Education
          </h2>
          <div className="flex flex-col gap-5 px-2">
            {education.map((edu, index) => (
              <div key={index} className="flex flex-col gap-0.5">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-900 text-xs">{edu.degree || "Degree Title"}</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap pl-4">
                    {edu.graduationDate}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">{edu.school}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Matrix / Core Competencies */}
      {skills.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest text-center border-b border-slate-900 pb-1.5">
            Skills
          </h2>
          {/* Centered wrap-around chip container matching Kakuna layout metrics */}
          <div className="flex flex-row flex-wrap justify-center items-center gap-2.5 px-6">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="bg-slate-50 text-slate-700 font-medium text-xs px-3 py-1 rounded border border-slate-200/60 shadow-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default Kakuna;