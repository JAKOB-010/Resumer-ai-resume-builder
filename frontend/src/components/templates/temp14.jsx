import React from 'react';

const temp14 = ({ data }) => {
  // Defensive fallbacks for data properties
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const accomplishments = data?.accomplishments || [];
  const certifications = data?.certifications || [];
  const languages = data?.languages || [];

  // Generate initials for the header badge
  const getInitials = (name) => {
    if (!name) return "DK";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  const initials = getInitials(personalInfo.fullName);

  // Helper component for the 5-dot rating scale (Skills & Languages)
  const Dots = ({ level }) => {
    const rating = level ? Math.min(Math.max(parseInt(level, 10), 1), 5) : 4;
    return (
      <div className="flex gap-1.5 mt-1.5 mb-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${
              i < rating ? 'bg-neutral-700' : 'bg-neutral-200'
            }`}
          />
        ))}
      </div>
    );
  };

  // Reusable Timeline Section component
  // Renders the section header and the connecting node on the timeline
  const TimelineSection = ({ title, children }) => (
    <div className="relative pl-7 mb-8 page-break-inside-avoid">
      {/* Timeline Node */}
      <div className="absolute w-[11px] h-[11px] bg-white border-[1.5px] border-neutral-400 rounded-full -left-[6px] top-1 z-10" />
      
      {/* Section Title */}
      <h2 className="text-[13px] font-medium text-neutral-800 uppercase tracking-[0.15em] mb-4">
        {title}
      </h2>
      
      {/* Section Content */}
      <div>{children}</div>
    </div>
  );

  return (
    <div 
      className="w-full bg-white select-none text-neutral-800 font-sans tracking-normal leading-relaxed pb-12"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
    >
      
      {/* =========================================================================
          HEADER SECTION
          ========================================================================= */}
      <div className="px-12 pt-14 pb-8 flex items-start gap-6">
        
        {/* Abstract Dark Rounded Badge for Initials */}
        <div className="w-[72px] h-[72px] bg-[#323639] rounded-2xl rounded-tl-sm flex shrink-0 items-center justify-center relative shadow-sm mt-1">
          <span className="text-white text-2xl font-medium tracking-wide">
            {initials}
          </span>
        </div>

        {/* Name and Contact Information */}
        <div className="flex flex-col justify-center">
          <h1 className="text-[2.6rem] font-normal text-neutral-800 leading-none mb-3 tracking-tight">
            {personalInfo.fullName || "David Kim"}
          </h1>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12.5px] text-neutral-700 font-medium">
            {personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-neutral-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-neutral-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-neutral-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>{personalInfo.email}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          BODY / MAIN GRID 
          ========================================================================= */}
      <div className="px-12 flex flex-row gap-10">
        
        {/* --- LEFT COLUMN (55%) --- */}
        <div className="w-[55%] relative">
          {/* Continuous vertical timeline line for Left Column */}
          <div className="absolute left-[-1px] top-2 bottom-4 w-[1px] bg-neutral-300 z-0" />

          {/* Professional Summary */}
          {summary && (
            <TimelineSection title="Professional Summary">
              <p className="text-[12.5px] text-neutral-700 leading-relaxed text-justify">
                {summary}
              </p>
            </TimelineSection>
          )}

          {/* Work History */}
          {experience.length > 0 && (
            <TimelineSection title="Work History">
              <div className="flex flex-col gap-6">
                {experience.map((job, index) => (
                  <div key={index} className="flex flex-col text-[12.5px]">
                    <span className="font-medium text-neutral-800 uppercase tracking-wide">
                      {job.title}
                    </span>
                    <span className="text-neutral-500 mt-0.5 mb-1.5">
                      {job.startDate} to {job.endDate || "Current"}
                    </span>
                    <span className="text-neutral-700 mb-2">
                      {job.company}{job.location ? ` | ${job.location}` : ""}
                    </span>
                    
                    {/* Job Description Bullets */}
                    <div className="text-neutral-700 leading-relaxed">
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
            </TimelineSection>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <TimelineSection title="Skills">
              <div className="flex flex-col gap-3">
                {skills.map((skill, index) => (
                  <div key={index} className="flex flex-col text-[12.5px] text-neutral-800">
                    <span className="font-medium">{skill.name}</span>
                    <Dots level={skill.rating} />
                  </div>
                ))}
              </div>
            </TimelineSection>
          )}
        </div>

        {/* --- RIGHT COLUMN (45%) --- */}
        <div className="w-[45%] relative">
          {/* Continuous vertical timeline line for Right Column */}
          <div className="absolute left-[-1px] top-2 bottom-4 w-[1px] bg-neutral-300 z-0" />

          {/* Certifications */}
          {certifications.length > 0 && (
            <TimelineSection title="Certifications">
              <ul className="list-disc list-outside ml-4 text-[12.5px] text-neutral-700 space-y-2">
                {certifications.map((cert, index) => (
                  <li key={index} className="pl-1 leading-relaxed">
                    {typeof cert === 'string' ? cert : `${cert.name}${cert.issuer ? ` - ${cert.issuer}` : ''}`}
                  </li>
                ))}
              </ul>
            </TimelineSection>
          )}

          {/* Education */}
          {education.length > 0 && (
            <TimelineSection title="Education">
              <div className="flex flex-col gap-6">
                {education.map((edu, index) => (
                  <div key={index} className="flex flex-col text-[12.5px]">
                    <span className="font-medium text-neutral-800 leading-snug mb-1">
                      {edu.degree}
                    </span>
                    {edu.graduationDate && (
                      <span className="text-neutral-500 mb-1">
                        {edu.graduationDate}
                      </span>
                    )}
                    <span className="text-neutral-700">
                      {edu.school}{edu.location ? `, ${edu.location}` : ""}
                    </span>
                  </div>
                ))}
              </div>
            </TimelineSection>
          )}

          {/* Accomplishments */}
          {accomplishments.length > 0 && (
            <TimelineSection title="Accomplishments">
              <ul className="list-disc list-outside ml-4 text-[12.5px] text-neutral-700 space-y-2">
                {accomplishments.map((item, index) => (
                  <li key={index} className="pl-1 leading-relaxed">
                    {typeof item === 'string' ? item : item.name}
                  </li>
                ))}
              </ul>
            </TimelineSection>
          )}

          {/* Languages (If available in data) */}
          {languages && languages.length > 0 && (
            <TimelineSection title="Languages">
              <div className="flex flex-col gap-3">
                {languages.map((lang, index) => {
                  // Accommodate string array or object array
                  const langName = typeof lang === 'string' ? lang : lang.name;
                  const langRating = typeof lang === 'string' ? 5 : (lang.rating || 4);
                  const langLevel = typeof lang === 'string' ? '' : (lang.level || '');
                  
                  return (
                    <div key={index} className="flex flex-col text-[12.5px] text-neutral-800">
                      <span className="font-medium">{langName}</span>
                      <Dots level={langRating} />
                      {langLevel && <span className="text-neutral-500 mt-1">{langLevel}</span>}
                    </div>
                  );
                })}
              </div>
            </TimelineSection>
          )}

        </div>
      </div>
      
    </div>
  );
};

export default temp14;