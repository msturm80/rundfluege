import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

type LegalLayoutProps = {
  title: string;
  children: ReactNode;
};

function LegalLayout({ title, children }: LegalLayoutProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [title]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <div className="container-x py-20 md:py-28">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zur Startseite
          </Link>
          <article className="legal-prose prose-slate max-w-3xl text-slate-700 dark:text-slate-300">
            <h1 className="mb-8 font-display text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">
              {title}
            </h1>
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LegalLayout;
