"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileCode,
  Server,
  Layout,
  Home,
  BookOpen,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const iconMap = {
  FileCode,
  Server,
  Layout,
};

export default function Sidebar({ lessons }) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="w-72 bg-gray-900 text-white min-h-screen flex flex-col border-r border-gray-800">
      {/* Logo / Title */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-3 group">
          <BookOpen className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
          <div>
            <h1 className="text-lg font-bold tracking-tight">JS Learning</h1>
            <p className="text-xs text-gray-400">Apprentissage interactif</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* Home Link */}
        <Link
          href="/"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            pathname === "/"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}
        >
          <Home className="w-4 h-4" />
          Accueil
        </Link>

        <div className="pt-4 pb-2">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Chapitres
          </p>
        </div>

        {/* Chapter Sections */}
        {lessons.map((section) => {
          const Icon = iconMap[section.icon] || FileCode;
          const isOpen = openSections[section.id];
          const isSectionActive = pathname.startsWith(
            `/lecons/${section.slug}`
          );

          return (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isSectionActive
                    ? "bg-gray-800 text-blue-400"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  {section.title}
                </span>
                {isOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {isOpen && (
                <div className="ml-4 mt-1 space-y-0.5 border-l border-gray-700 pl-4">
                  {section.lessons.map((lesson) => {
                    const lessonPath = `/lecons/${section.slug}/${lesson.id}`;
                    const isActive = pathname === lessonPath;

                    return (
                      <Link
                        key={lesson.id}
                        href={lessonPath}
                        className={`block px-3 py-2 rounded-md text-sm transition-all ${
                          isActive
                            ? "bg-blue-600/20 text-blue-400 font-medium"
                            : "text-gray-400 hover:text-white hover:bg-gray-800"
                        }`}
                      >
                        {lesson.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">
          © 2026 JS Learning
        </p>
      </div>
    </aside>
  );
}
