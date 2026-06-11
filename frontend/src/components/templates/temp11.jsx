import React from 'react';

const temp11 = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const accomplishments = data?.accomplishments || [];
  const certifications = data?.certifications || [];

  // Reusable layout component for the two-column row design
  const SectionRow = ({ title, children }) => (
    <div className="flex flex-row w-full mb-8">
      {/* Left Column: Section Title */}
      <div className="w-[25%] pr-6 text-right shrink-0 pt-0.5">
        <h2 className="text-[#2c7a2c] text-[13px] font-medium uppercase tracking-widest">
          {title}
        </h2>
      </div>
      {/* Right Column: Content */}
      <div className="w-[75%] flex flex-col text-[13px] text-neutral-800">
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
          HEADER SECTION: Centered Photo, Name, and Contact
          ========================================================================= */}
      <div className="w-full pt-16 pb-12 flex flex-col items-center text-center px-10">
        
        {/* Profile Picture (conditionally rendered if provided) */}
        {personalInfo.photoUrl && (
          <img 
            src={personalInfo.photoUrl} 
            alt="Profile" 
            className="w-24 h-24 object-cover mb-5 border border-neutral-300"
          />
        )}

        {/* Name */}
        <h1 className="text-[3.5rem] font-normal text-[#4a4a4a] uppercase tracking-wider leading-none mb-4">
          {personalInfo.fullName || "SUKI DAVIS"}
        </h1>
        
        {/* Contact Info */}
        <div className="text-[13px] text-neutral-600 flex flex-wrap justify-center items-center gap-x-2">
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
          MAIN CONTENT BODY: Two-Column Row Layout
          ========================================================================= */}
      <div className="w-full px-10 pb-16 flex flex-col">
        
        {/* Professional Summary */}
        {summary && (
          <SectionRow title="Professional Summary">
            <p className="leading-relaxed text-justify">
              {summary}
            </p>
          </SectionRow>
        )}

        {/* Work History */}
        {experience.length > 0 && (
          <SectionRow title="Work History">
            <div className="flex flex-col gap-6">
              {experience.map((job, index) => (
                <div key={index} className="flex flex-col">
                  {/* Job Header inline format */}
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-neutral-800">
                      {job.title} 
                      {job.company ? ` | ${job.company}` : ""} 
                      {job.location ? ` - ${job.location}` : ""}
                    </span>
                    <span className="text-neutral-600 shrink-0 ml-4">
                      {job.startDate} - {job.endDate || "Current"}
                    </span>
                  </div>
                  
                  {/* Bullets */}
                  <div className="leading-relaxed text-neutral-700">
                    {job.description && job.description.includes('\n') ? (
                      <ul className="list-disc list-outside ml-5 space-y-1">
                        {job.description.split('\n').map((line, i) => {
                          const cleanLine = line.replace(/^[•*\s\-]+/, '').trim();
                          return cleanLine ? <li key={i} className="pl-1">{cleanLine}</li> : null;
                        })}
                      </ul>
                    ) : (
                      <ul className="list-disc list-outside ml-5 space-y-1">
                        {job.description && (
                          <li className="pl-1">{job.description.replace(/^[•*\s\-]+/, '')}</li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SectionRow>
        )}

        {/* Accomplishments */}
        {accomplishments.length > 0 && (
          <SectionRow title="Accomplishments">
            <ul className="list-disc list-outside ml-5 space-y-1.5 leading-relaxed text-neutral-700">
              {accomplishments.map((item, index) => (
                <li key={index} className="pl-1">
                  {typeof item === 'string' ? item : item.name}
                </li>
              ))}
            </ul>
          </SectionRow>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <SectionRow title="Skills">
            <ul className="list-disc list-outside ml-5 space-y-1.5 leading-relaxed text-neutral-700">
              {skills.map((skill, index) => (
                <li key={index} className="pl-1">
                  {skill.name}
                </li>
              ))}
            </ul>
          </SectionRow>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <SectionRow title="Certifications">
            <ul className="list-disc list-outside ml-5 space-y-1.5 leading-relaxed text-neutral-700">
              {certifications.map((cert, index) => (
                <li key={index} className="pl-1">
                  {typeof cert === 'string' ? cert : `${cert.name}${cert.issuer ? ` - ${cert.issuer}` : ''}`}
                </li>
              ))}
            </ul>
          </SectionRow>
        )}

        {/* Education */}
        {education.length > 0 && (
          <SectionRow title="Education">
            <div className="flex flex-col gap-5">
              {education.map((edu, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between items-start mb-0.5">
                    <span className="font-medium text-neutral-800">
                      {edu.school}{edu.location ? `, ${edu.location}` : ""}
                    </span>
                    <span className="text-neutral-600 shrink-0 ml-4">
                      {edu.graduationDate}
                    </span>
                  </div>
                  <span className="text-neutral-700">
                    {edu.degree}
                  </span>
                </div>
              ))}
            </div>
          </SectionRow>
        )}

      </div>
    </div>
  );
};

export default temp11;