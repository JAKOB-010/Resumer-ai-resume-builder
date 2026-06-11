import React from 'react';

const Bronzor = ({ data }) => {
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
          HEADER SECTION (Centered Layout with Minimalist Styling)
          ========================================================================= */}
      <div className="flex flex-col items-center text-center mb-8">
        {personalInfo.image && (
          <img 
            src={personalInfo.image} 
            alt={personalInfo.fullName || "Profile"} 
            className="w-24 h-24 rounded-full object-cover shadow-sm mb-4"
          />
        )}
        
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-2">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        
        <p className="text-sm font-medium text-gray-600 mb-4">
          {personalInfo.title || "Professional Title"}
        </p>

        {/* Contact Info Row */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs text-gray-500">
          {personalInfo.email && (
             <span className="flex items-center gap-1.5">
               <span className="text-gray-400">✉</span> {personalInfo.email}
             </span>
          )}
          {personalInfo.phone && (
             <span className="flex items-center gap-1.5">
               <span className="text-gray-400">📞</span> {personalInfo.phone}
             </span>
          )}
          {personalInfo.location && (
             <span className="flex items-center gap-1.5">
               <span className="text-gray-400">📍</span> {personalInfo.location}
             </span>
          )}
          {personalInfo.website && (
             <span className="flex items-center gap-1.5">
               <span className="text-gray-400">🌐</span> {personalInfo.website}
             </span>
          )}
        </div>
      </div>

      {/* =========================================================================
          MAIN CONTENT (Horizontal Layout: Titles Left, Content Right)
          ========================================================================= */}
      <div className="flex flex-col gap-6">

        {/* SUMMARY SECTION */}
        {summary && (
          <div className="flex flex-row border-t border-indigo-600 pt-4">
            <div className="w-[30%] shrink-0">
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest">
                Summary
              </h2>
            </div>
            <div className="w-[70%]">
              <p className="text-sm text-gray-700 leading-relaxed text-justify">
                {summary}
              </p>
            </div>
          </div>
        )}

        {/* EXPERIENCE SECTION */}
        {experience.length > 0 && (
          <div className="flex flex-row border-t border-indigo-600 pt-4">
            <div className="w-[30%] shrink-0">
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest">
                Experience
              </h2>
            </div>
            <div className="w-[70%] flex flex-col gap-5">
              {experience.map((job, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-gray-900">{job.title || "Position Title"}</h3>
                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                      {job.startDate} — {job.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    {job.company || "Company Name"}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed text-justify whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION SECTION */}
        {education.length > 0 && (
          <div className="flex flex-row border-t border-indigo-600 pt-4">
            <div className="w-[30%] shrink-0">
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest">
                Education
              </h2>
            </div>
            <div className="w-[70%] flex flex-col gap-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-gray-900">{edu.degree || "Degree"}</h3>
                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                      {edu.graduationDate}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">
                    {edu.school || "Institution Name"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS SECTION */}
        {skills.length > 0 && (
          <div className="flex flex-row border-t border-indigo-600 pt-4">
            <div className="w-[30%] shrink-0">
              <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest">
                Skills
              </h2>
            </div>
            <div className="w-[70%]">
              <p className="text-sm text-gray-700 leading-relaxed">
                {/* Bronzor traditionally renders skills inline separated by bullets/commas */}
                {skills.map(skill => skill.name).join(" • ")}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Bronzor;