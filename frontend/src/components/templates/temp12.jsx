import React from 'react';

const temp12 = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];

  // Parse initials for the logo circle
  const getInitials = (name) => {
    if (!name) return "KT";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  const initials = getInitials(personalInfo.fullName);

  // Theme Color (Coral/Salmon)
  const themeColor = "#fb7164";

  // Reusable Section Component for the timeline layout
  const TimelineSection = ({ title, children, isLast }) => (
    <div className="flex w-full relative mb-6 break-inside-avoid">
      {/* Left Column: Section Title */}
      <div className="w-[26%] pr-8 text-right shrink-0 pt-0.5">
        <h2 
          className="text-[13px] font-medium uppercase tracking-wide"
          style={{ color: themeColor }}
        >
          {title}
        </h2>
      </div>

      {/* Timeline Node (The circle) */}
      <div 
        className="absolute left-[26%] top-1.5 w-[11px] h-[11px] rounded-full border-2 bg-white z-10 transform -translate-x-1/2"
        style={{ borderColor: '#d4d4d4' }}
      />

      {/* Right Column: Content */}
      <div className="w-[74%] pl-8 flex flex-col text-[13px] text-neutral-800 pb-2">
        {children}
      </div>
    </div>
  );

  return (
    <div 
      className="w-full bg-white flex flex-col select-none text-neutral-800 font-sans tracking-normal leading-relaxed relative"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
    >
      
      {/* =========================================================================
          HEADER SECTION: Initials Circle + Name + Contact
          ========================================================================= */}
      <div className="w-full pt-16 pb-12 px-14 flex items-center gap-8">
        
        {/* Initials Logo */}
        <div 
          className="w-[85px] h-[85px] rounded-full border-[1.5px] flex items-center justify-center shrink-0"
          style={{ borderColor: themeColor }}
        >
          <span className="text-3xl font-light tracking-widest text-neutral-900 ml-1">
            {initials}
          </span>
        </div>

        {/* Name & Contact Info */}
        <div className="flex flex-col justify-center">
          <h1 
            className="text-[3.25rem] font-light leading-none mb-3 tracking-wide"
            style={{ color: themeColor }}
          >
            {personalInfo.fullName || "Karen Taylor"}
          </h1>
          
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-neutral-700">
            {personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" style={{ fill: themeColor }} viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" style={{ fill: themeColor }} viewBox="0 0 24 24">
                  <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                </svg>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" style={{ fill: themeColor }} viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>{personalInfo.email}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN CONTENT BODY: Timeline Layout
          ========================================================================= */}
      <div className="w-full px-4 relative flex-grow pb-16">
        
        {/* The Continuous Vertical Line */}
        <div 
          className="absolute top-1 bottom-16 left-[26%] w-[1.5px] bg-[#d4d4d4] transform -translate-x-1/2 z-0"
        />

        {/* Professional Summary */}
        {summary && (
          <TimelineSection title="Professional Summary">
            <p className="leading-relaxed text-justify">
              {summary}
            </p>
          </TimelineSection>
        )}

        {/* Work History */}
        {experience.length > 0 && (
          <TimelineSection title="Work History">
            <div className="flex flex-col gap-6">
              {experience.map((job, index) => (
                <div key={index} className="flex flex-col">
                  {/* Job Header inline format */}
                  <div className="flex justify-between items-start mb-0.5">
                    <span 
                      className="font-medium uppercase tracking-wide"
                      style={{ color: themeColor }}
                    >
                      {job.title}
                    </span>
                    <span className="text-neutral-700 uppercase shrink-0 ml-4 text-[12px]">
                      {job.startDate} to {job.endDate || "CURRENT"}
                    </span>
                  </div>
                  
                  {/* Company & Location */}
                  <div className="text-neutral-800 mb-2">
                    {job.company}{job.location ? ` | ${job.location}` : ""}
                  </div>

                  {/* Bullets */}
                  <div className="leading-relaxed text-neutral-800">
                    {job.description && job.description.includes('\n') ? (
                      <ul className="list-disc list-outside ml-4 space-y-1">
                        {job.description.split('\n').map((line, i) => {
                          const cleanLine = line.replace(/^[•*\s\-]+/, '').trim();
                          return cleanLine ? <li key={i} className="pl-1">{cleanLine}</li> : null;
                        })}
                      </ul>
                    ) : (
                      <ul className="list-disc list-outside ml-4 space-y-1">
                        {job.description && (
                          <li className="pl-1">{job.description.replace(/^[•*\s\-]+/, '')}</li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TimelineSection>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <TimelineSection title="Skills">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <span className="mr-2 text-neutral-800 text-[10px]">•</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </TimelineSection>
        )}

        {/* Education */}
        {education.length > 0 && (
          <TimelineSection title="Education" isLast={true}>
            <div className="flex flex-col gap-5">
              {education.map((edu, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between items-start mb-0.5">
                    <span className="text-neutral-800">
                      {edu.degree} {edu.school ? `| ${edu.school}` : ""}
                    </span>
                    <span className="text-neutral-700 shrink-0 ml-4 text-[12px]">
                      {edu.graduationDate}
                    </span>
                  </div>
                  {edu.location && (
                    <span className="text-neutral-700">
                      {edu.location}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </TimelineSection>
        )}

      </div>
    </div>
  );
};

export default temp12;