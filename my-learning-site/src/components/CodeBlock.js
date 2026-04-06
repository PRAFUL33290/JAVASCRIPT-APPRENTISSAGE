"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeBlock({ code, language = "js" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-400 text-xs">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copié !
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copier
            </>
          )}
        </button>
      </div>
      <pre className="p-4 bg-gray-900 text-gray-100 text-sm font-mono overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}
