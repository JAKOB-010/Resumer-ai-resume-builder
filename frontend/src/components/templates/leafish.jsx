import React from 'react';

const Leafish = ({ data }) => {
  // Defensive fallbacks for the unified data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];

  return (
    <div 
      className="w-full bg-white flex flex-col select-none font-sans text-slate-800 leading-relaxed"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto' }}
    >
      
      {/* =========================================================================
          HEADER SECTION: Two-tone background bands with Summary embedded
          ========================================================================= */}
      <div className="w-full flex flex-col">
        
        {/* Top Header Intro: Pale background, Photo + Identity + Summary */}
        <div className="bg-emerald-50/60 px-10 py-10 flex flex-row items-start gap-8">
          {personalInfo.image && (
            <img 
              src={personalInfo.image} 
              alt={personalInfo.fullName || "Profile"} 
              className="w-28 h-28 rounded-full object-cover shadow-sm border border-emerald-100 shrink-0 mt-1"
            />
          )}
          
          <div className="flex flex-col flex-1">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            <p className="text-[15px] font-semibold text-emerald-700 mt-1 mb-4">
              {personalInfo.title || "Professional Title"}
            </p>
            
            {/* In Leafish, the summary is uniquely placed inside the header block */}
            {summary && (
              <p className="text-[13px] text-slate-700 leading-relaxed text-justify">
                {summary}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Header Contact Band: Slightly darker background */}
        <div className="bg-emerald-100/60 px-10 py-3.5 flex flex-row flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-medium text-emerald-900">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-700 font-bold">✉</span> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-700 font-bold">📞</span> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-700 font-bold">📍</span> {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1.5">
              <span className="text-emerald-700 font-bold">🌐</span> {personalInfo.website}
            </span>
          )}
        </div>
      </div>

      {/* =========================================================================
          BODY SECTION: Two Column Layout (Main and Sidebar)
          ========================================================================= */}
      <div className="flex flex-row px-10 py-8 gap-10 flex-1">
        
        {/* MAIN COLUMN (approx 65% width) */}
        <div className="w-[65%] flex flex-col gap-7">
          
          {/* Experience Section */}
          {experience.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-[13px] font-bold text-emerald-700 uppercase tracking-widest border-b border-emerald-600 pb-1.5">
                Experience
              </h2>
              <div className="flex flex-col gap-5">
                {experience.map((job, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900 text-[14px]">
                        {job.title || "Position Title"}
                      </h3>
                      <span className="text-[11px] font-bold text-emerald-600/80 uppercase tracking-wider whitespace-nowrap pl-4">
                        {job.startDate} — {job.endDate || "Present"}
                      </span>
                    </div>
                    <p className="text-[13px] text-emerald-800 font-medium">
                      {job.company || "Company / Organization"}
                    </p>
                    <p className="text-[13px] text-slate-600 leading-relaxed text-justify mt-1 whitespace-pre-line">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-[13px] font-bold text-emerald-700 uppercase tracking-widest border-b border-emerald-600 pb-1.5">
                Education
              </h2>
              <div className="flex flex-col gap-4">
                {education.map((edu, index) => (
                  <div key={index} className="flex flex-col gap-0.5">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900 text-[14px]">{edu.degree || "Degree Title"}</h3>
                      <span className="text-[11px] font-bold text-emerald-600/80 uppercase tracking-wider whitespace-nowrap pl-4">
                        {edu.graduationDate}
                      </span>
                    </div>
                    <p className="text-[13px] text-emerald-800 font-medium">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR COLUMN (approx 35% width) */}
        <div className="w-[35%] flex flex-col gap-7">
          
          {/* Skills Section */}
          {skills.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-[13px] font-bold text-emerald-700 uppercase tracking-widest border-b border-emerald-600 pb-1.5">
                Skills
              </h2>
              <div className="flex flex-col gap-2.5">
                {skills.map((skill, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <span className="text-[13px] font-semibold text-slate-800">
                      {skill.name}
                    </span>
                    {/* Simulated level indicator native to reactive-resume templates */}
                    <div className="flex flex-row gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div 
                          key={level} 
                          className={`w-full h-1.5 rounded-sm ${
                            level <= 4 ? 'bg-emerald-600' : 'bg-emerald-100' // Hardcoding visual level of 4/5 for demo
                          }`}
                        />
                      ))}
                    </div>
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

export default Leafish;