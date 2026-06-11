import React from 'react';

const temp6 = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const accomplishments = data?.accomplishments || [];

  return (
    <div 
      className="w-full bg-white flex flex-col select-none text-neutral-900 font-sans tracking-normal leading-relaxed"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
    >
      
      {/* =========================================================================
          HEADER SECTION: Charcoal Name Banner
          ========================================================================= */}
      <div className="w-full bg-[#4a4a4a] py-8 px-10">
        <h1 className="text-[2.5rem] font-normal text-white uppercase tracking-wider mb-1">
          {personalInfo.fullName || "Jane Wilson"}
        </h1>
      </div>

      {/* =========================================================================
          CONTACT BAR: Dusty Pink Sub-header with Icons
          ========================================================================= */}
      <div className="w-full bg-[#e3b8b4] py-2.5 px-10 flex flex-wrap items-center text-white text-[13px] gap-x-6 gap-y-2">
        <span className="font-medium uppercase tracking-widest text-sm mr-2">Contact |</span>
        
        {personalInfo.location && (
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>{personalInfo.location}</span>
          </div>
        )}
        
        {personalInfo.phone && (
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
            </svg>
            <span>{personalInfo.phone}</span>
          </div>
        )}
        
        {personalInfo.email && (
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span>{personalInfo.email}</span>
          </div>
        )}
      </div>

      {/* =========================================================================
          MAIN CONTENT BODY
          ========================================================================= */}
      <div className="w-full px-10 py-8 flex flex-col gap-6">
        
        {/* Professional Summary (No heading, plain text at the top) */}
        {summary && (
          <div className="text-[13px] text-neutral-800 leading-relaxed text-justify mb-2">
            {summary}
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div className="flex flex-col w-full">
            <h2 className="text-[13px] font-semibold text-black uppercase tracking-wider mb-1">
              Education
            </h2>
            <div className="w-full border-t-[1.5px] border-black mb-3" />
            
            <div className="flex flex-col gap-4">
              {education.map((edu, index) => (
                <div key={index} className="flex flex-col text-[13px] text-neutral-900 leading-snug">
                  <span>{edu.graduationDate || "Present"}</span>
                  <span>{edu.degree || "Degree"}</span>
                  <span>{edu.school}{edu.location ? `, ${edu.location}` : ""}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="flex flex-col w-full">
            <h2 className="text-[13px] font-semibold text-black uppercase tracking-wider mb-1">
              Skills
            </h2>
            <div className="w-full border-t-[1.5px] border-black mb-3" />
            
            <ul className="list-disc list-outside ml-4 space-y-1 text-[13px] text-neutral-900">
              {skills.map((skill, index) => (
                <li key={index} className="pl-1">
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Work History Section */}
        {experience.length > 0 && (
          <div className="flex flex-col w-full">
            <h2 className="text-[13px] font-semibold text-black uppercase tracking-wider mb-1">
              Work History
            </h2>
            <div className="w-full border-t-[1.5px] border-black mb-3" />
            
            <div className="flex flex-col gap-6">
              {experience.map((job, index) => (
                <div key={index} className="flex flex-col text-[13px] text-neutral-900">
                  <div className="mb-0.5">
                    {job.startDate} - {job.endDate || "Present"}
                  </div>
                  <div className="mb-1.5">
                    {job.title} {job.company}{job.location ? `, ${job.location}` : ""}
                  </div>
                  
                  {/* Multi-line Description Parsing for Bullets */}
                  <div className="leading-relaxed">
                    {job.description && job.description.includes('\n') ? (
                      <ul className="list-disc list-outside ml-4 space-y-0.5">
                        {job.description.split('\n').map((line, i) => (
                          line.trim() && <li key={i} className="pl-1">{line.replace(/^[•*\s\-]+/, '')}</li>
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

        {/* Accomplishments Section */}
        {accomplishments.length > 0 && (
          <div className="flex flex-col w-full">
            <h2 className="text-[13px] font-semibold text-black uppercase tracking-wider mb-1">
              Accomplishments
            </h2>
            <div className="w-full border-t-[1.5px] border-black mb-3" />
            
            <ul className="list-disc list-outside ml-4 space-y-1 text-[13px] text-neutral-900">
              {accomplishments.map((item, index) => (
                <li key={index} className="pl-1">
                  {typeof item === 'string' ? item : item.name}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default temp6;