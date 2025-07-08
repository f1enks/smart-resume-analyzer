import React from "react";
import {
  UploadCloud,
  FileText,
  Briefcase,
} from "lucide-react"; // modern-looking icons

function HowItWorks() {
  const steps = [
    {
      title: "Upload Resume",
      description: "Choose your PDF resume file to begin the analysis process.",
      icon: UploadCloud,
    },
    {
      title: "Extract & Score",
      description: "Our backend extracts your details and gives your resume a score using AI.",
      icon: FileText,
    },
    {
      title: "Get Job Fit",
      description: "You’ll receive a score and a recommended job role based on your skills!",
      icon: Briefcase,
    },
  ];

  return (
    <section
      id="how"
      className="bg-gray-50 dark:bg-gray-900 py-20 text-gray-800 dark:text-gray-100"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md rounded-2xl p-6 pt-16 hover:shadow-xl transition duration-300"
              >
                {/* Floating Icon Circle */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shadow-md">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                </div>

                <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
