import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="site-shell flex min-h-screen items-center justify-center bg-[#faf7f1] px-6">
      <div className="max-w-md rounded-[28px] border border-olive-200 bg-white p-10 text-center shadow-[0_30px_70px_-55px_rgba(108,82,45,0.7)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-olive-500">404</p>
        <h1 className="mt-4 text-4xl font-medium text-olive-700">Page not found</h1>
        <p className="mt-4 text-base leading-relaxed text-olive-600">
          The route does not exist in this portfolio build.
        </p>
        <a href="/" className="mt-6 inline-block text-sm font-semibold text-olive-700 underline underline-offset-4 hover:text-olive-500">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
