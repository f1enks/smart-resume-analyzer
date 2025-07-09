import React, { useState } from "react";
import toast from "react-hot-toast";
import AIFeedback from "./AIFeedback";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError("");

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      toast.error("Only PDF files are allowed.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      toast.error("File size must be less than 5 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a valid PDF file.");
      toast.error("Please select a PDF file.");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      setResult(data);
      toast.success("Resume analyzed successfully!");
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Try again.");
      toast.error("Server error. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        id="upload"
        className="pt-20 pb-10 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
      >
        <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border dark:border-gray-700">
          <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-400 mb-6">
            Upload Your Resume
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:border file:rounded-md file:text-sm
                file:bg-blue-50 file:text-blue-700
                file:dark:bg-gray-700 file:dark:text-gray-100
                hover:file:bg-blue-100 dark:hover:file:bg-gray-600"
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Analyzing...
                </>
              ) : (
                "Analyze Resume"
              )}
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Only PDF files under 5 MB are accepted.
            </p>
          </form>

          {result && (
            <div className="mt-8 text-sm bg-blue-50 dark:bg-gray-700 p-5 rounded-lg shadow-inner space-y-2 border border-blue-200 dark:border-gray-600">
              {result.name && <p><strong>Name:</strong> {result.name}</p>}
              {result.email && <p><strong>Email:</strong> {result.email}</p>}
              {result.phone && <p><strong>Phone:</strong> {result.phone}</p>}
              {result.linkedin && <p><strong>LinkedIn:</strong> {result.linkedin}</p>}
              {result.github && <p><strong>GitHub:</strong> {result.github}</p>}
              {result.score && (
                <p>
                  <strong>Score:</strong>{" "}
                  <span className="font-bold text-blue-700 dark:text-blue-300">{result.score}/100</span>
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {result?.ai_feedback && (
        <section className="bg-white dark:bg-gray-900 py-16 px-4 md:px-10 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <AIFeedback feedback={result.ai_feedback} />
          </div>
        </section>
      )}
    </>
  );
}

export default ResumeUpload;
