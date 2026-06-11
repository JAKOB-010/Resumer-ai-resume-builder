import React from 'react';

const temp15 = ({ data }) => {
  // Defensive assignment with clean fallbacks
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const accomplishments = data?.accomplishments || [];
  const certifications = data?.certifications || [];
  const languages = data?.languages || [];

  return (
    <div 
      className="w-full bg-white select-none font-sans text-neutral-800 tracking-normal antialiased"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}
    >
      <div className="flex flex-row items-stretch min-h-[297mm]">
        
        {/* =========================================================================
            LEFT COLUMN (Sidebar - 35% Width)
            ========================================================================= */}
        <div className="w-[35%] bg-[#e4ded5] px-8 pt-14 pb-12 flex flex-col border-r border-neutral-200/30">
          
          {/* Candidate Name Block */}
          <div className="mb-6">
            <h1 className="text-[28px] font-bold text-neutral-800 leading-tight uppercase tracking-wide break-words">
              {personalInfo.fullName || "Karry Maine"}
            </h1>
            {/* Minimal Horizontal Accent Line */}
            <div className="w-10 h-[1.5px] bg-neutral-600 mt-3 mb-5" />
          </div>

          {/* Contact Details Section */}
          <div className="flex flex-col gap-3 text-[12px] text-neutral-700 font-medium mb-10 break-all">
            {personalInfo.email && (
              <div className="flex items-center gap-2.5">
                <svg className="w-3.5 h-3.5 text-neutral-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L22 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2.5">
                <svg className="w-3.5 h-3.5 text-neutral-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2.5">
                <svg className="w-3.5 h-3.5 text-neutral-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>

          {/* Dynamic Sidebar Content Block */}
          <div className="flex flex-col gap-8">
            
            {/* Summary of Qualifications / Accomplishments */}
            {accomplishments.length > 0 && (
              <div className="page-break-inside-avoid">
                <h2 className="text-[13px] font-bold text-neutral-800 uppercase tracking-wider mb-3.5">
                  Summary of Qualifications
                </h2>
                <ul className="list-disc list-outside ml-4 text-[12px] text-neutral-700 space-y-2 leading-relaxed">
                  {accomplishments.map((item, index) => (
                    <li key={index} className="pl-0.5">
                      {typeof item === 'string' ? item : item.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Education Block */}
            {education.length > 0 && (
              <div className="page-break-inside-avoid">
                <h2 className="text-[13px] font-bold text-neutral-800 uppercase tracking-wider mb-3.5">
                  Education
                </h2>
                <div className="flex flex-col gap-4 text-[12px]">
                  {education.map((edu, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="font-bold text-neutral-800">{edu.school}</span>
                      <span className="text-neutral-600 text-[11.5px] mt-0.5">
                        {edu.location}{edu.graduationDate ? ` • ${edu.graduationDate}` : ""}
                      </span>
                      <span className="text-neutral-700 mt-1 leading-snug">
                        {edu.degree}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages Block */}
            {languages.length > 0 && (
              <div className="page-break-inside-avoid">
                <h2 className="text-[13px] font-bold text-neutral-800 uppercase tracking-wider mb-3.5">
                  Languages
                </h2>
                <ul className="list-disc list-outside ml-4 text-[12px] text-neutral-700 space-y-1.5">
                  {languages.map((lang, index) => (
                    <li key={index} className="pl-0.5">
                      <span className="font-medium text-neutral-800">
                        {typeof lang === 'string' ? lang : lang.name}
                      </span>
                      {typeof lang !== 'string' && lang.level && (
                        <span className="text-neutral-600 text-[11.5px]"> ({lang.level})</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN (Main Content Body - 65% Width)
            ========================================================================= */}
        <div className="w-[65%] px-10 pt-14 pb-12 flex flex-col bg-white">
          
          {/* Professional Summary Block */}
          {summary && (
            <div className="mb-10 page-break-inside-avoid">
              <h2 className="text-[13px] font-bold text-neutral-800 uppercase tracking-wider mb-3">
                Professional Summary
              </h2>
              <p className="text-[12.5px] text-neutral-700 leading-relaxed text-justify">
                {summary}
              </p>
            </div>
          )}

          {/* Relevant Skills Block */}
          {skills.length > 0 && (
            <div className="mb-10 page-break-inside-avoid">
              <h2 className="text-[13px] font-bold text-neutral-800 uppercase tracking-wider mb-4">
                Relevant Skills
              </h2>
              
              <div className="grid grid-cols-1 gap-4 text-[12.5px]">
                {skills.some(s => s.description || s.keywords) ? (
                  skills.map((skill, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="font-bold text-neutral-800 mb-1">{skill.name}</span>
                      {skill.description && (
                        <p className="text-neutral-700 leading-relaxed pl-3 border-l border-neutral-300">
                          {skill.description}
                        </p>
                      )}
                      {skill.keywords && skill.keywords.length > 0 && (
                        <p className="text-neutral-600 text-[11.5px] mt-1 pl-3">
                          {skill.keywords.join(', ')}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2 text-neutral-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                        <span>{typeof skill === 'string' ? skill : skill.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Work History Block */}
          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-[13px] font-bold text-neutral-800 uppercase tracking-wider mb-4">
                Work History
              </h2>
              
              <div className="flex flex-col gap-6">
                {experience.map((job, index) => (
                  <div key={index} className="flex flex-col text-[12.5px] page-break-inside-avoid">
                    
                    {/* Job Title & Company header line */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <span className="font-bold text-neutral-800">
                        {job.title}
                      </span>
                      <span className="text-neutral-600 text-[11.5px] shrink-0 font-medium">
                        {job.startDate} – {job.endDate || "Current"}
                      </span>
                    </div>

                    {/* Company and Location sub-line */}
                    <div className="text-neutral-600 text-[12px] font-medium mt-0.5 mb-2">
                      {job.company}{job.location ? ` • ${job.location}` : ""}
                    </div>

                    {/* Job Descriptions (bulleted line formatting) */}
                    {job.description && (
                      <div className="text-neutral-700 leading-relaxed text-justify">
                        {job.description.includes('\n') ? (
                          <ul className="list-disc list-outside ml-4 space-y-1">
                            {job.description.split('\n').map((line, i) => {
                              const cleanLine = line.replace(/^[•*\s\-]+/, '').trim();
                              return cleanLine ? <li key={i} className="pl-0.5">{cleanLine}</li> : null;
                            })}
                          </ul>
                        ) : (
                          <p>{job.description}</p>
                        )}
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Block */}
          {certifications.length > 0 && (
            <div className="mt-2 page-break-inside-avoid">
              <h2 className="text-[13px] font-bold text-neutral-800 uppercase tracking-wider mb-3">
                Certifications
              </h2>
              <ul className="list-disc list-outside ml-4 text-[12.5px] text-neutral-700 space-y-1.5">
                {certifications.map((cert, index) => (
                  <li key={index} className="pl-0.5">
                    {typeof cert === 'string' ? cert : `${cert.name}${cert.issuer ? ` – ${cert.issuer}` : ''}`}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default temp15;