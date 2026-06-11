import React from 'react';

const temp9 = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];

  // Helper component for the distinctive grey section headers
  const SectionHeader = ({ title }) => (
    <div className="w-full bg-[#d5d5d5] py-1.5 px-3 mb-4 mt-6 first:mt-0">
      <h2 className="text-[13px] font-semibold text-neutral-800 uppercase tracking-widest">
        {title}
      </h2>
    </div>
  );

  return (
    <div 
      className="w-full bg-white flex flex-col select-none text-neutral-800 font-sans tracking-normal leading-relaxed"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
    >
      
      {/* =========================================================================
          HEADER SECTION: Centered Light Typography
          ========================================================================= */}
      <div className="w-full px-14 pt-16 pb-8 flex flex-col items-center text-center">
        <h1 className="text-[3.5rem] font-light text-[#333] uppercase tracking-widest leading-none mb-4">
          {personalInfo.fullName || "NEAL CAFFREY"}
        </h1>
        
        <div className="text-[13px] text-neutral-700 flex flex-wrap justify-center items-center gap-x-2">
          {personalInfo.email && (
            <>
              <span>{personalInfo.email}</span>
              {(personalInfo.phone || personalInfo.location) && <span>|</span>}
            </>
          )}
          {personalInfo.phone && (
            <>
              <span>{personalInfo.phone}</span>
              {personalInfo.location && <span>|</span>}
            </>
          )}
          {personalInfo.location && (
            <span>{personalInfo.location}</span>
          )}
        </div>
      </div>

      {/* =========================================================================
          MAIN CONTENT BODY
          ========================================================================= */}
      <div className="w-full px-14 pb-16 flex flex-col">
        
        {/* Professional Summary */}
        {summary && (
          <div className="flex flex-col w-full">
            <SectionHeader title="Professional Summary" />
            <p className="text-[13px] text-neutral-800 leading-relaxed text-justify px-1">
              {summary}
            </p>
          </div>
        )}

        {/* Work History */}
        {experience.length > 0 && (
          <div className="flex flex-col w-full">
            <SectionHeader title="Work History" />
            
            <div className="flex flex-col gap-6 px-1">
              {experience.map((job, index) => (
                <div key={index} className="grid grid-cols-3 gap-6 text-[13px]">
                  {/* Left Column: Dates, Title, Company */}
                  <div className="col-span-1 flex flex-col text-neutral-800">
                    <span className="mb-1">
                      {job.startDate} - {job.endDate || "Current"}
                    </span>
                    <span>{job.title}</span>
                    <span>
                      {job.company}{job.location ? ` - ${job.location}` : ""}
                    </span>
                  </div>
                  
                  {/* Right Column: Descriptions / Bullets */}
                  <div className="col-span-2 text-neutral-800">
                    {job.description && job.description.includes('\n') ? (
                      <ul className="list-disc list-inside space-y-1">
                        {job.description.split('\n').map((line, i) => {
                          const cleanLine = line.replace(/^[•*\s\-]+/, '').trim();
                          return cleanLine ? <li key={i} className="pl-1 leading-relaxed indent-[-1.25em] ml-[1.25em]">{cleanLine}</li> : null;
                        })}
                      </ul>
                    ) : (
                      <ul className="list-disc list-inside space-y-1">
                        {job.description && (
                          <li className="pl-1 leading-relaxed indent-[-1.25em] ml-[1.25em]">
                            {job.description.replace(/^[•*\s\-]+/, '')}
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-col w-full">
            <SectionHeader title="Skills" />
            <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 px-4 text-[13px] text-neutral-800">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-start">
                  <span className="mr-2 mt-[6px] text-[8px] leading-none text-neutral-600">•</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="flex flex-col w-full">
            <SectionHeader title="Education" />
            <div className="flex flex-col gap-4 px-1">
              {education.map((edu, index) => (
                <div key={index} className="flex flex-col text-[13px] text-neutral-800">
                  <span>{edu.degree}</span>
                  <span>
                    {edu.school}{edu.location ? ` | ${edu.location}` : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default temp9;