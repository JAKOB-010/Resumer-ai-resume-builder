import React from 'react';

const Gengar = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];

  return (
    <div 
      className="w-full bg-white flex flex-row items-stretch select-none text-slate-800 font-sans tracking-normal leading-relaxed"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto' }}
    >
      
      {/* =========================================================================
          LEFT SIDEBAR COLUMN (32% Width): Contains Solid Top Header + Tinted Body
          ========================================================================= */}
      <div className="w-[32%] flex flex-col shrink-0">
        
        {/* Solid Header Card Component (Dark Background) */}
        <div className="bg-slate-800 text-slate-100 p-7 flex flex-col gap-5">
          {personalInfo.image && (
            <img 
              src={personalInfo.image} 
              alt={personalInfo.fullName || "Profile"} 
              className="w-24 h-24 rounded object-cover shadow-sm border border-slate-600"
            />
          )}
          
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-white leading-none">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="text-xs font-medium text-slate-300 uppercase tracking-wide">
              {personalInfo.title || "Professional Title"}
            </p>
          </div>

          {/* Contact Details Stack (Vertical List) */}
          <div className="w-full flex flex-col gap-3 text-xs text-slate-200 pt-3">
            {personalInfo.email && (
              <span className="truncate flex items-center gap-2.5">
                <span className="text-slate-400">✉</span> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="truncate flex items-center gap-2.5">
                <span className="text-slate-400">📞</span> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="truncate flex items-center gap-2.5">
                <span className="text-slate-400">📍</span> {personalInfo.location}
              </span>
            )}
            {personalInfo.website && (
              <span className="truncate flex items-center gap-2.5">
                <span className="text-slate-400">🌐</span> {personalInfo.website}
              </span>
            )}
          </div>
        </div>

        {/* Sidebar Sections Stack (Light Tinted Background) */}
        <div className="bg-slate-100 p-7 flex-1 flex flex-col gap-8">
          
          {/* Education Block */}
          {education.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest border-b border-slate-800 pb-1.5">
                Education
              </h2>
              <div className="flex flex-col gap-4">
                {education.map((edu, index) => (
                  <div key={index} className="flex flex-col gap-0.5 text-xs">
                    <h3 className="font-bold text-slate-900 leading-tight">{edu.degree || "Degree"}</h3>
                    <p className="text-slate-700">{edu.school}</p>
                    <p className="text-slate-500 font-medium">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Skills Competencies */}
          {skills.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest border-b border-slate-800 pb-1.5">
                Skills
              </h2>
              <div className="flex flex-col gap-3.5">
                {skills.map((skill, index) => (
                  <div key={index} className="flex flex-col gap-1.5 text-xs">
                    <span className="font-semibold text-slate-700">{skill.name}</span>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-800 w-[80%] rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* =========================================================================
          RIGHT MAIN COLUMN (68% Width): Special Top Summary Banner + Standard Body
          ========================================================================= */}
      <div className="flex-1 flex flex-col">
        
        {/* Special Top Container: Dedicated Featured Summary Canvas (Matches Sidebar Tint) */}
        {summary && (
          <div className="bg-slate-100 p-7">
            <h2 className="sr-only">Summary</h2>
            <p className="text-sm text-slate-700 leading-relaxed text-justify">
              {summary}
            </p>
          </div>
        )}

        {/* Standard Main Content Area (White Background) */}
        <div className="p-7 flex flex-col gap-8 bg-white">
          {experience.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-[13px] font-bold text-slate-800 uppercase tracking-widest border-b border-slate-800 pb-1.5">
                Experience
              </h2>
              <div className="flex flex-col gap-6">
                {experience.map((job, index) => (
                  <div key={index} className="flex flex-col text-sm">
                    {/* Split Row for Title and Date */}
                    <div className="flex justify-between items-start mb-0.5">
                      <h3 className="font-bold text-slate-900">{job.title || "Position"}</h3>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap pl-4">
                        {job.startDate} — {job.endDate || "Present"}
                      </span>
                    </div>
                    {/* Subtitle / Company */}
                    <p className="text-slate-600 font-semibold mb-2">{job.company || "Company"}</p>
                    {/* Description Paragraph */}
                    <p className="text-slate-700 leading-relaxed text-justify whitespace-pre-line text-[13px]">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default Gengar;