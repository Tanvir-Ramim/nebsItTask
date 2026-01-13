import { Link } from "react-router-dom";
import Table from "./components/Table";

import { AiTwotoneNotification } from "react-icons/ai";



const Home = () => {
  
  return (
    <div className="@container">
      <div className="flex   @sm:flex-row flex-col @sm:items-center justify-between">
        <div className="flex items-center gap-3    w-fit">
          <div className="md:px-3  px-2 border border-gray-300 md:py-3 py-2 bg-white   rounded-xl flex items-center justify-center">
          <AiTwotoneNotification size={23} />
          </div>

          <div className="pt-5">
            <p className="md:text-xl text-lg font-bold text-gray-900 leading-tight">
              Notice Mangement 
              <br />
              <span className="md:text-sm text-xs font-normal">    Manage your time logs</span>
            </p>
            {/* <p className=" text-gray-600 leading-tight mt-1">
              Manage your time logs
            </p> */}
          </div>
        </div>

        <div className="flex h-fit @xl:mt-0 mt-3 gap-4">
          <button
            className={`
        flex items-center  sm:gap-2 gap-0.5 rounded-lg  font-medium    cursor-pointer
     bg-[#FF3E01]  text-white
      sm:px-4 px-2  sm:py-2 py-1.5
        transition-all duration-200 
        hover:opacity-90
    
      `}
          >

            <Link to="/craete-notice" className=" md:text-base text-sm text-white">+ Create Notice</Link>
          </button>
        </div>
      </div>
      <Table></Table>
    </div>
  );
};

export default Home;
