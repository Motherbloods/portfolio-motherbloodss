import { Link } from "react-router-dom";
import useResetScroll from "../../hooks/useResetScroll";

function NotFound() {
  useResetScroll();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-[#4B5320]">
      <div className="bg-white p-10 rounded-2xl shadow-md text-center max-w-md border border-[#67AE6E]/20">
        <p className="text-sm font-medium text-[#4B5320]/70 mb-2">Error 404</p>
        <h1 className="text-3xl font-bold mb-3">Page not found</h1>
        <p className="text-[#4B5320]/80 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-[#4B5320] text-white rounded-lg hover:bg-[#2F3414] transition-colors shadow-md"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
