import ResumeCard from "~/components/navbar/card/ResumeCard";
import type { Route } from "./+types/home";
import Navbar from "~/components/navbar/Navbar";
import { resumes } from "~/constant";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    {
      name: "Resume analyzer project! with AI",
      content: "Resume analyzer project!",
    },
  ];
}

export default function Home() {

   const { isLoading, auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated)  navigate("/auth?next=/");   
    }, [auth.isAuthenticated]);
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Resume & Job Applications Efficiently</h1>
          <h2>Review Your Submission & Get AI-Powered Feedback ✨</h2>
        </div>
      </section>
      {resumes?.length > 0 && (
        <section className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} {...resume}/>
            ))}
        </section>
      )}
    </main>
  );
}
