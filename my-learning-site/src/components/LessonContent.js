"use client";

import CodeBlock from "./CodeBlock";

export default function LessonContent({ content }) {
  // Parse markdown-like content into segments
  const segments = [];
  const lines = content.split("\n");
  let currentText = [];
  let inCodeBlock = false;
  let codeLines = [];
  let codeLang = "js";

  for (const line of lines) {
    if (line.startsWith("```") && !inCodeBlock) {
      // Start of code block
      if (currentText.length > 0) {
        segments.push({ type: "text", content: currentText.join("\n") });
        currentText = [];
      }
      inCodeBlock = true;
      codeLang = line.slice(3).trim() || "js";
      codeLines = [];
    } else if (line.startsWith("```") && inCodeBlock) {
      // End of code block
      segments.push({
        type: "code",
        content: codeLines.join("\n"),
        language: codeLang,
      });
      inCodeBlock = false;
      codeLines = [];
    } else if (inCodeBlock) {
      codeLines.push(line);
    } else {
      currentText.push(line);
    }
  }

  if (currentText.length > 0) {
    segments.push({ type: "text", content: currentText.join("\n") });
  }

  const renderText = (text) => {
    return text.split("\n").map((line, i) => {
      if (!line.trim()) return <br key={i} />;

      // Bold text
      let rendered = line;
      const parts = [];
      let lastIndex = 0;

      // Handle inline code
      const inlineCodeRegex = /`([^`]+)`/g;
      let match;
      const tempParts = [];

      while ((match = inlineCodeRegex.exec(rendered)) !== null) {
        if (match.index > lastIndex) {
          tempParts.push({
            type: "text",
            content: rendered.slice(lastIndex, match.index),
          });
        }
        tempParts.push({ type: "code", content: match[1] });
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < rendered.length) {
        tempParts.push({ type: "text", content: rendered.slice(lastIndex) });
      }

      if (tempParts.length === 0) {
        tempParts.push({ type: "text", content: rendered });
      }

      // Handle list items
      const isList = line.match(/^[-*]\s/);
      const content = tempParts.map((part, j) =>
        part.type === "code" ? (
          <code
            key={j}
            className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono"
          >
            {part.content}
          </code>
        ) : (
          <span
            key={j}
            dangerouslySetInnerHTML={{
              __html: part.content
                .replace(
                  /\*\*(.+?)\*\*/g,
                  '<strong class="font-semibold text-gray-900">$1</strong>'
                ),
            }}
          />
        )
      );

      if (isList) {
        return (
          <li key={i} className="ml-4 text-gray-700 leading-relaxed">
            {content}
          </li>
        );
      }

      return (
        <p key={i} className="text-gray-700 leading-relaxed">
          {content}
        </p>
      );
    });
  };

  return (
    <div className="prose-content space-y-2">
      {segments.map((segment, i) =>
        segment.type === "code" ? (
          <CodeBlock key={i} code={segment.content} language={segment.language} />
        ) : (
          <div key={i}>{renderText(segment.content)}</div>
        )
      )}
    </div>
  );
}
