import React from 'react';

const temp10 = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const socialLinks = data?.socialLinks || [];

  // Reusable Section Header Component
  const SectionHeader = ({ title }) => (
    <h2 className="text-[#3ac2b5] text-[14px] font-medium uppercase tracking-widest mb-3">
      {title}
    </h2>
  );

  return (
    <div 
      className="w-full bg-white flex flex-col select-none text-neutral-800 font-sans tracking-normal leading-relaxed"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
    >
      
      {/* =========================================================================
          HEADER SECTION: Mint colored bar + Bordered Name Box
          ========================================================================= */}
      <div className="w-full relative flex flex-col items-center">
        {/* Top colored background block */}
        <div className="w-full h-[90px] bg-[#d0f4ef] absolute top-0 left-0" />
        
        {/* Name Box - overlapping the boundary */}
        <div className="relative mt-[50px] bg-white border-[1.5px] border-neutral-600 px-14 py-4 z-10 flex justify-center items-center">
          <h1 className="text-[3.25rem] font-normal text-neutral-800 leading-none tracking-wide">
            {personalInfo.fullName || "Sean Adams"}
          </h1>
        </div>

        {/* Contact Info */}
        <div className="mt-6 mb-2 text-[12px] text-neutral-700 flex flex-wrap justify-center items-center gap-x-2 px-10">
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
          MAIN CONTENT BODY: Two Column Layout
          ========================================================================= */}
      <div className="w-full px-14 py-10 flex flex-row gap-12">
        
        {/* LEFT COLUMN: Summary & Work History (65%) */}
        <div className="w-[63%] flex flex-col gap-8">
          
          {/* Professional Summary */}
          {summary && (
            <div className="flex flex-col">
              <SectionHeader title="Professional Summary" />
              <p className="text-[13px] text-neutral-700 leading-relaxed text-justify">
                {summary}
              </p>
            </div>
          )}

          {/* Work History */}
          {experience.length > 0 && (
            <div className="flex flex-col">
              <SectionHeader title="Work History" />
              
              <div className="flex flex-col gap-6">
                {experience.map((job, index) => (
                  <div key={index} className="flex flex-col text-[13px]">
                    <div className="text-neutral-800">
                      {job.title}{job.location ? `, ${job.location}` : ""}
                    </div>
                    <div className="text-neutral-700 mb-2">
                      {job.company} &nbsp; {job.startDate} - {job.endDate || "Current"}
                    </div>
                    
                    {/* Multi-line Description Parsing for Bullets */}
                    <div className="leading-relaxed text-neutral-700">
                      {job.description && job.description.includes('\n') ? (
                        <ul className="list-disc list-outside ml-4 space-y-1">
                          {job.description.split('\n').map((line, i) => {
                            const cleanLine = line.replace(/^[•*\s\-]+/, '').trim();
                            return cleanLine ? <li key={i} className="pl-1">{cleanLine}</li> : null;
                          })}
                        </ul>
                      ) : (
                        <ul className="list-disc list-outside ml-4">
                          {job.description && (
                            <li className="pl-1">{job.description.replace(/^[•*\s\-]+/, '')}</li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Skills, Education, Profiles (37%) */}
        <div className="w-[37%] flex flex-col gap-8">
          
          {/* Skills */}
          {skills.length > 0 && (
            <div className="flex flex-col">
              <SectionHeader title="Skills" />
              <ul className="list-disc list-outside ml-4 text-[13px] text-neutral-700 space-y-1.5 leading-snug">
                {skills.map((skill, index) => (
                  <li key={index} className="pl-1">
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="flex flex-col">
              <SectionHeader title="Education" />
              <div className="flex flex-col gap-5">
                {education.map((edu, index) => (
                  <div key={index} className="flex flex-col text-[13px] text-neutral-700 leading-snug">
                    <span>{edu.school}</span>
                    {edu.location && <span>{edu.location}</span>}
                    <span className="mt-1">{edu.degree}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Websites, Portfolios, Profiles */}
          {socialLinks.length > 0 && (
            <div className="flex flex-col">
              <SectionHeader title="Websites, Portfolios, Profiles" />
              <ul className="list-disc list-outside ml-4 text-[13px] text-neutral-700 space-y-1.5">
                {socialLinks.map((link, index) => (
                  <li key={index} className="pl-1 break-all">
                    {typeof link === 'string' ? link : link.url}
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

export default temp10;