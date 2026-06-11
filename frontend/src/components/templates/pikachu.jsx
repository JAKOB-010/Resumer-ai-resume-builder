import React from 'react';

const Pikachu = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];

  return (
    <div 
      className="w-full bg-white flex flex-row select-none text-slate-800 font-sans tracking-normal leading-relaxed p-10 gap-8"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto' }}
    >
      
      {/* =========================================================================
          SIDEBAR COLUMN (approx 30% width)
          ========================================================================= */}
      <div className="w-[30%] flex flex-col gap-8 shrink-0">
        
        {/* Profile Picture: Placed at the top of the sidebar in Pikachu */}
        {personalInfo.image && (
          <img 
            src={personalInfo.image} 
            alt={personalInfo.fullName || "Profile"} 
            className="w-full aspect-square object-cover rounded-xl border border-slate-200 shadow-sm"
          />
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-[13px] font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-1">
              Skills
            </h2>
            <div className="flex flex-col gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <span className="text-[12px] font-semibold text-slate-800">
                    {skill.name}
                  </span>
                  {/* Visual level indicator */}
                  <div className="flex flex-row gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div 
                        key={level} 
                        className={`h-1.5 flex-1 rounded-sm ${
                          level <= 4 ? 'bg-slate-800' : 'bg-slate-200' 
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section (Often moved to sidebar in two-column layouts to balance height) */}
        {education.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-[13px] font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-1">
              Education
            </h2>
            <div className="flex flex-col gap-4">
              {education.map((edu, index) => (
                <div key={index} className="flex flex-col gap-0.5">
                  <h3 className="font-bold text-slate-900 text-[13px] leading-tight">
                    {edu.degree || "Degree Title"}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                    {edu.graduationDate}
                  </span>
                  <p className="text-[12px] text-slate-700 leading-snug">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>


      {/* =========================================================================
          MAIN COLUMN (approx 70% width)
          ========================================================================= */}
      <div className="w-[70%] flex flex-col gap-8 flex-1">
        
        {/* Pikachu Signature Header: Solid background block with inverted text */}
        <div className="bg-slate-900 text-white rounded-xl px-6 py-6 flex flex-col gap-4 shadow-sm">
          
          {/* Header Identity & Divider */}
          <div className="border-b border-white/30 pb-4 flex flex-col gap-1">
            <h1 className="text-4xl font-extrabold tracking-tight">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="text-[14px] font-medium text-slate-300 uppercase tracking-widest">
              {personalInfo.title || "Professional Title"}
            </p>
          </div>

          {/* Header Contact List */}
          <div className="flex flex-row flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-medium text-slate-200">
            {personalInfo.email && (
              <span className="flex items-center gap-1.5">
                <span>✉</span> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                <span>📞</span> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5">
                <span>📍</span> {personalInfo.location}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1.5">
                <span>🌐</span> {personalInfo.website}
              </span>
            )}
          </div>
        </div>

        {/* Summary Profile Block */}
        {summary && (
          <div className="flex flex-col gap-3">
            <h2 className="text-[13px] font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-1">
              Profile
            </h2>
            <p className="text-[13px] text-slate-700 leading-relaxed text-justify">
              {summary}
            </p>
          </div>
        )}

        {/* Chronological Experience Timeline */}
        {experience.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-[13px] font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-1">
              Experience
            </h2>
            <div className="flex flex-col gap-6">
              {experience.map((job, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-[14px]">
                      {job.title || "Position Title"}
                    </h3>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap pl-4">
                      {job.startDate} — {job.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-800 font-semibold mb-0.5">
                    {job.company || "Company / Organization"}
                  </p>
                  <p className="text-[13px] text-slate-600 leading-relaxed text-justify whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Pikachu;