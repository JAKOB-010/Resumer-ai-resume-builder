import React from 'react';

const temp7 = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const accomplishments = data?.accomplishments || [];
  const languages = data?.languages || [];

  // Parse name for stacked formatting
  const nameParts = personalInfo.fullName ? personalInfo.fullName.split(' ') : ["DAVID", "ANDERSON"];
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : "";

  // Helper for the repeating timeline section structure
  const SectionBlock = ({ title, children }) => (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline Node */}
      <div 
        className="absolute top-0.5 w-[14px] h-[14px] bg-white border-[1.5px] border-[#1d4e73] rounded-full"
        style={{ left: '-7.75px' }} // Centers the 14px circle exactly over the 1.5px left border
      />
      <h2 className="text-[#1d4e73] text-[13px] font-semibold uppercase tracking-wide mb-2.5">
        {title}
      </h2>
      <div className="text-neutral-700">
        {children}
      </div>
    </div>
  );

  return (
    <div 
      className="w-full bg-white flex flex-col select-none text-neutral-800 font-sans tracking-normal leading-relaxed"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
    >
      
      {/* =========================================================================
          HEADER SECTION: Stacked Name and Contact Info
          ========================================================================= */}
      <div className="px-14 pt-14 pb-8 flex flex-col">
        <h1 className="text-[2.75rem] font-medium text-[#2d3748] uppercase leading-[1.1] tracking-wide mb-3">
          <span className="block">{firstName}</span>
          {lastName && <span className="block">{lastName}</span>}
        </h1>
        
        <div className="text-[13px] text-neutral-700 flex flex-wrap gap-x-2 leading-relaxed">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          <div className="w-full" /> {/* Line break for location */}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* =========================================================================
          MAIN CONTENT BODY: Left-bordered Timeline
          ========================================================================= */}
      <div className="ml-14 mt-2 border-l-[1.5px] border-[#1d4e73] pb-12 flex flex-col pr-12">
        
        {/* Resume Objective */}
        {summary && (
          <SectionBlock title="Resume Objective">
            <p className="text-[13px] leading-relaxed text-justify">
              {summary}
            </p>
          </SectionBlock>
        )}

        {/* Education */}
        {education.length > 0 && (
          <SectionBlock title="Education">
            <div className="flex flex-col gap-5">
              {education.map((edu, index) => (
                <div key={index} className="flex flex-col text-[13px]">
                  <div className="flex justify-between items-start mb-0.5">
                    <span className="text-neutral-800">
                      {edu.school}{edu.location ? ` | ${edu.location}` : ""}
                    </span>
                    <span className="text-neutral-600 shrink-0 font-medium">
                      {edu.graduationDate || "Present"}
                    </span>
                  </div>
                  <div className="text-neutral-600">{edu.degree}</div>
                </div>
              ))}
            </div>
          </SectionBlock>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <SectionBlock title="Skills">
            <div className="grid grid-cols-3 gap-x-6 gap-y-4">
              {skills.map((skill, index) => {
                // Map a 1-5 level to 6 segments. Default to 4 if unprovided.
                const score = skill.level ? Math.ceil((skill.level / 5) * 6) : 4;
                return (
                  <div key={index} className="flex flex-col text-[13px]">
                    <span className="mb-1.5 text-neutral-800 truncate">{skill.name}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5, 6].map((segment) => (
                        <div 
                          key={segment} 
                          className={`h-[4px] flex-1 ${segment <= score ? 'bg-[#1d4e73]' : 'bg-[#e2e8f0]'}`} 
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionBlock>
        )}

        {/* Work / Volunteer Experience */}
        {experience.length > 0 && (
          <SectionBlock title="Experience">
            <div className="flex flex-col gap-6">
              {experience.map((job, index) => (
                <div key={index} className="flex flex-col text-[13px]">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-neutral-800 font-medium">
                      {job.title} {job.company ? `| ${job.company}` : ""} {job.location ? `| ${job.location}` : ""}
                    </span>
                    <span className="text-neutral-600 shrink-0 font-medium">
                      {job.startDate} - {job.endDate || "Present"}
                    </span>
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
                      <p>{job.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SectionBlock>
        )}

        {/* Accomplishments */}
        {accomplishments.length > 0 && (
          <SectionBlock title="Accomplishments">
            <ul className="list-disc list-outside ml-4 space-y-1 text-[13px]">
              {accomplishments.map((item, index) => (
                <li key={index} className="pl-1">
                  {typeof item === 'string' ? item : item.name}
                </li>
              ))}
            </ul>
          </SectionBlock>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <SectionBlock title="Languages">
            <div className="grid grid-cols-3 gap-x-6 gap-y-4">
              {languages.map((lang, index) => {
                const langName = typeof lang === 'string' ? lang : lang.name;
                const langLevel = typeof lang === 'string' ? 'Intermediate' : (lang.level || 'Intermediate');
                // Convert typical 1-5 level string or numeric value to a 1-6 visual score
                const score = (typeof lang === 'object' && lang.score) ? Math.ceil((lang.score / 5) * 6) : 5;
                
                return (
                  <div key={index} className="flex flex-col text-[13px]">
                    <span className="mb-1.5 text-neutral-800 truncate">{langName}</span>
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5, 6].map((segment) => (
                        <div 
                          key={segment} 
                          className={`h-[4px] flex-1 ${segment <= score ? 'bg-[#1d4e73]' : 'bg-[#e2e8f0]'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-neutral-500 text-xs truncate">{langLevel}</span>
                  </div>
                );
              })}
            </div>
          </SectionBlock>
        )}

      </div>
    </div>
  );
};

export default temp7;