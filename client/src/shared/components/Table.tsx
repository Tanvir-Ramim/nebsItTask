import { useState, useRef,  } from "react";

import IconSvg from "../utils/IconSvg";


const colour = {
  Design: "bg-[#F0FDF4] text-[#16A34A]",
  Development: "bg-[#F0F6FD] text-[#1653A3]",
  Product: "bg-[#FDF3F0] text-[#A36616]",
  Sales: "bg-[#F9F0FD] text-[#8216A3]",
};

const Table = () => {
 

  const [menuIndex, setMenuIndex] = useState(null);
  const [openUp, setOpenUp] = useState(false);

  const rowRefs = useRef([]);
  const dropdownRef = useRef(null);

  // pagi
 









  return (
    <div>
      <div className="bg-white md:px-6 px-4 md:py-3 py-2.5 border border-gray-300 rounded-xl mt-6 overflow-hidden">
        {/* <TableHeader /> */}

        <div className="w-full md:py-2 py-1.4 mt-1.5 overflow-x-auto customescroll">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-[#F3F5F6] text-[#464255] md:text-[16px] text-[13px]  font-bold">
                <th className="md:p-4 p-2 rounded-l-lg">Title</th>
                <th className="md:p-4 truncate p-2">Notice Type</th>
                <th className="md:p-4 p-2">Individual</th>
                <th className="md:p-4 truncate p-2">Published On</th>
                <th className="md:p-4 truncate p-2">Status</th>
                <th className="md:p-4 p-2">Department</th>
                <th className="md:p-4 p-2">Status</th>
              
                <th className="md:p-4 p-2 rounded-r-lg">Action</th>
              </tr>
            </thead>

            <tbody>
            
                <tr
               
                  className="border-b md:text-[16px] text-[13px] text-[#464255] border-[#E1E1E1] hover:bg-gray-50 relative"
                >
                  <td className="md:p-4 p-2">hfgh</td>
                  <td className="md:p-4 truncate p-2">sdfsdf</td>
                  <td className="md:p-4 truncate p-2">sdfsdf</td>
                  <td className="md:p-4 p-2">
                sdfsdfsdf
                  </td>
                  <td className="md:p-4 truncate p-2">fgdsdf</td>

                  <td className="md:p-4 p-2">
                    <span
                      className={`px-2.5 w-fit py-1 rounded-full text-xs font-medium  flex items-center gap-1.5`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      fghfg
                    </span>
                  </td>

                  <td className="md:p-4 truncate p-2">ghfgh</td>
                  <td className="md:p-4 p-2 max-w-62.5">
                    <div className="truncate">gjhfgh</div>
                  </td>

                  <td className="md:p-4 p-2 relative w-[140px]">
                    <div className="flex items-center gap-3.5 w-full min-w-[200px]">
                      {" "}
                      <div className="flex-1 min-w-0">
                    
                   
                      
                      </div>
                      <div
                        className="border rounded-lg pt-2 px-1.5 cursor-pointer border-[#DBDFE2]"
                      >
                        <IconSvg name="threeDot" />
                      </div>
                    
                  
                 
                    </div>
                  </td>
                </tr>
          
            </tbody>
          </table>
        </div>
      </div>
      {/* ---------------- pagi ---------------- */}
      <div className="mt-6 lg:mb-12 md:mb-10 sm:mb-9 mb-7 md:mr-9 flex items-center @lg:space-x-3 space-x-2 text-[#464255] font-medium md:justify-end justify-center">
        <button
          
          className="flex items-center @lg:text-base text-sm cursor-pointer gap-1 hover:text-black transition-colors duration-200"
        >
          <span className="text-lg @lg:block hidden">←</span> Previous
        </button>

        
          <button
         
       
            className={`
             @lg:px-2.5 px-1 @sm:py-1 py-0.5
            p-0.5 flex items-center @lg:text-base cursor-pointer text-xs justify-center rounded
            transition-all duration-200 ease-in-out
          
          `}
          >
          1
          </button>
    

        {/* Next */}
        <button
         
          className="flex items-center gap-1 cursor-pointer @lg:text-base text-sm hover:text-black transition-colors duration-200"
        >
          Next <span className="text-lg @lg:block hidden">→</span>
        </button>
      </div>
    </div>
  );
};

export default Table;
