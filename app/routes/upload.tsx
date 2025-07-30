import React, { useState } from "react";
import Navbar from "~/components/Navbar";

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
  return (
    <main className={"bg-[url('/images/bg-main.svg')] bg-cover"}>
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1 className={"page-heading"}>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                alt="resume scan"
                className={"w-full"}
              />
            </>
          ) : (
            <h2>Drop your resume for an ATS, score and improvement tips</h2>
          )}
          {!isProcessing && (
            <form
              onSubmit={handleSubmit}
              className={"flex flex-col gap-4 mt-8"}
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  id="company-name"
                  placeholder="Company Name"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job title</label>
                <input
                  type="text"
                  name="job-title"
                  id="job-title"
                  placeholder="Job title"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  name="job-description"
                  id="job-description"
                  placeholder="Job Description"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Upload Resume</label>
                <div>uploader</div>
              </div>

              <button type="submit" className={"primary-button"}>
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};
export default Upload;
