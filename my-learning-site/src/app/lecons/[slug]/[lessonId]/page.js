import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import lessons from "@/data/lessons.json";
import LessonContent from "@/components/LessonContent";
import Exercise from "@/components/Exercise";

export function generateStaticParams() {
  const params = [];
  for (const section of lessons) {
    for (const lesson of section.lessons) {
      params.push({ slug: section.slug, lessonId: lesson.id });
    }
  }
  return params;
}

export function generateMetadata({ params }) {
  const section = lessons.find((s) => s.slug === params.slug);
  const lesson = section?.lessons.find((l) => l.id === params.lessonId);
  if (!lesson) return { title: "Leçon non trouvée" };
  return {
    title: `${lesson.title} - ${section.title} | JS Learning`,
    description: `Leçon : ${lesson.title} dans le chapitre ${section.title}`,
  };
}

export default async function LessonPage({ params }) {
  const { slug, lessonId } = await params;

  const section = lessons.find((s) => s.slug === slug);
  if (!section) notFound();

  const lessonIndex = section.lessons.findIndex((l) => l.id === lessonId);
  if (lessonIndex === -1) notFound();

  const lesson = section.lessons[lessonIndex];

  // Find previous and next lessons across all sections
  const allLessons = lessons.flatMap((s) =>
    s.lessons.map((l) => ({ ...l, sectionSlug: s.slug, sectionTitle: s.title }))
  );
  const globalIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = globalIndex > 0 ? allLessons[globalIndex - 1] : null;
  const nextLesson =
    globalIndex < allLessons.length - 1 ? allLessons[globalIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Accueil
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{section.title}</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">{lesson.title}</span>
      </div>

      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-blue-600 font-medium">{section.title}</p>
          <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <LessonContent content={lesson.content} />
      </div>

      {/* Exercise */}
      {lesson.exercise && (
        <Exercise
          instruction={lesson.exercise.instruction}
          solution={lesson.exercise.solution}
        />
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-200">
        {prevLesson ? (
          <Link
            href={`/lecons/${prevLesson.sectionSlug}/${prevLesson.id}`}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <div className="text-right">
              <p className="text-xs text-gray-400">{prevLesson.sectionTitle}</p>
              <p className="font-medium">{prevLesson.title}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={`/lecons/${nextLesson.sectionSlug}/${nextLesson.id}`}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <div>
              <p className="text-xs text-gray-400">{nextLesson.sectionTitle}</p>
              <p className="font-medium">{nextLesson.title}</p>
            </div>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
