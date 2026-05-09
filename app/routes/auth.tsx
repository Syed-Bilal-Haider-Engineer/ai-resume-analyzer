import { useLocation, useNavigate } from "react-router";
import type { Route } from "../+types/root";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    {
      name: "description",
      content: "Login to Resume Analyzer",
    },
  ];
}

function Auth() {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const next = params.get("next") || "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p className="text-gray-600">Please login to your account</p>
          </div>

          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse" disabled>
                <p>Logging in...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={auth.signOut}>
                    <p>logOut</p>
                  </button>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    <p>Log in</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Auth;
