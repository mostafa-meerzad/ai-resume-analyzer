import React, { useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/routes/fileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";
import { motion } from "motion/react";

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
      setError(
        "Failed to convert PDF to image. Please try again with a different PDF file.",
      );
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
    await kv.set(`resume:${uuid}`, JSON.stringify({ ...data }));
    setStatusText("Analysis complete, redirecting...");

    // Redirect to the results page with the resume ID
    navigate(`/resume/${uuid}`);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement | null = e.currentTarget.closest("form");
    if (!form) return;

    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;
    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  useEffect(() => {
    if (isLoading) return;
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [isLoading]);

  return (
    <main
      className={
        "bg-[url('/images/bg-main.svg')] dark:bg-[url('/images/bg-main-dark.svg')] bg-cover pb-10"
      }
    >
      <Navbar />
      <section className="main-section dark:text-white">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="page-heading py-16"
        >
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="page-heading"
          >
            Smart feedback for your dream job
          </motion.h1>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            Drop your resume for an ATS, score and improvement tips
          </motion.h2>
        </motion.div>

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
        ) : null}
        {!isProcessing && !error && (
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 "
          >
            <motion.div
              className="form-div"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <label htmlFor="company-name">Company Name</label>
              <input
                type="text"
                name="company-name"
                id="company-name"
                placeholder="e.g. Google..."
                className=""
              />
            </motion.div>

            <motion.div
              className="form-div"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <label htmlFor="job-title">Job title</label>
              <input
                type="text"
                name="job-title"
                id="job-title"
                placeholder="e.g. Software Engineer"
                className=""
              />
            </motion.div>

            <motion.div
              className="form-div"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <label htmlFor="job-description">Job Description</label>
              <textarea
                rows={5}
                name="job-description"
                id="job-description"
                placeholder="copy and paste your job description here..."
                className="dark:bg-gray-800 dark:text-white bg-gray-200 dark:border-gray-600"
              />
            </motion.div>

            <motion.div
              className="form-div"
              whileInView={{ scale: 1, opacity: 1 }}
              initial={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <label htmlFor="file-upload">Upload Resume</label>
              <FileUploader onFileSelect={handleFileSelect} />
            </motion.div>

            <motion.button
              type="submit"
              className={`${
                !file ? "disable-button" : "primary-button"
              } p-3 text-lg lg:w-2xl md:w-lg md:mx-auto`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
            >
              Analyze Resume
            </motion.button>
          </motion.form>
        )}
      </section>
    </main>
  );
};
export default Upload;