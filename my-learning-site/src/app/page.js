import Link from "next/link";
import { FileCode, Server, Layout, ArrowRight, Sparkles, BookOpen, Code } from "lucide-react";
import lessons from "@/data/lessons.json";

const iconMap = { FileCode, Server, Layout };

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="relative max-w-5xl mx-auto px-8 py-20">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-medium text-blue-200">
              Apprentissage interactif
            </span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            Apprenez JavaScript,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Node.js &amp; Next.js
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-8 leading-relaxed">
            Un parcours structuré avec des leçons claires et des exercices
            pratiques pour maîtriser le développement web moderne.
          </p>
          <div className="flex gap-4">
            <Link
              href={`/lecons/${lessons[0].slug}/${lessons[0].lessons[0].id}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Commencer
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-8 -mt-8">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
            <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {lessons.reduce((acc, s) => acc + s.lessons.length, 0)}
            </p>
            <p className="text-sm text-gray-500">Leçons</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
            <Code className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {lessons.reduce((acc, s) => acc + s.lessons.length, 0)}
            </p>
            <p className="text-sm text-gray-500">Exercices</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center">
            <Sparkles className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {lessons.length}
            </p>
            <p className="text-sm text-gray-500">Chapitres</p>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="max-w-5xl mx-auto px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          📚 Chapitres
        </h2>
        <div className="grid gap-6">
          {lessons.map((section) => {
            const Icon = iconMap[section.icon] || FileCode;
            return (
              <div
                key={section.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {section.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {section.lessons.map((lesson) => (
                        <Link
                          key={lesson.id}
                          href={`/lecons/${section.slug}/${lesson.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors border border-gray-200"
                        >
                          {lesson.title}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
