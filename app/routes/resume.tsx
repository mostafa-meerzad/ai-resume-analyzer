import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => [
  {
    title: "Resumind | Review",
    name: "description",
    content: "Detailed review of your resume",
  },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);
      const resumeBlob = await fs.read(data.resumePath);

      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);

      if (!imageBlob) return;

      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(JSON.parse(data.feedback));
    };

    loadResume();
  }, [id]);
  return (
    <main className={"pt-0 dark:bg-gray-900 bg-[url('/images/bg-small.svg')] dark:bg-[url('/images/bg-small-dark.svg')]  bg-cover"}>
      <nav className={"mb-10"}>
        <Link
          to={"/"}
          className={"back-button bg-white dark:bg-gray-700 dark:border-gray-600 w-fit"}
        >
          <img
            src="/icons/back.svg"
            alt="back"
            className={"size-2.5 dark:invert"}
          />
          <span className="text-gray-800 dark:text-gray-200 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>

      <h2 className={"text-4xl !text-black dark:!text-white font-bold order-1 text-center mx-auto "}>
        Resume Review
      </h2>
      <div className="flex flex-row w-full max-lg:flex-col-reverse md:mt-6 gap-6">

        <section className=" feedback-section dark:bg-gray-900/50 rounded-2xl  ">
          {imageUrl && resumeUrl && (
            <div

            >
              <a href={resumeUrl} target={`_blank`} rel="noreferrer">
                <img
                  src={imageUrl}
                  alt=""
                  className={"w-full h-full object-contain rounded-2xl "}
                />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section dark:bg-gray-900/50 rounded-2xl">
          {feedback ? (
            <div
              className={"flex flex-col gap-8 animate-in fade-in duration-1000"}
            >
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" alt="" className={"w-full"} />
          )}
        </section>
      </div>
    </main>
  );
};
export default Resume;
