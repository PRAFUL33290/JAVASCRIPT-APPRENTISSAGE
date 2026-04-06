"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Lightbulb, Play, RotateCcw } from "lucide-react";

export default function Exercise({ instruction, solution }) {
  const [userCode, setUserCode] = useState("");
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [showSolution, setShowSolution] = useState(false);

  const handleValidate = () => {
    // Normalize whitespace for comparison
    const normalize = (str) =>
      str
        .replace(/\s+/g, " ")
        .replace(/\s*;\s*/g, ";")
        .trim()
        .toLowerCase();

    if (normalize(userCode) === normalize(solution)) {
      setStatus("success");
    } else {
      // Also accept if user code is at least 50% of the solution length
      // and contains key identifiers from the solution
      const keywords = solution
        .match(/\b[a-zA-Z_]\w*\b/g)
        ?.filter((w) => w.length > 2) || [];
      const matchedKeywords = keywords.filter((kw) =>
        userCode.toLowerCase().includes(kw.toLowerCase())
      );
      const matchRatio = keywords.length > 0 ? matchedKeywords.length / keywords.length : 0;

      if (matchRatio >= 0.6 && userCode.trim().length > 10) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    }
  };

  const handleReset = () => {
    setUserCode("");
    setStatus(null);
    setShowSolution(false);
  };

  return (
    <div className="mt-8 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Play className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Exercice pratique</h3>
        </div>
      </div>

      {/* Instruction */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <p className="text-gray-700 text-sm leading-relaxed">
          <span className="font-medium text-gray-900">📋 Consigne :</span>{" "}
          {instruction}
        </p>
      </div>

      {/* Code Editor */}
      <div className="p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Votre code :
        </label>
        <textarea
          value={userCode}
          onChange={(e) => {
            setUserCode(e.target.value);
            setStatus(null);
          }}
          placeholder="Écrivez votre code ici..."
          className="w-full h-40 p-4 font-mono text-sm bg-gray-900 text-green-400 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder:text-gray-600"
          spellCheck={false}
        />

        {/* Actions */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={handleValidate}
            disabled={!userCode.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            Valider
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Réinitialiser
          </button>

          <button
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 text-amber-700 rounded-lg font-medium text-sm hover:bg-amber-100 transition-colors ml-auto"
          >
            <Lightbulb className="w-4 h-4" />
            {showSolution ? "Masquer" : "Voir"} la solution
          </button>
        </div>

        {/* Result Feedback */}
        {status === "success" && (
          <div className="mt-4 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800 text-sm font-medium">
              🎉 Bravo ! Votre code est correct !
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="mt-4 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800 text-sm font-medium">
              ❌ Pas tout à fait. Vérifiez votre code et réessayez !
            </p>
          </div>
        )}

        {/* Solution */}
        {showSolution && (
          <div className="mt-4 p-4 bg-gray-900 rounded-lg">
            <p className="text-xs text-gray-400 mb-2 font-medium">
              💡 Solution :
            </p>
            <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
              {solution}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
