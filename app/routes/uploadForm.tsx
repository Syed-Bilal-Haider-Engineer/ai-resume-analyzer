import React from "react";
import { FileUploader } from "~/components/FileUploader";
import Navbar from "~/components/navbar/Navbar";

function uploadForm() {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [setText, setSetText] = React.useState("");
 const [file, setFile] = React.useState<File | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setSetText("Processing your resume...");
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    formData.append("resume", file as Blob);
    formData.append("companyName", formData.get("companyName") as string);
    formData.append("jobTitle", formData.get("jobTitle") as string);
    formData.append(
      "jobDescription",
      formData.get("jobDescription") as string,
    );

  };

  const handleFileSelect = (file: File) => {
    setFile(file);

  }
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <h1 className="text-4xl font-bold mb-6">
            Smart feedback you'r resume!
          </h1>
          {isProcessing ? (
            <>
              <p>{setText}</p>
              <img
                src="/images/resume-scan.gif"
                alt="Processing..."
                className="w-16 h-16 mt-4"
              />
            </>
          ) : null}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="form-div">
                <label htmlFor="company name">Company Name:</label>
                <input type="text" id="companyName" name="companyName" />
              </div>
              <div className="form-div">
                <label htmlFor="Job title">Job Title:</label>
                <input type="text" id="jobTitle" name="jobTitle" />
              </div>
              <div className="form-div">
                <label htmlFor="Job description">Job Description:</label>
                <textarea id="jobDescription" name="jobDescription" rows={4} />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">upload resume:</label>
                <FileUploader onFileSelect={handleFileSelect}/>
              </div>
              <button className="primary-button" type="submit">
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default uploadForm;
