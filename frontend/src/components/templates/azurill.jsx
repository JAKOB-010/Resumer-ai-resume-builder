import React from 'react';

const Azurill = ({ data }) => {
  // Safe extraction of values from your data schema
  const personalInfo = data?.personalInfo || {};
  const summary = data?.summary || "";
  const experience = data?.experience || [];
  const education = data?.education || [];
  const skills = data?.skills || [];

  return (
    <div 
      className="w-full bg-white text-gray-800 p-8 font-sans leading-relaxed tracking-normal select-none"
      style={{ maxWidth: '210mm', minHeight: '297mm', margin: '0 auto' }}
    >
      {/* =========================================================================
          HEADER SECTION (Centered Avatar, Title, and Inline Contact Information)
          ========================================================================= */}
      <div className="flex flex-col items-center text-center border-b pb-6 mb-6 border-gray-100">
        {personalInfo.image && (
          <img 
            src={personalInfo.image} 
            alt={personalInfo.fullName || "Profile"} 
            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-600 shadow-sm mb-4"
          />
        )}
        
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        
        <p className="text-md font-medium text-indigo-600 mb-4 tracking-wide uppercase text-sm">
          {personalInfo.title || "Professional Title"}
        </p>

        {/* Responsive, wrapped flex row for standard metadata */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs text-gray-500">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <span className="text-indigo-500">✉</span> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <span className="text-indigo-500">📞</span> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <span className="text-indigo-500">📍</span> {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <span className="text-indigo-500">🌐</span> {personalInfo.website}
            </span>
          )}
        </div>
      </div>

      {/* =========================================================================
          MAIN LAYOUT GRID (Asymmetric Structural Presentation)
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Sidebar Profiles (1/3 Width Layout) */}
        <div className="md:col-span-1 space-y-6">
          
          {/* Core Technical Skills Block */}
          <div>
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3 border-b pb-1 border-gray-100">
              Skills
            </h2>
            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-gray-50 text-gray-700 px-2.5 py-1 rounded-md border border-gray-100 font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No skills listed.</p>
            )}
          </div>

          {/* Academic Background Block */}
          <div>
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3 border-b pb-1 border-gray-100">
              Education
            </h2>
            {education.length > 0 ? (
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index} className="text-xs">
                    <p className="font-bold text-gray-900">{edu.degree || "Degree"}</p>
                    <p className="text-gray-600 font-medium">{edu.school || "Institution"}</p>
                    <p className="text-gray-400 mt-0.5">{edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No education listed.</p>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Chronological / Explanatory Flow (2/3 Width Layout) */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Executive Narrative Profile */}
          {summary && (
            <div>
              <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 border-b pb-1 border-gray-100">
                Summary
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed text-justify">
                {summary}
              </p>
            </div>
          )}

          {/* Work Chronology timeline with Left Timeline Accent borders */}
          <div>
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4 border-b pb-1 border-gray-100">
              Experience
            </h2>
            {experience.length > 0 ? (
              <div className="space-y-4 pl-1 border-l-2 border-gray-50">
                {experience.map((job, index) => (
                  <div key={index} className="relative pl-3 group">
                    {/* Visual Node Dot representing the layout timeline pattern */}
                    <div className="absolute -left-[9px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-indigo-500 group-hover:bg-indigo-500 transition-colors duration-150" />
                    
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-sm font-bold text-gray-900">{job.title || "Position Title"}</h3>
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        {job.startDate} — {job.endDate || "Present"}
                      </span>
                    </div>
                    
                    <p className="text-xs font-medium text-gray-600 mb-2 italic">
                      {job.company || "Company Name"}
                    </p>
                    
                    <p className="text-xs text-gray-500 leading-relaxed text-justify whitespace-pre-line">
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No professional experience listed.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Azurill;