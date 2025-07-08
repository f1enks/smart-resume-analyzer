import React, { useState } from "react";
import toast from "react-hot-toast";

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
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

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

  const getJobFitColor = (fit) => {
    if (!fit) return "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white";
    if (fit.toLowerCase().includes("high")) return "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100";
    if (fit.toLowerCase().includes("medium")) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100";
    return "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100";
  };

  return (
    <section
      id="upload"
      className="pt-20 pb-32 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
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
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Only PDF files under 5 MB are accepted.
          </p>
        </form>

        {result && (
          <div className="mt-8 text-sm bg-blue-50 dark:bg-gray-700 p-5 rounded-lg shadow-inner space-y-2 border border-blue-200 dark:border-gray-600">
            <p><strong>Name:</strong> {result.name}</p>
            <p><strong>Email:</strong> {result.email}</p>
            <p><strong>Phone:</strong> {result.phone}</p>
            <p><strong>Skills:</strong> {result.skills?.join(", ")}</p>
            <p><strong>Score:</strong> <span className="font-bold text-blue-700 dark:text-blue-300">{result.score}</span></p>
            <p>
              <strong>Job Fit:</strong>{" "}
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getJobFitColor(result.job_fit)}`}>
                {result.job_fit}
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ResumeUpload;
