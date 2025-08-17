import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link} from "react-router";
import { useEffect, useState } from "react";

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
      const resumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume,
      );

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    if (auth.isAuthenticated) {
      loadResumes();
    }
  }, [isLoading]);

  return (
    <main className={"bg-[url('/images/bg-main.svg')] dark:bg-[url('/images/bg-main-dark.svg')] bg-cover"}>
      <Navbar />
      <section className="main-section dark:text-white">
        <div className="page-heading pt-8">
          <h1>AI Resume Analyzer</h1>
          <h2>Get Instant Feedback, Tips, and Ratings</h2>

          <Link
            to={"/upload"}
            className={
              " primary-button w-[90%] h-14 mt-8 flex justify-center items-center text-xl font-semibold"
            }
          >
            Upload Resume
          </Link>

          <div className={"mt-3 max-w-[90%]"}>
            {!loadingResumes && resumes?.length === 0 ? (
              <h3>
                No resumes found. Upload your first resume to get feedback.
              </h3>
            ) : (
              <h3>Review your resumes and check AI-powered feedback. </h3>
            )}
          </div>
          {loadingResumes && (
            <div className={"flex flex-col justify-center items-center"}>
              <img
                src="/images/resume-scan-2.gif"
                className={"w-[200px]"}
                alt=""
              />
            </div>
          )}
        </div>

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
