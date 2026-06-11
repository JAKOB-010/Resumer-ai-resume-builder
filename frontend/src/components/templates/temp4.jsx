import React from 'react';

const temp4 = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const accomplishments = data?.accomplishments || [];

  // Helper to format the top contact bar with separators
  const renderContactInfo = () => {
    const parts = [];
    if (personalInfo.location) parts.push(personalInfo.location);
    if (personalInfo.phone) parts.push(personalInfo.phone);
    if (personalInfo.email) parts.push(personalInfo.email);
    if (personalInfo.website) parts.push(personalInfo.website);

    return parts.map((part, index) => (
      <React.Fragment key={index}>
        <span className="px-3">{part}</span>
        {index < parts.length - 1 && <span className="text-[#CDBCA0]">|</span>}
      </React.Fragment>
    ));
  };

  return (
    <div 
      className="w-full bg-white flex flex-col select-none text-gray-900 font-sans tracking-normal leading-relaxed"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
    >
      
      {/* =========================================================================
          TOP CONTACT BAR (Beige Background)
          ========================================================================= */}
      <div className="w-full bg-[#F5F1E7] py-3.5 flex justify-center items-center text-[13px] font-medium text-gray-800">
        {renderContactInfo()}
      </div>

      <div className="w-full px-12 pt-8 pb-12 flex flex-col">
        
        {/* =========================================================================
            HEADER: Name and Optional Profile Picture
            ========================================================================= */}
        <div className="w-full flex justify-between items-start mb-6 min-h-[90px]">
          <h1 className="text-[2.75rem] font-normal uppercase tracking-wide text-black mt-2">
            {personalInfo.fullName || "AIKO LEE"}
          </h1>
          
          {personalInfo.image && (
            <div className="w-28 h-28 shrink-0 ml-4">
              <img 
                src={personalInfo.image} 
                alt={personalInfo.fullName || "Profile"} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* =========================================================================
            RESUME OBJECTIVE / SUMMARY
            ========================================================================= */}
        {summary && (
          <div className="w-full flex flex-col">
            <div className="w-full h-[1.5px] bg-[#E3D8C8] mb-6" />
            <div className="w-full flex flex-row items-start mb-6">
              <div className="w-[28%] shrink-0 pr-4">
                <h2 className="text-[13px] font-medium uppercase text-gray-800 tracking-wide">
                  Resume Objective
                </h2>
              </div>
              <div className="flex-1 text-[13px] text-gray-800 leading-relaxed text-justify">
                {summary}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            EDUCATION SECTION
            ========================================================================= */}
        {education.length > 0 && (
          <div className="w-full flex flex-col">
            <div className="w-full h-[1.5px] bg-[#E3D8C8] mb-6" />
            <div className="w-full flex flex-row items-start mb-4">
              <div className="w-[28%] shrink-0 pr-4">
                <h2 className="text-[13px] font-medium uppercase text-gray-800 tracking-wide">
                  Education
                </h2>
              </div>
              <div className="flex-1 flex flex-col gap-5">
                {education.map((edu, index) => (
                  <div key={index} className="flex flex-col text-[13px] text-gray-800">
                    <div className="font-medium">
                      {edu.school}{edu.location ? `, ${edu.location}` : ""}
                    </div>
                    <div>
                      {edu.degree || "Degree"}
                      {edu.graduationDate ? `, ${edu.graduationDate}` : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SKILLS SECTION (6-Dot Meter)
            ========================================================================= */}
        {skills.length > 0 && (
          <div className="w-full flex flex-col">
            <div className="w-full h-[1.5px] bg-[#E3D8C8] mb-6" />
            <div className="w-full flex flex-row items-start mb-4">
              <div className="w-[28%] shrink-0 pr-4">
                <h2 className="text-[13px] font-medium uppercase text-gray-800 tracking-wide">
                  Skills
                </h2>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex flex-col gap-1.5 text-[13px] text-gray-800">
                    <span>{skill.name}</span>
                    <div className="flex gap-1.5">
                      {/* Assuming a max score of 6 based on template visual */}
                      {[1, 2, 3, 4, 5, 6].map((dot) => {
                        const score = skill.level ? Math.ceil((skill.level / 5) * 6) : 4; // Map 1-5 level to 6 dots if needed, defaulting to 4
                        const isFilled = dot <= score;
                        return (
                          <div 
                            key={dot} 
                            className={`w-3 h-3 rounded-full ${
                              isFilled 
                                ? 'bg-[#CDBCA0]' 
                                : 'bg-transparent border border-[#CDBCA0]'
                            }`} 
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            WORK HISTORY SECTION
            ========================================================================= */}
        {experience.length > 0 && (
          <div className="w-full flex flex-col">
            <div className="w-full h-[1.5px] bg-[#E3D8C8] mb-6" />
            <div className="w-full flex flex-row items-start mb-4">
              <div className="w-[28%] shrink-0 pr-4">
                <h2 className="text-[13px] font-medium uppercase text-gray-800 tracking-wide">
                  Work History
                </h2>
              </div>
              <div className="flex-1 flex flex-col gap-6">
                {experience.map((job, index) => (
                  <div key={index} className="flex flex-col text-[13px] text-gray-800">
                    <div className="uppercase font-medium">
                      {job.title || "Job Title"} 
                      <span className="font-normal text-gray-600 ml-1">
                        {job.startDate} to {job.endDate || "Present"}
                      </span>
                    </div>
                    <div className="mb-2">
                      {job.company}{job.location ? `, ${job.location}` : ""}
                    </div>
                    
                    {/* Multi-line Description parsed as bullets */}
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
          </div>
        )}

        {/* =========================================================================
            ACCOMPLISHMENTS SECTION
            ========================================================================= */}
        {accomplishments.length > 0 && (
          <div className="w-full flex flex-col">
            <div className="w-full h-[1.5px] bg-[#E3D8C8] mb-6" />
            <div className="w-full flex flex-row items-start mb-4">
              <div className="w-[28%] shrink-0 pr-4">
                <h2 className="text-[13px] font-medium uppercase text-gray-800 tracking-wide">
                  Accomplishments
                </h2>
              </div>
              <div className="flex-1 text-[13px] text-gray-800 leading-relaxed">
                <ul className="list-disc list-outside ml-4 space-y-1">
                  {accomplishments.map((item, index) => (
                    <li key={index} className="pl-1">
                      {typeof item === 'string' ? item : item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default temp4;