import React from 'react';

const temp8 = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const accomplishments = data?.accomplishments || []; // Mapped to 'Affiliations' in this template

  // Parse name for the styled header
  const nameParts = personalInfo.fullName ? personalInfo.fullName.split(' ') : ["JAMES", "STELE"];
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : "";

  return (
    <div 
      className="w-full flex flex-row select-none font-sans tracking-normal leading-relaxed bg-white"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
    >
      
      {/* =========================================================================
          LEFT COLUMN: Main Content (Name, Summary, Experience)
          ========================================================================= */}
      <div className="w-[64%] px-10 py-12 flex flex-col gap-6 text-neutral-800">
        
        {/* Header / Name */}
        <div className="flex flex-col w-full mb-2">
          <h1 className="text-[3.25rem] font-light text-[#295573] uppercase tracking-widest leading-none mb-3">
            {firstName} &nbsp; {lastName}
          </h1>
          <div className="w-full h-[1.5px] bg-[#95b0c4]" />
        </div>

        {/* Professional Summary */}
        {summary && (
          <div className="flex flex-col">
            <h2 className="text-[#295573] text-[15px] font-semibold uppercase tracking-widest mb-1.5">
              Professional Summary
            </h2>
            <div className="w-full h-[1px] bg-[#95b0c4] mb-3" />
            <p className="text-[13px] text-neutral-700 leading-relaxed text-justify">
              {summary}
            </p>
          </div>
        )}

        {/* Work History */}
        {experience.length > 0 && (
          <div className="flex flex-col mt-2">
            <h2 className="text-[#295573] text-[15px] font-semibold uppercase tracking-widest mb-1.5">
              Work History
            </h2>
            <div className="w-full h-[1px] bg-[#95b0c4] mb-4" />
            
            <div className="flex flex-col gap-5">
              {experience.map((job, index) => (
                <div key={index} className="flex flex-col text-[13px]">
                  {/* Title and Dates inline */}
                  <div className="mb-0.5">
                    <span className="font-semibold text-neutral-800">{job.title}</span>
                    {job.startDate && (
                      <span className="text-neutral-800">
                        {job.title ? `, ` : ''}{job.startDate} - {job.endDate || "Current"}
                      </span>
                    )}
                  </div>
                  {/* Company and Location */}
                  <div className="text-neutral-700 mb-2">
                    {job.company}{job.location ? `, ${job.location}` : ""}
                  </div>
                  
                  {/* Multi-line Description Parsing for Bullets */}
                  <div className="leading-relaxed text-neutral-700">
                    {job.description && job.description.includes('\n') ? (
                      <ul className="list-disc list-outside ml-4 space-y-1">
                        {job.description.split('\n').map((line, i) => (
                          line.trim() && <li key={i} className="pl-1">{line.replace(/^[•*\s\-]+/, '')}</li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="list-disc list-outside ml-4">
                        <li className="pl-1">{job.description}</li>
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          RIGHT COLUMN: Sidebar (Contact, Skills, Education, Affiliations)
          ========================================================================= */}
      <div className="w-[36%] bg-[#295573] px-8 py-12 flex flex-col gap-8 text-white shrink-0">
        
        {/* Contact Info */}
        <div className="flex flex-col gap-4 text-[13px] mt-4 mb-2">
          {personalInfo.location && (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 fill-[#295573]" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <span className="tracking-wide break-words">{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 fill-[#295573]" viewBox="0 0 24 24">
                  <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                </svg>
              </div>
              <span className="tracking-wide">{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 fill-[#295573]" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <span className="tracking-wide break-all">{personalInfo.email}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-col">
            <h2 className="text-white text-[15px] font-semibold uppercase tracking-widest mb-1.5">
              Skills
            </h2>
            <div className="w-full h-[1px] bg-white/40 mb-3" />
            <ul className="text-[13px] leading-loose">
              {skills.map((skill, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 mt-[7px] text-[8px] leading-none">•</span>
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="flex flex-col">
            <h2 className="text-white text-[15px] font-semibold uppercase tracking-widest mb-1.5">
              Education
            </h2>
            <div className="w-full h-[1px] bg-white/40 mb-3" />
            
            <div className="flex flex-col gap-4">
              {education.map((edu, index) => (
                <div key={index} className="flex flex-col text-[13px] leading-snug">
                  <span className="font-semibold mb-0.5">{edu.degree}</span>
                  <span className="text-white/90">
                    {edu.school}{edu.location ? ` - ${edu.location}` : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Affiliations / Accomplishments */}
        {accomplishments.length > 0 && (
          <div className="flex flex-col">
            <h2 className="text-white text-[15px] font-semibold uppercase tracking-widest mb-1.5">
              Affiliations
            </h2>
            <div className="w-full h-[1px] bg-white/40 mb-3" />
            
            <ul className="text-[13px] leading-relaxed space-y-2">
              {accomplishments.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 mt-[6px] text-[8px] leading-none">•</span>
                  <span>{typeof item === 'string' ? item : item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default temp8;