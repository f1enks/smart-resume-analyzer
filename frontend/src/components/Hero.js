import React from "react";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 dark:from-indigo-800 dark:to-purple-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Job</h2>
        <p className="text-lg md:text-xl mb-2">
          Analyze your resume in seconds. Get matched to your ideal role using AI.
        </p>
        <p className="text-sm text-indigo-200 dark:text-indigo-100">
          Smart insights powered by Python, NLP, and a sprinkle of magic ✨
        </p>
      </div>
    </section>
  );
}

export default Hero;
