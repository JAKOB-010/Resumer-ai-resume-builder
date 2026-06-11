import React from 'react';

const temp16 = ({ data }) => {
  // Defensive assignment with clean fallbacks
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || data?.objective || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const accomplishments = data?.accomplishments || [];

  return (
    <div 
      className="w-full bg-white select-none font-sans text-neutral-900 tracking-normal antialiased"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}
    >
      <div className="flex flex-row items-stretch min-h-[297mm]">
        
        {/* =========================================================================
            LEFT COLUMN (Sidebar - 32% Width)
            ========================================================================= */}
        <div className="w-[32%] bg-[#484848] flex flex-col relative">
          
          {/* Top White Section for Image Overlap */}
          <div className="h-[120px] bg-white w-full shrink-0"></div>

          {/* Profile Image Wrapper - Absolute Positioned */}
          <div className="absolute top-[56px] left-0 w-full flex justify-center">
            {personalInfo.profileImage ? (
              <img 
                src={personalInfo.profileImage} 
                alt={personalInfo.fullName || "Profile"} 
                className="w-[130px] h-[130px] rounded-full object-cover border-[6px] border-[#484848] bg-neutral-200"
              />
            ) : (
              <div className="w-[130px] h-[130px] rounded-full border-[6px] border-[#484848] bg-neutral-600 flex items-center justify-center">
                <svg className="w-16 h-16 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5-4-8-4z" />
                </svg>
              </div>
            )}
          </div>

          {/* Sidebar Content */}
          <div className="pt-[80px] px-8 pb-12 flex flex-col text-white flex-1">
            
            {/* Contact Details Section */}
            <div className="flex flex-col gap-5 text-[12px] text-white mb-8 break-all">
              {personalInfo.email && (
                <div className="flex flex-col gap-1">
                  <div className="w-5 h-5 rounded-full bg-white text-[#484848] flex items-center justify-center font-bold text-[11px]">
                    @
                  </div>
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex flex-col gap-1">
                  <div className="w-5 h-5 rounded-full bg-white text-[#484848] flex items-center justify-center">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                    </svg>
                  </div>
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex flex-col gap-1">
                  <div className="w-5 h-5 rounded-full bg-white text-[#484848] flex items-center justify-center">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>

            {/* Sidebar Divider */}
            <hr className="border-t-[1.5px] border-white/80 mb-6" />

            {/* Education Block */}
            {education.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-[14px] font-medium tracking-wide uppercase text-white mb-2">
                  Education
                </h2>
                <div className="flex flex-col gap-6 text-[12px]">
                  {education.map((edu, index) => (
                    <div key={index} className="flex flex-col leading-snug page-break-inside-avoid">
                      <span className="font-medium text-white mb-1">
                        {edu.degree}
                      </span>
                      <span className="text-white/90">
                        {edu.school}{edu.location ? `, ${edu.location}` : ""}
                      </span>
                      <span className="text-white/90 mt-0.5">
                        {edu.graduationDate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN (Main Content Body - 68% Width)
            ========================================================================= */}
        <div className="w-[68%] flex flex-col bg-white">
          
          {/* Pale Pink Header Block */}
          <div className="bg-[#fadcd9] w-full h-[120px] flex items-center px-10 shrink-0">
            <h1 className="text-[28px] sm:text-[32px] font-normal tracking-wider text-black uppercase break-words leading-tight">
              {personalInfo.fullName || "Min Rodriguez"}
            </h1>
          </div>

          {/* Core Content Area */}
          <div className="px-10 py-10 flex flex-col flex-grow gap-6">
            
            {/* Resume Objective */}
            {summary && (
              <div className="page-break-inside-avoid">
                <h2 className="text-[14px] font-medium text-black uppercase tracking-wide mb-3">
                  Resume Objective
                </h2>
                <p className="text-[12px] text-neutral-800 leading-relaxed text-justify">
                  {summary}
                </p>
                <hr className="border-t-[1.5px] border-black mt-6" />
              </div>
            )}

            {/* Skills Block */}
            {skills.length > 0 && (
              <div className="page-break-inside-avoid">
                <h2 className="text-[14px] font-medium text-black uppercase tracking-wide mb-3">
                  Skills
                </h2>
                <ul className="list-disc list-inside text-[12px] text-neutral-800 space-y-1">
                  {skills.map((skill, index) => (
                    <li key={index}>
                      {typeof skill === 'string' ? skill : skill.name}
                    </li>
                  ))}
                </ul>
                <hr className="border-t-[1.5px] border-black mt-6" />
              </div>
            )}

            {/* Work History Block */}
            {experience.length > 0 && (
              <div>
                <h2 className="text-[14px] font-medium text-black uppercase tracking-wide mb-4">
                  Work History
                </h2>
                
                <div className="flex flex-col gap-6">
                  {experience.map((job, index) => (
                    <div key={index} className="flex flex-col text-[12px] page-break-inside-avoid">
                      
                      {/* Job Date Range */}
                      <div className="text-neutral-800 mb-0.5">
                        {job.startDate} - {job.endDate || "Current"}
                      </div>

                      {/* Company & Role Headline */}
                      <div className="text-neutral-900 font-medium mb-2">
                        {job.company}{job.title ? ` - ${job.title}` : ""}{job.location ? `, ${job.location}` : ""}
                      </div>

                      {/* Job Descriptions */}
                      {job.description && (
                        <div className="text-neutral-800 leading-relaxed">
                          {job.description.includes('\n') ? (
                            <ul className="list-disc list-inside space-y-1 pl-1">
                              {job.description.split('\n').map((line, i) => {
                                const cleanLine = line.replace(/^[•*\s\-]+/, '').trim();
                                return cleanLine ? <li key={i}>{cleanLine}</li> : null;
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
                {accomplishments.length > 0 && (
                  <hr className="border-t-[1.5px] border-black mt-6" />
                )}
              </div>
            )}

            {/* Accomplishments Block */}
            {accomplishments.length > 0 && (
              <div className="page-break-inside-avoid">
                <h2 className="text-[14px] font-medium text-black uppercase tracking-wide mb-3">
                  Accomplishments
                </h2>
                <ul className="list-disc list-inside text-[12px] text-neutral-800 space-y-1">
                  {accomplishments.map((item, index) => (
                    <li key={index}>
                      {typeof item === 'string' ? item : item.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default temp16;