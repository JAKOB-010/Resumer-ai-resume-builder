import React from 'react';

const temp5 = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const accomplishments = data?.accomplishments || [];

  return (
    <div 
      className="w-full bg-white flex flex-col select-none text-neutral-800 font-sans tracking-normal leading-relaxed"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
    >
      
      {/* =========================================================================
          TOP BANNER: Periwinkle Header with Centered Full Name
          ========================================================================= */}
      <div className="w-full bg-[#9ab4db] py-7 text-center">
        <h1 className="text-3xl font-normal text-white tracking-wide uppercase">
          {personalInfo.fullName || "Chris Martinez"}
        </h1>
      </div>

      {/* =========================================================================
          MAIN CONTENT BODY: Two Asymmetric Columns
          ========================================================================= */}
      <div className="w-full flex flex-row flex-1 items-stretch">
        
        {/* LEFT COLUMN: Main Profiles, Experience, Accomplishments */}
        <div className="w-[63%] p-8 pr-6 flex flex-col gap-6">
          
          {/* Resume Objective */}
          {summary && (
            <div className="flex flex-col">
              <h2 className="text-base font-medium text-neutral-700 tracking-wide">
                Resume Objective
              </h2>
              <div className="w-full h-[1px] bg-neutral-300 mt-1 mb-3" />
              <p className="text-[13px] text-neutral-600 leading-relaxed text-justify">
                {summary}
              </p>
            </div>
          )}

          {/* Work History */}
          {experience.length > 0 && (
            <div className="flex flex-col">
              <h2 className="text-base font-medium text-neutral-700 tracking-wide">
                Work History
              </h2>
              <div className="w-full h-[1px] bg-neutral-300 mt-1 mb-4" />
              
              <div className="flex flex-col gap-5">
                {experience.map((job, index) => (
                  <div key={index} className="flex flex-col text-[13px]">
                    <h3 className="font-semibold text-neutral-800">
                      {job.company}{job.title ? ` - ${job.title}` : ""}
                    </h3>
                    {job.location && (
                      <span className="text-neutral-500 font-normal block">{job.location}</span>
                    )}
                    <span className="text-neutral-500 italic text-xs block mt-0.5 mb-1.5">
                      {job.startDate} - {job.endDate || "Present"}
                    </span>
                    
                    {/* Multi-line Description Bullet Parsing */}
                    <div className="text-neutral-600 leading-relaxed text-justify">
                      {job.description && job.description.includes('\n') ? (
                        <ul className="list-disc list-outside ml-4 space-y-1">
                          {job.description.split('\n').map((line, i) => (
                            line.trim() && <li key={i} className="pl-0.5">{line.replace(/^[•*\s\-]+/, '')}</li>
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

          {/* Accomplishments */}
          {accomplishments.length > 0 && (
            <div className="flex flex-col">
              <h2 className="text-base font-medium text-neutral-700 tracking-wide">
                Accomplishments
              </h2>
              <div className="w-full h-[1px] bg-neutral-300 mt-1 mb-3" />
              <ul className="list-disc list-outside ml-4 space-y-1.5 text-[13px] text-neutral-600">
                {accomplishments.map((item, index) => (
                  <li key={index} className="pl-0.5">
                    {typeof item === 'string' ? item : item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* RIGHT SIDEBAR: Light Gray Accent background with Details */}
        <div className="w-[37%] bg-[#f4f4f4] p-6 pt-8 flex flex-col gap-6 shrink-0">
          
          {/* Contact Details */}
          <div className="flex flex-col text-[13px]">
            <h2 className="text-sm font-semibold text-neutral-700 tracking-wide mb-1">
              Contact
            </h2>
            <div className="w-full h-[1px] bg-neutral-300 mb-3" />
            
            <div className="flex flex-col gap-2.5 text-neutral-600">
              {personalInfo.email && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-neutral-700 min-w-[45px]">Email:</span>
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-neutral-700 min-w-[45px]">Phone:</span>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-neutral-700 min-w-[45px]">Address:</span>
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Education Details */}
          {education.length > 0 && (
            <div className="flex flex-col text-[13px]">
              <h2 className="text-sm font-semibold text-neutral-700 tracking-wide mb-1">
                Education
              </h2>
              <div className="w-full h-[1px] bg-neutral-300 mb-3" />
              
              <div className="flex flex-col gap-4">
                {education.map((edu, index) => (
                  <div key={index} className="flex flex-col text-neutral-600">
                    <span className="text-neutral-500 text-xs font-medium block">
                      {edu.graduationDate || "Present"}
                    </span>
                    <span className="font-semibold text-neutral-800 mt-0.5">{edu.school}</span>
                    {edu.location && <span className="text-xs text-neutral-500 block">{edu.location}</span>}
                    <span className="text-neutral-700 mt-0.5">{edu.degree}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pill Styled Skills */}
          {skills.length > 0 && (
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold text-neutral-700 tracking-wide mb-1">
                Skills
              </h2>
              <div className="w-full h-[1px] bg-neutral-300 mb-3" />
              
              <div className="flex flex-wrap gap-2 pt-1">
                {skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="bg-[#eaf2fc] border border-[#cbdbe6] text-neutral-700 text-xs px-3 py-1.5 rounded-full font-normal tracking-wide"
                  >
                    {skill.name}
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

export default temp5;