import React from "react";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine background gradient based on score
  const getBgGradient = () => {
    if (score > 69) return "from-green-100";
    if (score > 49) return "from-yellow-100";
    return "from-red-100";
  };

  // Determine icon based on score
  const getIcon = () => {
    if (score > 69) return "/icons/ats-good.svg";
    if (score > 49) return "/icons/ats-warning.svg";
    return "/icons/ats-bad.svg";
  };

  // Determine status text based on score
  const getStatusText = () => {
    if (score > 69) return "Your resume is well-optimized for ATS systems";
    if (score > 49) return "Your resume is moderately optimized for ATS systems";
    return "Your resume needs improvement for ATS systems";
  };

  return (
    <div className={`rounded-lg overflow-hidden bg-gradient-to-b ${getBgGradient()} to-white shadow-md`}>
      {/* Top section with icon and score */}
      <div className="p-6 flex items-center gap-4">
        <img src={getIcon()} alt="ATS Score Icon" className="w-12 h-12" />
        <div>
          <h2 className="text-xl font-bold">ATS Score - {score}/100</h2>
          <p className="text-gray-700">{getStatusText()}</p>
        </div>
      </div>

      {/* Description section */}
      <div className="px-6 pb-6">
        <h3 className="font-semibold text-lg mb-2">Applicant Tracking System Analysis</h3>
        <p className="text-gray-500 mb-4">
          Applicant Tracking Systems (ATS) are used by employers to scan and rank resumes. 
          A well-optimized resume increases your chances of getting past these automated systems.
        </p>

        {/* Suggestions list */}
        <div className="space-y-3 mb-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-2">
              <img 
                src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"} 
                alt={suggestion.type === "good" ? "Check" : "Warning"} 
                className="w-5 h-5 mt-0.5" 
              />
              <p className="text-sm">{suggestion.tip}</p>
            </div>
          ))}
        </div>

        {/* Closing message */}
        <p className="text-sm italic text-gray-600 mt-4">
          Continue improving your resume to increase your chances of getting past ATS systems and landing interviews.
        </p>
      </div>
    </div>
  );
};

export default ATS;
