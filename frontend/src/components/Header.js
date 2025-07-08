import React, { useState, useEffect } from "react";

function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Smart Resume Analyzer</h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded"
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
