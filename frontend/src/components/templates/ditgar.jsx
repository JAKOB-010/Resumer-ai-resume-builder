import React from 'react';

const Ditgar = ({ data }) => {
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
          LEFT SIDEBAR COLUMN (33% Width): Contains Solid Top Header + Tinted Body
          ========================================================================= */}
      <div className="w-[33%] bg-slate-100/70 flex flex-col shrink-0 border-r border-slate-200/50">
        
        {/* Solid Header Card Component */}
        <div className="bg-slate-900 text-slate-100 p-6 flex flex-col items-center text-center gap-4">
          {personalInfo.image && (
            <img 
              src={personalInfo.image} 
              alt={personalInfo.fullName || "Profile"} 
              className="w-24 h-24 rounded-md object-cover border-2 border-slate-700 shadow-sm"
            />
          )}
          
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight text-white leading-none">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              {personalInfo.title || "Professional Title"}
            </p>
          </div>

          {/* Contact Details Stack */}
          <div className="w-full flex flex-col gap-2.5 text-[11px] text-slate-200 text-left border-t border-slate-700/80 pt-5 mt-2">
            {personalInfo.email && (
              <span className="truncate flex items-center gap-2">
                <span className="text-slate-500 text-sm">✉</span> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="truncate flex items-center gap-2">
                <span className="text-slate-500 text-sm">📞</span> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="truncate flex items-center gap-2">
                <span className="text-slate-500 text-sm">📍</span> {personalInfo.location}
              </span>
            )}
            {personalInfo.website && (
              <span className="truncate flex items-center gap-2">
                <span className="text-slate-500 text-sm">🌐</span> {personalInfo.website}
              </span>
            )}
          </div>
        </div>

        {/* Sidebar Sections Stack */}
        <div className="p-6 flex flex-col gap-8">
          
          {/* Education Block */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4 border-b pb-1.5 border-slate-300">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="text-xs">
                    <h3 className="font-bold text-slate-900 leading-tight">{edu.degree || "Degree"}</h3>
                    <p className="text-slate-700 font-medium mt-1">{edu.school}</p>
                    <p className="text-slate-500 text-[10px] mt-0.5 font-semibold uppercase">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Skills Competencies */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4 border-b pb-1.5 border-slate-300">
                Skills
              </h2>
              <div className="flex flex-col gap-3">
                {skills.map((skill, index) => (
                  <div key={index} className="flex flex-col gap-1.5 text-xs">
                    <span className="font-semibold text-slate-700">{skill.name}</span>
                    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-900 w-[80%] rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* =========================================================================
          RIGHT MAIN COLUMN (67% Width): Special Top Summary Banner + History Timeline
          ========================================================================= */}
      <div className="w-[67%] flex flex-col bg-white">
        
        {/* Special Top Container: Dedicated Featured Summary Canvas (Matches Sidebar Tint) */}
        {summary && (
          <div className="bg-slate-100/70 p-8 border-b border-slate-200/50">
            <p className="text-sm text-slate-700 leading-relaxed text-justify font-medium">
              {summary}
            </p>
          </div>
        )}

        {/* Chronological Work Feed Content */}
        <div className="p-8 flex flex-col gap-6">
          {experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-5 border-b pb-1.5 border-slate-200">
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <div key={index} className="relative">
                    {/* Left Accent Header Marker Component from the original layout specification */}
                    <div className="border-l-[3px] border-slate-900 pl-4 text-xs">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-slate-900 text-sm">{job.title || "Position"}</h3>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap pl-2">
                          {job.startDate} — {job.endDate || "Present"}
                        </span>
                      </div>
                      <p className="text-slate-700 font-semibold mb-2">{job.company || "Company"}</p>
                      <p className="text-slate-600 leading-relaxed text-justify whitespace-pre-line font-normal">
                        {job.description}
                      </p>
                    </div>
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

export default Ditgar;