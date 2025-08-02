import React, { useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/routes/fileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };
  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusText("Uploading the file...");

    const uploadedFile = await fs.upload([file]);

    if (!uploadedFile) {
      setStatusText("Error: Failed to upload file");
      setError("Failed to upload file. Please try again.");
      setIsProcessing(false);
      return;
    }

    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);

    if (!imageFile.file) {
      setStatusText("Error: Failed to convert PDF to image");
      setError("Failed to convert PDF to image. Please try again with a different PDF file.");
      setIsProcessing(false);
      return;
    }
    setStatusText("Uploading the image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) {
      setStatusText("Error: Failed to upload image");
      setError("Failed to upload the converted image. Please try again.");
      setIsProcessing(false);
      return;
    }

    setStatusText("Preparing data...");
    const uuid = generateUUID();
    console.log("uuid ", uuid);
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };

    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analyzing...");
    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription }),
    );

    if (!feedback) {
      setStatusText("Error: Failed to analyze");
      setError("Failed to analyze the resume. Please try again.");
      setIsProcessing(false);
      return;
    }
    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = feedbackText;
    await kv.set(`resume:${uuid}`, JSON.stringify({...data}));
    setStatusText("Analysis complete, redirecting...");
    console.log(data);
    
    // Redirect to the results page with the resume ID
    navigate(`/results/${uuid}`);

  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement | null = e.currentTarget.closest("form");
    if (!form) return;

    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    // console.log({ companyName, jobTitle, jobDescription, file });
    if (!file) return;
    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

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
          ) : error ? (
            <>
              <h2 className="text-red-500">{error}</h2>
              <button 
                onClick={() => setError(null)} 
                className="primary-button mt-4"
              >
                Try Again
              </button>
            </>
          ) : (
            <h2>Drop your resume for an ATS, score and improvement tips</h2>
          )}
          {!isProcessing && !error && (
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
                <FileUploader onFileSelect={handleFileSelect} />
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
