import React from 'react';

const temp13 = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const accomplishments = data?.accomplishments || [];
  const certifications = data?.certifications || [];

  // Parse initials for the top decorative oval badge
  const getInitials = (name) => {
    if (!name) return "JP";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  const initials = getInitials(personalInfo.fullName);

  // Helper component to render the distinctive 5-bar skill indicator
  const SkillBars = ({ level }) => {
    // Default to a solid 4 bars if level/rating isn't explicitly provided
    const rating = level ? Math.min(Math.max(parseInt(level, 10), 1), 5) : 4;
    return (
      <div className="flex gap-1 mt-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-[7px] w-7 rounded-sm ${
              i < rating ? 'bg-[#a3c2a2]' : 'bg-[#d2ded1]'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      className="w-full bg-white flex flex-row select-none text-neutral-800 font-sans tracking-normal leading-relaxed"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
    >
      
      {/* =========================================================================
          LEFT SIDEBAR PANEL (Sage Green Theme Background)
          ========================================================================= */}
      <div className="w-[36%] bg-[#e3ece2] px-8 pt-12 pb-12 flex flex-col shrink-0">
        
        {/* Decorative Initials Pill */}
        <div className="w-24 h-12 bg-[#b6cdb3] rounded-full flex items-center justify-center self-center mb-8 shadow-sm">
          <span className="text-white text-lg font-medium tracking-widest pl-1">
            {initials}
          </span>
        </div>

        {/* Candidate Full Name */}
        <h1 className="text-[2.2rem] font-normal text-neutral-800 uppercase tracking-wide leading-none mb-4 break-words">
          {personalInfo.fullName || "Jennifer Parker"}
        </h1>

        {/* Divider Line */}
        <div className="w-12 h-[1px] bg-neutral-600 mb-6" />

        {/* Contact Coordinates Block */}
        <div className="flex flex-col gap-3 text-[12.5px] text-neutral-700 mb-10">
          {personalInfo.email && (
            <div className="flex items-center gap-2.5 break-all">
              <svg className="w-3.5 h-3.5 shrink-0 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2.5">
              <svg className="w-3.5 h-3.5 shrink-0 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2.5">
              <svg className="w-3.5 h-3.5 shrink-0 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="flex flex-col mb-8">
            <h2 className="text-[14px] font-bold text-neutral-800 uppercase tracking-wider mb-3">
              Skills
            </h2>
            {skills.map((skill, index) => (
              <div key={index} className="flex flex-col text-[13px] text-neutral-800">
                <span>{skill.name}</span>
                <SkillBars level={skill.rating} />
              </div>
            ))}
          </div>
        )}

        {/* Certifications Section */}
        {certifications.length > 0 && (
          <div className="flex flex-col mb-8">
            <h2 className="text-[14px] font-bold text-neutral-800 uppercase tracking-wider mb-3">
              Certifications
            </h2>
            <ul className="list-disc list-outside ml-4 text-[12.5px] text-neutral-800 space-y-2">
              {certifications.map((cert, index) => (
                <li key={index} className="pl-0.5">
                  {typeof cert === 'string' ? cert : `${cert.name}${cert.issuer ? ` - ${cert.issuer}` : ''}`}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div className="flex flex-col">
            <h2 className="text-[14px] font-bold text-neutral-800 uppercase tracking-wider mb-3">
              Education
            </h2>
            <div className="flex flex-col gap-4 text-[12.5px] text-neutral-800">
              {education.map((edu, index) => (
                <div key={index} className="flex flex-col leading-snug">
                  <span className="font-medium">{edu.school}</span>
                  {edu.location && <span className="text-neutral-700">{edu.location}</span>}
                  <span className="text-neutral-700 mt-0.5">{edu.degree}</span>
                  {edu.graduationDate && <span className="text-neutral-600 text-[11.5px] mt-0.5">{edu.graduationDate}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          RIGHT MAIN BODY CONTENT PANEL
          ========================================================================= */}
      <div className="w-[64%] bg-[#fcfcfc] px-10 pt-16 pb-12 flex flex-col gap-8">
        
        {/* Professional Summary */}
        {summary && (
          <div className="flex flex-col">
            <h2 className="text-[15px] font-bold text-neutral-800 uppercase tracking-wider mb-3">
              Professional Summary
            </h2>
            <p className="text-[13px] text-neutral-700 leading-relaxed text-justify">
              {summary}
            </p>
          </div>
        )}

        {/* Work History */}
        {experience.length > 0 && (
          <div className="flex flex-col">
            <h2 className="text-[15px] font-bold text-neutral-800 uppercase tracking-wider mb-4">
              Work History
            </h2>
            
            <div className="flex flex-col gap-6">
              {experience.map((job, index) => (
                <div key={index} className="flex flex-col text-[13px]">
                  {/* Job Identity Line */}
                  <div className="font-semibold text-neutral-800 text-[13.5px]">
                    {job.company ? `${job.company} - ` : ""}{job.title}
                  </div>
                  {/* Meta Details Line (Location & Dates) */}
                  <div className="text-neutral-500 text-[12px] mb-2">
                    {job.location ? `${job.location}  •  ` : ""}{job.startDate} - {job.endDate || "Current"}
                  </div>
                  
                  {/* Performance / Responsibility Bullets */}
                  <div className="leading-relaxed text-neutral-700">
                    {job.description && job.description.includes('\n') ? (
                      <ul className="list-disc list-outside ml-4 space-y-1">
                        {job.description.split('\n').map((line, i) => {
                          const cleanLine = line.replace(/^[•*\s\-]+/, '').trim();
                          return cleanLine ? <li key={i} className="pl-0.5">{cleanLine}</li> : null;
                        })}
                      </ul>
                    ) : (
                      <ul className="list-disc list-outside ml-4">
                        {job.description && (
                          <li className="pl-0.5">{job.description.replace(/^[•*\s\-]+/, '')}</li>
                        )}
                      </ul>
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
            <h2 className="text-[15px] font-bold text-neutral-800 uppercase tracking-wider mb-3">
              Accomplishments
            </h2>
            <ul className="list-disc list-outside ml-4 text-[13px] text-neutral-700 space-y-1.5">
              {accomplishments.map((item, index) => (
                <li key={index} className="pl-0.5">
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

export default temp13;