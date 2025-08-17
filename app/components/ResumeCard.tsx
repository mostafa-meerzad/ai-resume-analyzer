import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
      setIsLoading(false);
    };

    loadResume();
  }, [imagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      className={
        "resume-card animate-in fade-in duration-1000 dark:bg-gray-800 dark:text-white"
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-[400px] md:h-[500px] dark:bg-gray-800 dark:text-white">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin dark:border-gray-600 dark:border-t-white"></div>
        </div>
      ) : (
        <>
          <div className="resume-card-header">
            <div className="flex flex-col gap-2">
              {companyName && (
                <h2 className="!text-black dark:!text-white font-bold break-words">
                  {companyName}
                </h2>
              )}
              {jobTitle && (
                <h3 className="text-lg break-words text-gray-500 dark:text-gray-300">
                  {jobTitle}
                </h3>
              )}
              {!companyName && !jobTitle && (
                <h2 className={"!text-black dark:!text-white font-bold"}>
                  Resume
                </h2>
              )}
            </div>
            <div className="flex-shrink-0">
              <ScoreCircle score={feedback.overallScore} />
              {/*{feedback.overallScore}*/}
            </div>
          </div>

          {resumeUrl && (
            <div className="gradient-border dark:bg-gray-700 animate-in fade-in duration-1000">
              <div className="w-full h-full">
                <img
                  src={resumeUrl}
                  alt="resume"
                  width={1000}
                  height={1000}
                  className="w-full h-[400px] md:h-[500px] object-cover object-top"
                />
              </div>
            </div>
          )}
        </>
      )}
    </Link>
  );
};
export default ResumeCard;
