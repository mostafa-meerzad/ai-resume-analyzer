import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../lib/utils";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to manage the selected file

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      setSelectedFile(file); // Set state with the selected file
      onFileSelect?.(file);
    },
    [onFileSelect],
  );

  const removeFile = useCallback(() => {
    setSelectedFile(null); // Clear the state
    onFileSelect?.(null); // Call the parent callback with null
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 20 * 1024 * 1024,
  });

  return (
    <div className={"w-full gradient-border dark:bg-gray-800"}>
      <div {...getRootProps()} className="relative">
        <input {...getInputProps()} />
        <div className="cursor-pointer space-y-4">
          {selectedFile ? (
            <div
              className="uploader-selected-file dark:bg-gray-700"
              onClick={(e) => e.stopPropagation()} // Prevent triggering the dropzone when clicked inside
            >
              <img src="/images/pdf.png" alt="pdf" className={"size-10"} />
              <div className="flex items-center space-x-3">
                <div>
                  <p
                    className={
                      "text-sm text-gray-700 dark:text-gray-200 font-medium truncate max-w-xs"
                    }
                  >
                    {selectedFile.name}
                  </p>
                  <p className={"text-sm text-gray-500 dark:text-gray-400"}>
                    {formatSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              <button
                className={"p-2 cursor-pointer"}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the dropzone
                  removeFile(); // Remove the file
                }}
              >
                <img
                  src="/icons/cross.svg"
                  alt="remove"
                  className={"h-4 w-4 dark:invert"}
                />
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto w-16 h-16 flex justify-center items-center">
                <img
                  src="/icons/info.svg"
                  alt={"upload"}
                  className={"size-20 mb-2 dark:invert"}
                />
              </div>
              <p className="text-lg text-gray-500 dark:text-gray-300">
                <span className={"font-semibold"}>Click to upload</span> or drag
                and drop
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-300">
                PDF (max {formatSize(20 * 1024 * 1024)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;