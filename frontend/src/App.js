import React from "react";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import ResumeUpload from "./components/ResumeUpload";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <Toaster position="top-right" />
      <Header />
      <Hero />
      <HowItWorks />
      <ResumeUpload />
      <Footer />
    </div>
  );
}

export default App;
