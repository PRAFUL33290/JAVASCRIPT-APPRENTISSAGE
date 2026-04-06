import "./globals.css";
import Sidebar from "@/components/Sidebar";
import lessons from "@/data/lessons.json";

export const metadata = {
  title: "JS Learning - Apprentissage interactif",
  description:
    "Site d'apprentissage interactif pour JavaScript, Node.js et Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className="h-full antialiased"
    >
      <body className="min-h-full flex font-sans">
        <Sidebar lessons={lessons} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
