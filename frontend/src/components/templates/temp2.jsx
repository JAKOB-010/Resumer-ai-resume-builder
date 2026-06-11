import React from 'react';

const temp2 = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];
  const accomplishments = data?.accomplishments || [];

  return (
    <div 
      className="w-full bg-white flex flex-col select-none text-slate-800 font-sans tracking-normal leading-relaxed p-12 gap-6 relative"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto' }}
    >
      
      {/* =========================================================================
          HEADER SECTION: Centered Typography with Absolute Positioned Avatar
          ========================================================================= */}
      <div className="w-full flex flex-col items-center justify-center text-center pt-4 pb-2 relative z-10 min-h-[100px]">
        {/* Centered Name & Identity */}
        <h1 className="text-3xl font-light tracking-widest text-sky-500 uppercase">
          {personalInfo.fullName ? (
            <>
              {personalInfo.fullName.split(' ')[0]}{' '}
              <span className="font-medium">{personalInfo.fullName.split(' ').slice(1).join(' ')}</span>
            </>
          ) : (
            "Olivia Martinez"
          )}
        </h1>
        
        {personalInfo.title && (
          <p className="text-xs font-semibold text-slate-500 tracking-wider uppercase mt-1">
            {personalInfo.title}
          </p>
        )}

        {/* Compact Center-Aligned Contact Row */}
        <div className="text-xs text-slate-600 font-normal mt-4 flex flex-col gap-1">
          {personalInfo.location && <div>{personalInfo.location}</div>}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.phone && personalInfo.email && <span>-</span>}
            {personalInfo.email && <span className="text-slate-600">{personalInfo.email}</span>}
            {(personalInfo.email || personalInfo.phone) && personalInfo.website && <span>-</span>}
            {personalInfo.website && <span className="text-sky-600 hover:underline">{personalInfo.website}</span>}
          </div>
        </div>

        {/* Floating Top-Right Circular Avatar */}
        {personalInfo.image && (
          <div className="absolute top-0 right-2 w-24 h-24 rounded-full overflow-hidden border border-slate-100 shadow-sm shrink-0">
            <img 
              src={personalInfo.image} 
              alt={personalInfo.fullName || "Profile Avatar"} 
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
          <div className="flex items-center gap-4 w-full">
            <h2 className="text-[13px] font-semibold text-sky-500 uppercase tracking-widest shrink-0">
              Resume Objective
            </h2>
            <div className="h-[1.5px] bg-sky-400 flex-1" />
          </div>
          <div className="w-full flex flex-row mt-2.5">
            <div className="w-[160px] shrink-0" /> {/* Spacer column matching the structural grid */}
            <div className="flex-1 text-[13px] text-slate-700 leading-relaxed text-justify">
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
          <div className="flex items-center gap-4 w-full">
            <h2 className="text-[13px] font-semibold text-sky-500 uppercase tracking-widest shrink-0">
              Education
            </h2>
            <div className="h-[1.5px] bg-sky-400 flex-1" />
          </div>
          
          <div className="w-full flex flex-col gap-4 mt-2.5">
            {education.map((edu, index) => (
              <div key={index} className="w-full flex flex-row items-start">
                {/* Left Date Anchor */}
                <div className="w-[160px] shrink-0 text-[13px] font-semibold text-slate-700">
                  {edu.graduationDate || "Present"}
                </div>
                {/* Right Academic Details */}
                <div className="flex-1 text-[13px]">
                  <h3 className="font-semibold text-slate-900">{edu.degree || "Degree Title"}</h3>
                  <p className="text-slate-600 mt-0.5">{edu.school}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          SKILLS MATRIX (Dynamic Block Dashboard Grid)
          ========================================================================= */}
      {skills.length > 0 && (
        <div className="w-full flex flex-col">
          <div className="flex items-center gap-4 w-full">
            <h2 className="text-[13px] font-semibold text-sky-500 uppercase tracking-widest shrink-0">
              Skills
            </h2>
            <div className="h-[1.5px] bg-sky-400 flex-1" />
          </div>

          <div className="w-full flex flex-row mt-2.5">
            <div className="w-[160px] shrink-0" />
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {skills.map((skill, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <span className="text-[13px] font-medium text-slate-800">{skill.name}</span>
                    {/* Modern Segmented Segment Indicators */}
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((block) => (
                        <div 
                          key={block}
                          className={`h-1.5 w-7 rounded-sm ${block <= (skill.level || 4) ? 'bg-sky-400' : 'bg-slate-200/70'}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          WORK HISTORY SECTION
          ========================================================================= */}
      {experience.length > 0 && (
        <div className="w-full flex flex-col">
          <div className="flex items-center gap-4 w-full">
            <h2 className="text-[13px] font-semibold text-sky-500 uppercase tracking-widest shrink-0">
              Work History
            </h2>
            <div className="h-[1.5px] bg-sky-400 flex-1" />
          </div>

          <div className="w-full flex flex-col gap-5 mt-2.5">
            {experience.map((job, index) => (
              <div key={index} className="w-full flex flex-row items-start">
                {/* Left Timeline Dates */}
                <div className="w-[160px] shrink-0 text-[13px] font-semibold text-slate-700 tracking-tight pr-4">
                  {job.startDate} to {job.endDate || "Present"}
                </div>
                
                {/* Right Corporate Descriptions */}
                <div className="flex-1 text-[13px]">
                  <h3 className="font-semibold text-slate-900">{job.title || "Position Title"}</h3>
                  <p className="text-slate-600 font-medium mt-0.5 mb-2">
                    {job.company}{job.location ? ` - ${job.location}` : ""}
                  </p>
                  
                  {/* Standardized multi-line list rendering */}
                  <div className="text-slate-700 leading-relaxed text-justify">
                    {job.description && job.description.includes('\n') ? (
                      <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
                        {job.description.split('\n').map((line, i) => (
                          line.trim() && <li key={i} className="pl-1">{line.replace(/^[•*\s\-]+/, '')}</li>
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

      {/* =========================================================================
          ACCOMPLISHMENTS SECTION
          ========================================================================= */}
      {accomplishments.length > 0 && (
        <div className="w-full flex flex-col">
          <div className="flex items-center gap-4 w-full">
            <h2 className="text-[13px] font-semibold text-sky-500 uppercase tracking-widest shrink-0">
              Accomplishments
            </h2>
            <div className="h-[1.5px] bg-sky-400 flex-1" />
          </div>

          <div className="w-full flex flex-row mt-2.5">
            <div className="w-[160px] shrink-0" />
            <div className="flex-1 text-[13px]">
              <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
                {accomplishments.map((item, index) => (
                  <li key={index} className="pl-1 text-justify">
                    {typeof item === 'string' ? item : item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default temp2;