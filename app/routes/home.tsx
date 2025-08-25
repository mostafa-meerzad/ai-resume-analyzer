import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv, isLoading } = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const storedResumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = storedResumes?.map((resume) => {
        const parsedResume = JSON.parse(resume.value);
        // Parse feedback string into JSON object if it's a string
        if (
          parsedResume.feedback &&
          typeof parsedResume.feedback === "string"
        ) {
          try {
            parsedResume.feedback = JSON.parse(parsedResume.feedback);
          } catch (error) {
            console.error("Error parsing feedback:", error);
            // Provide a default feedback object to prevent errors
            parsedResume.feedback = {
              overallScore: 0,
              ATS: { score: 0, tips: [] },
              toneAndStyle: { score: 0, tips: [] },
              content: { score: 0, tips: [] },
              structure: { score: 0, tips: [] },
              skills: { score: 0, tips: [] },
            };
          }
        }
        return parsedResume as Resume;
      });
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    if (auth.isAuthenticated) {
      loadResumes();
    }
  }, [isLoading]);

  return (
    <main
      className={
        "bg-[url('/images/bg-main.svg')] dark:bg-[url('/images/bg-main-dark.svg')] bg-cover"
      }
    >
      <Navbar />
      <section className="main-section dark:text-white">
        <div className="page-heading pt-8">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            AI Resume Analyzer
          </motion.h1>
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Get Instant Feedback, Tips, and Ratings
          </motion.h2>
        </div>

        <motion.div
          className={"primary-button w-[90%] h-14 mt-8 text-xl font-semibold"}
          initial={{
            scale: 1,
            boxShadow: "0 0 0px 0px rgba(81,113,255,0.6)",
          }}
          whileHover={{
            scale: 1.01,
            boxShadow: "0 0 10px 4px rgba(81,113,255,0.6)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            to={"/upload"}
            className={"w-full h-full flex justify-center items-center"}
          >
            Upload Resume
          </Link>
        </motion.div>

        <div className={"mt-3 max-w-[90%] text-center "}>
          {!loadingResumes && resumes?.length === 0 ? (
            <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              No resumes found. Upload your first resume to get feedback.
            </motion.h3>
          ) : (
            <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Review your resumes and check AI-powered feedback.{" "}
            </motion.h3>
          )}
        </div>
        {loadingResumes ? (
          <div className={"flex flex-col justify-center items-center p-0"}>
            <img
              src="/images/resume-scan-2.gif"
              className={"w-[200px] "}
              alt=""
            />
          </div>
        ) : (
          !loadingResumes &&
          resumes.length === 0 && (
            <div className={"flex flex-col justify-center items-center my-5"}>
              <img
                src="/images/forbidden.png"
                className={"w-[110px] "}
                alt=""
              />
            </div>
          )
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section ">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
