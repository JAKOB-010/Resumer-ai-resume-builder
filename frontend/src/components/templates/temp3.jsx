import React from 'react';

const temp3 = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const certifications = data?.certifications || [];
  const languages = data?.languages || [];

  return (
    <div 
      className="w-full bg-white flex flex-row select-none text-neutral-800 font-sans tracking-normal leading-relaxed"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
    >
      
      {/* =========================================================================
          LEFT SIDEBAR: Grey Theme, Stacked Name, Contact, Skills, Languages
          ========================================================================= */}
      <div className="w-[32%] bg-[#767676] text-white flex flex-col pt-12 pb-8 shrink-0">
        
        {/* Large Stacked Name */}
        <div className="px-6 mb-8">
          <h1 className="text-3xl font-normal leading-tight tracking-wide uppercase break-words">
            {personalInfo.fullName ? (
              personalInfo.fullName.split(' ').map((part, i) => (
                <span key={i} className="block">{part}</span>
              ))
            ) : (
              <>
                <span>Michael</span>
                <span className="block">Jones</span>
              </>
            )}
          </h1>
          {personalInfo.title && (
            <p className="text-xs font-light tracking-widest text-neutral-300 uppercase mt-2">
              {personalInfo.title}
            </p>
          )}
        </div>

        {/* Contact Section */}
        <div className="w-full flex flex-col mb-4">
          <div className="w-full bg-[#595959] px-6 py-1.5 text-sm font-medium tracking-wider uppercase">
            Contact
          </div>
          <div className="px-6 py-3 flex flex-col gap-3 text-xs">
            {personalInfo.location && (
              <div>
                <span className="block font-medium text-neutral-300 mb-0.5">Address</span>
                <span className="text-white font-light leading-normal">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div>
                <span className="block font-medium text-neutral-300 mb-0.5">Phone</span>
                <span className="text-white font-light">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div>
                <span className="block font-medium text-neutral-300 mb-0.5">E-mail</span>
                <span className="text-white font-light break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.website && (
              <div>
                <span className="block font-medium text-neutral-300 mb-0.5">Website</span>
                <span className="text-white font-light break-all hover:underline cursor-pointer">{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="w-full flex flex-col mb-4">
            <div className="w-full bg-[#595959] px-6 py-1.5 text-sm font-medium tracking-wider uppercase">
              Skills
            </div>
            <div className="px-6 py-4 flex flex-col gap-2">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="w-full border border-white/60 rounded-xl px-3 py-1.5 text-xs font-light tracking-wide text-white text-center leading-tight"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {languages.length > 0 && (
          <div className="w-full flex flex-col">
            <div className="w-full bg-[#595959] px-6 py-1.5 text-sm font-medium tracking-wider uppercase">
              Languages
            </div>
            <div className="px-6 py-4 flex flex-wrap gap-2">
              {languages.map((lang, index) => (
                <div 
                  key={index} 
                  className="border border-white/60 rounded-xl px-3 py-1 text-xs font-light tracking-wide text-white"
                >
                  {typeof lang === 'string' ? lang : lang.name}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          RIGHT COLUMN: Profile Statement, Multi-line Content with Grid Dates
          ========================================================================= */}
      <div className="w-[68%] bg-white p-10 pt-12 flex flex-col gap-6 flex-1">
        
        {/* Dynamic Objective/Summary Text (No Section Title Block) */}
        {summary && (
          <p className="text-[13px] text-neutral-700 font-normal leading-relaxed text-justify mb-2">
            {summary}
          </p>
        )}

        {/* Work History Section */}
        {experience.length > 0 && (
          <div className="flex flex-col w-full">
            <div className="w-full border-t border-b border-neutral-300 py-1.5 mb-4">
              <h2 className="text-lg font-normal text-neutral-500 tracking-wide">
                Work History
              </h2>
            </div>
            
            <div className="flex flex-col gap-5">
              {experience.map((job, index) => (
                <div key={index} className="w-full flex flex-row items-start text-[13px]">
                  {/* Left Asymmetric Date Grid */}
                  <div className="w-[30%] shrink-0 font-normal text-neutral-600 tracking-tight pr-4 pt-0.5">
                    {job.startDate} - <span className="block">{job.endDate || "Present"}</span>
                  </div>
                  
                  {/* Right Description Details */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-semibold text-neutral-900 text-[14px]">
                      {job.title || "Position Title"}
                    </h3>
                    <p className="text-neutral-600 font-medium mt-0.5 mb-1.5">
                      {job.company}{job.location ? `, ${job.location}` : ""}
                    </p>
                    
                    {/* Multi-line Description Parsing */}
                    <div className="text-neutral-700 leading-relaxed text-justify">
                      {job.description && job.description.includes('\n') ? (
                        <ul className="list-disc list-outside ml-4 space-y-1.5">
                          {job.description.split('\n').map((line, i) => (
                            line.trim() && <li key={i} className="pl-0.5">{line.replace(/^[•*\s\-]+/, '')}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{job.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {certifications.length > 0 && (
          <div className="flex flex-col w-full">
            <div className="w-full border-t border-b border-neutral-300 py-1.5 mb-4">
              <h2 className="text-lg font-normal text-neutral-500 tracking-wide">
                Certifications
              </h2>
            </div>
            <div className="w-full flex flex-row">
              <div className="w-[30%] shrink-0" /> {/* Synchronized structural grid offset */}
              <div className="flex-1 text-[13px]">
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-neutral-700">
                  {certifications.map((cert, index) => (
                    <li key={index} className="pl-0.5">
                      {typeof cert === 'string' ? cert : `${cert.name}${cert.institution ? ` - ${cert.institution}` : ""}`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div className="flex flex-col w-full">
            <div className="w-full border-t border-b border-neutral-300 py-1.5 mb-4">
              <h2 className="text-lg font-normal text-neutral-500 tracking-wide">
                Education
              </h2>
            </div>
            
            <div className="flex flex-col gap-4">
              {education.map((edu, index) => (
                <div key={index} className="w-full flex flex-row items-start text-[13px]">
                  {/* Left Graduation Year */}
                  <div className="w-[30%] shrink-0 font-normal text-neutral-600 tracking-tight pr-4 pt-0.5">
                    {edu.graduationDate || "Present"}
                  </div>
                  
                  {/* Right Academic Identity */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-semibold text-neutral-900 text-[14px]">
                      {edu.degree || "Degree Title"}
                    </h3>
                    <p className="text-neutral-600 mt-0.5">
                      {edu.school}{edu.location ? `, ${edu.location}` : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default temp3;