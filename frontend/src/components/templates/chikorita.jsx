import React from 'react';

const Chikorita = ({ data }) => {
  // Graceful fallback structure for the unified state engine
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];

  return (
    <div 
      className="w-full bg-white flex flex-row items-stretch select-none text-gray-800 tracking-normal"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto' }}
    >
      
      {/* =========================================================================
          LEFT MAIN COLUMN (65% Width) - Profile Details, History, and Narratives
          ========================================================================= */}
      <div className="w-[65%] p-8 flex flex-col gap-6">
        
        {/* Profile Identity & Contact Card */}
        <div className="flex gap-5 items-start border-b pb-6 border-gray-100">
          {personalInfo.image && (
            <img 
              src={personalInfo.image} 
              alt={personalInfo.fullName || "Candidate Photo"} 
              className="w-20 h-20 rounded-md object-cover border border-gray-200 shrink-0 shadow-sm"
            />
          )}
          
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-sm font-semibold text-emerald-600 tracking-wide uppercase mb-3">
              {personalInfo.title || "Professional Headline"}
            </p>

            {/* Dynamic Contact Grid Block */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-gray-500 font-medium">
              {personalInfo.email && (
                <span className="truncate">✉ {personalInfo.email}</span>
              )}
              {personalInfo.phone && (
                <span className="truncate">📞 {personalInfo.phone}</span>
              )}
              {personalInfo.location && (
                <span className="truncate">📍 {personalInfo.location}</span>
              )}
              {personalInfo.website && (
                <span className="truncate col-span-2 text-emerald-600">🌐 {personalInfo.website}</span>
              )}
            </div>
          </div>
        </div>

        {/* Professional Summary Section */}
        {summary && (
          <div>
            <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2.5 border-b pb-1 border-emerald-100">
              Summary
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed text-justify">
              {summary}
            </p>
          </div>
        )}

        {/* Work Chronology Timeline */}
        <div>
          <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4 border-b pb-1 border-emerald-100">
            Experience
          </h2>
          {experience.length > 0 ? (
            <div className="space-y-4">
              {experience.map((job, index) => (
                <div key={index} className="text-xs">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-gray-900 text-sm">{job.title || "Position Title"}</h3>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      {job.startDate} — {job.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-emerald-600 font-medium mb-1.5 italic">
                    {job.company || "Company Entity"}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-justify whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No professional experience listed.</p>
          )}
        </div>

      </div>

      {/* =========================================================================
          RIGHT SIDEBAR (35% Width) - Solid Primary Block for Skills & Education
          ========================================================================= */}
      <div className="w-[35%] bg-slate-900 text-slate-100 p-8 flex flex-col gap-6">
        
        {/* Education History Block */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3 border-b pb-1 border-slate-700 text-emerald-400">
            Education
          </h2>
          {education.length > 0 ? (
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="text-xs">
                  <p className="font-bold text-white text-sm">{edu.degree || "Degree Protocol"}</p>
                  <p className="text-slate-300 mt-0.5 font-medium">{edu.school || "Institution Name"}</p>
                  <p className="text-slate-400/80 mt-1 font-semibold text-[10px] uppercase tracking-wider">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No education history specified.</p>
          )}
        </div>

        {/* Technical Core Competencies Block */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-3 border-b pb-1 border-slate-700 text-emerald-400">
            Skills
          </h2>
          {skills.length > 0 ? (
            <div className="flex flex-col gap-3">
              {skills.map((skill, index) => (
                <div key={index} className="flex flex-col gap-1 text-xs">
                  <span className="font-medium text-slate-200">{skill.name}</span>
                  {/* Subtle, minimalist level bar simulating original reactive resume accent dots */}
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[80%] rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No skill sets provided.</p>
          )}
        </div>

      </div>

    </div>
  );
};

export default Chikorita;