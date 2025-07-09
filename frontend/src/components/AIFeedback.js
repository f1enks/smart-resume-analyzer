import React from "react";
import ReactMarkdown from "react-markdown";

function SectionCard({ title, content }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-5 shadow-md">
      <h3 className="text-lg font-bold mb-2 text-blue-700 dark:text-blue-300">
        {title}
      </h3>
      <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-200">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

function AIFeedback({ feedback }) {
  if (!feedback) return null;

  const sectionRegex = /\*\*\d+\.\s+(.*?)\*\*\s*\n([\s\S]*?)(?=\*\*\d+\.|\*\*$|$)/g;

  const sections = [];
  let match;
  while ((match = sectionRegex.exec(feedback)) !== null) {
    const title = match[1].trim();
    const rawContent = match[2].trim();

    const processed = rawContent
      .split("\n")
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return "";
        if (/^[-*]\s/.test(trimmed)) return trimmed;
        const colonIndex = trimmed.indexOf(":");
        if (colonIndex !== -1) {
          const label = trimmed.slice(0, colonIndex).trim();
          const description = trimmed.slice(colonIndex + 1).trim();
          return `- **__${label}__**: ${description}`;
        }
        return trimmed;
      })
      .join("\n\n");

    sections.push({ title, content: processed });
  }

  return (
    <section className="mt-8 px-4 max-w-6xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-6 text-center">
        AI Feedback Summary
      </h2>
      {sections.map((sec, index) => (
        <SectionCard
          key={index}
          title={`${index + 1}. ${sec.title}`}
          content={sec.content}
        />
      ))}
    </section>
  );
}

export default AIFeedback;
