import { useState, useRef, useEffect } from "react";
import TableHeader from "./TableHeader";
import IconSvg from "../utils/IconSvg";
import { mockData } from "../constants/TableData";

const colour = {
  Design: "bg-[#F0FDF4] text-[#16A34A]",
  Development: "bg-[#F0F6FD] text-[#1653A3]",
  Product: "bg-[#FDF3F0] text-[#A36616]",
  Sales: "bg-[#F9F0FD] text-[#8216A3]",
};

const Table = () => {
  const [statuses, setStatuses] = useState(
    mockData.map(() => ({ status: "default" }))
  );

  const [menuIndex, setMenuIndex] = useState(null);
  const [openUp, setOpenUp] = useState(false);

  const rowRefs = useRef([]);
  const dropdownRef = useRef(null);

  // pagi
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const getPageNumbers = () => {
    let pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 3) {
        pages = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }

    return pages;
  };

  const changePage = (page) => {
    if (page === "..." || page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const checkSpace = (index) => {
    const row = rowRefs.current[index];
    if (!row) return;
    const rowRect = row.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rowRect.bottom;
    setOpenUp(spaceBelow < 170);
  };

  const handleApprove = (index) => {
    setStatuses((prev) => {
      const newStatuses = [...prev];
      newStatuses[index].status = "approved";
      return newStatuses;
    });
  };

  const handleReject = (index) => {
    setStatuses((prev) => {
      const newStatuses = [...prev];
      newStatuses[index].status = "rejected";
      return newStatuses;
    });
  };

  const handleUndo = (index) => {
    setStatuses((prev) => {
      const newStatuses = [...prev];
      newStatuses[index].status = "default";
      return newStatuses;
    });
  };

  return (
    <div>
      <div className="bg-white md:px-6 px-4 md:py-3 py-2.5 border border-gray-300 rounded-xl mt-6 overflow-hidden">
        <TableHeader />

        <div className="w-full md:py-2 py-1.4 mt-1.5 overflow-x-auto customescroll">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-[#F3F5F6] text-[#464255] md:text-[16px] text-[13px]  font-bold">
                <th className="md:p-4 p-2 rounded-l-lg">ID</th>
                <th className="md:p-4 truncate p-2">Employee Name</th>
                <th className="md:p-4 p-2">Duration</th>
                <th className="md:p-4 truncate p-2">Start Time - End Time</th>
                <th className="md:p-4 truncate p-2">Due Hours</th>
                <th className="md:p-4 p-2">Department</th>
                <th className="md:p-4 p-2">Project</th>
                <th className="md:p-4 p-2">Notes</th>
                <th className="md:p-4 p-2 rounded-r-lg">Action</th>
              </tr>
            </thead>

            <tbody>
              {mockData.map((item, i) => (
                <tr
                  key={i}
                  ref={(el) => (rowRefs.current[i] = el)}
                  className="border-b md:text-[16px] text-[13px] text-[#464255] border-[#E1E1E1] hover:bg-gray-50 relative"
                >
                  <td className="md:p-4 p-2">{item.id}</td>
                  <td className="md:p-4 truncate p-2">{item.name}</td>
                  <td className="md:p-4 truncate p-2">{item.duration}</td>
                  <td className="md:p-4 p-2">
                    {item.start} - {item.end}
                  </td>
                  <td className="md:p-4 truncate p-2">{item.due}</td>

                  <td className="md:p-4 p-2">
                    <span
                      className={`px-2.5 w-fit py-1 rounded-full text-xs font-medium ${
                        colour[item.department] || "bg-gray-100 text-gray-600"
                      } flex items-center gap-1.5`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {item.department}
                    </span>
                  </td>

                  <td className="md:p-4 truncate p-2">{item.project}</td>
                  <td className="md:p-4 p-2 max-w-[250px]">
                    <div className="truncate">{item.notes}</div>
                  </td>

                  <td className="md:p-4 p-2 relative w-[140px]">
                    <div className="flex items-center gap-3.5 w-full min-w-[200px]">
                      {" "}
                      <div className="flex-1 min-w-0">
                        {statuses[i]?.status === "default" && (
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleReject(i)}
                              className="text-[#E02600] text-[12px] cursor-pointer font-semibold pr-2.5 py-1.5 hover:opacity-80"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleApprove(i)}
                              className="bg-[#089624] cursor-pointer text-white text-[12px] px-[21.5px] py-1.5 rounded-lg hover:bg-[#06751c]"
                            >
                              Approve
                            </button>
                          </div>
                        )}
                        {statuses[i]?.status === "approved" && (
                          <div className="flex items-center space-x-2">
                            <button
                              disabled
                              className="flex items-center border-[1.5px] border-[#089624] px-2.5 py-1.5 rounded-lg text-[#089624] text-[12px] bg-[#E6F4E9]"
                            >
                              <IconSvg name="rightIcon" />
                              Approved
                            </button>
                            <button
                              onClick={() => handleUndo(i)}
                              className="border border-[#DBDFE2] cursor-pointer py-1.5 px-2 text-[12px] rounded-lg hover:bg-gray-50"
                            >
                              Undo
                            </button>
                          </div>
                        )}
                        {statuses[i]?.status === "rejected" && (
                          <div className="flex items-center space-x-2">
                            <button
                              disabled
                              className="flex items-center border-[1.5px] border-[#E02600] px-3 py-1.5 rounded-lg text-[#E02600] text-[12px] bg-[#FEF7F4]"
                            >
                              <IconSvg name="crossIcon" />
                              Rejected
                            </button>
                            <button
                              onClick={() => handleUndo(i)}
                              className="border border-[#DBDFE2] cursor-pointer py-1.5 px-2 text-[12px] rounded-lg hover:bg-gray-50"
                            >
                              Undo
                            </button>
                          </div>
                        )}
                      </div>
                      <div
                        onClick={() => {
                          checkSpace(i);
                          setMenuIndex(menuIndex === i ? null : i);
                        }}
                        className="border rounded-lg pt-2 px-1.5 cursor-pointer border-[#DBDFE2]"
                      >
                        <IconSvg name="threeDot" />
                      </div>
                      {menuIndex === i && (
                        <div
                          ref={dropdownRef}
                          className={`absolute right-0 ${
                            openUp ? "bottom-8" : "top-1"
                          }  bg-white shadow-xl   text rounded-2xl modal-shadow z-50 2 right-9 animate-[fadeIn_0.15s_ease-out]`}
                        >
                          <div className="flex sm:text-[14px] text-[12px] flex-col space-y-1.5">
                            <button className="flex border-b border-b-[#E1E1E1] items-center gap-2   pl-4.5 py-2.5 hover:bg-gray-100 ">
                              <IconSvg name="editIcon" />
                              Edit Info
                            </button>

                            <button className="flex border-b border-b-[#E1E1E1] items-center gap-2  pr-4.5 pl-3 py-2.5 hover:bg-gray-100 ">
                              <IconSvg name="download" />
                              Export Excel
                            </button>

                            <button className="flex items-center gap-2 pl-4.5 py-2.5  text-red-600 hover:bg-gray-100 rounded-lg">
                              <IconSvg name="deleteIcon" />
                              Delete Info
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* ---------------- pagi ---------------- */}
      <div className="mt-6 lg:mb-12 md:mb-10 sm:mb-9 mb-7 md:mr-9 flex items-center @lg:space-x-3 space-x-2 text-[#464255] font-medium md:justify-end justify-center">
        <button
          onClick={() => changePage(currentPage - 1)}
          className="flex items-center @lg:text-base text-sm cursor-pointer gap-1 hover:text-black transition-colors duration-200"
        >
          <span className="text-lg @lg:block hidden">←</span> Previous
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => changePage(page)}
            className={`
             @lg:px-2.5 px-1 @sm:py-1 py-0.5
            p-0.5 flex items-center @lg:text-base cursor-pointer text-xs justify-center rounded
            transition-all duration-200 ease-in-out
            ${
              page === currentPage
                ? "bg-white border border-gray-300 shadow text-black"
                : "hover:bg-gray-200 border border-transparent"
            }
          `}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => changePage(currentPage + 1)}
          className="flex items-center gap-1 cursor-pointer @lg:text-base text-sm hover:text-black transition-colors duration-200"
        >
          Next <span className="text-lg @lg:block hidden">→</span>
        </button>
      </div>
    </div>
  );
};

export default Table;
