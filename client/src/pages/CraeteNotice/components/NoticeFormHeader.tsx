import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const NoticeFormHeader = () => {
  return (
    <div className="flex md:pb-6 pb-4 gap-2.5 items-center">
      <Link to="/" className="border px-2 py-1 rounded-lg border-gray-400">
        <FaArrowLeft />
      </Link>
      <h1 className="pt-1.5">
        <span className="text-xl font-semibold">Create a Notice</span>
      </h1>
    </div>
  );
};

export default NoticeFormHeader;