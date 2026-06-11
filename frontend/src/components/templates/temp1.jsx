import React from 'react';

const temp1 = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];

  // Helper to generate initials for the hexagon logo
  const getInitials = (name) => {
    if (!name) return "CJ";
    const parts = name.trim().split(" ");
    if (parts.length > 1) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return name[0].toUpperCase();
  };

  // Split name for the specific stacked typography style
  const defaultName = "Chris Johnson";
  const fullName = personalInfo.fullName || defaultName;
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <div 
      className="w-full flex flex-row select-none font-sans tracking-normal leading-relaxed text-gray-800 bg-white"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
    >
      
      {/* =========================================================================
          LEFT SIDEBAR: Purple Theme, Identity, Contact, Education, Skills
          ========================================================================= */}
      <div className="w-[38%] bg-[#CDBCE0] p-10 flex flex-col gap-8 shrink-0">
        
        {/* Monogram Logo */}
        <div className="w-full flex justify-start mb-2">
          <div 
            className="w-20 h-20 bg-[#6E5394] text-white flex items-center justify-center text-3xl font-light tracking-widest italic"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          >
            {getInitials(fullName)}
          </div>
        </div>

        {/* Name Header */}
        <div className="flex flex-col border-b border-gray-600/20 pb-8 mb-2">
          <h1 className="text-[2.5rem] font-light text-gray-800 tracking-[0.15em] uppercase leading-tight">
            {firstName}
          </h1>
          <h1 className="text-[2.5rem] font-normal text-gray-800 tracking-[0.15em] uppercase leading-tight">
            {lastName}
          </h1>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4 text-sm font-medium text-gray-700">
          {personalInfo.email && (
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-[#6E5394] text-xs">✉</span>
              </div>
              <span className="truncate">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-[#6E5394] text-xs">📞</span>
              </div>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-[#6E5394] text-xs">📍</span>
              </div>
              <span className="truncate">{personalInfo.location}</span>
            </div>
          )}
        </div>

        {/* Education Section */}
        {education.length > 0 && (
          <div className="flex flex-col gap-5 mt-6">
            <h2 className="text-base font-semibold text-gray-800 uppercase tracking-widest">
              Education
            </h2>
            <div className="flex flex-col gap-5">
              {education.map((edu, index) => (
                <div key={index} className="flex flex-col gap-0.5 text-sm">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-gray-800 font-medium">{edu.school}</span>
                  </div>
                  <span className="text-gray-600 text-xs mt-0.5 mb-1">{edu.graduationDate}</span>
                  <span className="text-gray-800 font-medium">{edu.degree || "Degree Title"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="flex flex-col gap-5 mt-4">
            <h2 className="text-base font-semibold text-gray-800 uppercase tracking-widest">
              Skills
            </h2>
            <div className="flex flex-col gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="flex flex-col gap-1.5">
                  <span className="text-[13px] font-medium text-gray-800">
                    {skill.name}
                  </span>
                  {/* Visual Dot Meter (Defaulted to 4/5 for aesthetic consistency) */}
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div 
                        key={dot} 
                        className={`w-2.5 h-2.5 rounded-full ${dot <= 4 ? 'bg-[#6E5394]' : 'bg-[#6E5394]/20'}`} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          MAIN COLUMN: Off-white background, Objective, Experience
          ========================================================================= */}
      <div className="w-[62%] bg-[#F8F5FB] p-10 py-12 flex flex-col gap-10 flex-1">
        
        {/* Profile Summary / Objective */}
        {summary && (
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-medium text-gray-800 uppercase tracking-[0.15em]">
              Resume Objective
            </h2>
            <p className="text-[13px] text-gray-700 leading-relaxed text-justify mt-1">
              {summary}
            </p>
          </div>
        )}

        {/* Professional Experience */}
        {experience.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-base font-medium text-gray-800 uppercase tracking-[0.15em] mb-2">
              Experience
            </h2>
            
            <div className="flex flex-col gap-8">
              {experience.map((job, index) => (
                <div key={index} className="flex flex-col gap-2">
                  
                  {/* Job Header: Company - Title */}
                  <div className="flex items-baseline gap-2 text-[14px]">
                    <span className="font-medium text-gray-800">{job.company || "Company"}</span>
                    <span className="text-gray-400">-</span>
                    <span className="font-normal text-gray-700">{job.title || "Position Title"}</span>
                  </div>
                  
                  {/* Dates */}
                  <span className="text-[12px] font-medium text-gray-500 uppercase tracking-wider mb-2">
                    {job.startDate} — {job.endDate || "Present"}
                  </span>
                  
                  {/* Job Description (Rendering standard text or split lines as bullets) */}
                  <div className="text-[13px] text-gray-700 leading-relaxed text-justify">
                    {job.description && job.description.includes('\n') ? (
                      <ul className="list-disc list-outside ml-4 space-y-1">
                        {job.description.split('\n').map((line, i) => (
                          line.trim() && <li key={i}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{job.description}</p>
                    )}
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>

    </div>
  );
};

export default temp1;