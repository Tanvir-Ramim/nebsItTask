import { useState, useEffect, useRef } from "react";
import IconSvg from "../utils/IconSvg";
import { departmentsDropDown } from "../utils/content";
import Api from "../utils/api";
import { FaRegEye } from "react-icons/fa";
import "../styles/ModalAndScroll.css";
export type TEmployeeDetail = {
  employeeId: string;
  name: string;
  position: string;
};

export type TNotice = {
  _id?: string;
  status: "Published" | "Unpublished" | "Draft";
  targetAudience: string[];
  title: string;
  noticeType: string;
  publishDate: string;
  employeeDetail?: TEmployeeDetail;
  noticeBody: string;
  attachmentUrl?: string;
};
export type TPageDetails = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

const Table = () => {
  const [notices, setNotices] = useState<TNotice[]>([]);
  const [pageDetails, setPageDetails] = useState<TPageDetails>({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 1,
  });


  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");


  const [page, setPage] = useState(1);
  const limit = 10;

  const getAllNotices = async () => {
    try {
      const response = await Api.get(`/notice/all-notices`, {
        params: {
          status: status || undefined,
          targetAudience: department || undefined,
          date: date || undefined,
          page,
          limit,
        },
      });

      setNotices(response.data.data.data);
      setPageDetails(response.data.data.meta);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  useEffect(() => {
    getAllNotices();
  }, [status, department, date, page]);


  const totalPage = pageDetails?.totalPage || 1;

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`
             @lg:px-2.5 px-1 @sm:py-1 py-0.5
            p-0.5 flex items-center @lg:text-base cursor-pointer text-xs justify-center rounded
            transition-all duration-200 ease-in-out
            ${page === i ? "bg-black text-white" : ""}
          `}
        >
          {i}
        </button>
      );
    }
    return pages;
  };
  const [singleNotice, setSingleNotice] = useState<TNotice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getSingleNotice = async (id: string) => {
    try {
      const response = await Api.get(`/notice/single-notice/${id}`);
      if (response.status === 200) {
        setSingleNotice(response.data.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching single notice:", error);
    }
  };
  console.log(singleNotice);

  const handleViewFile = async (fileName: string) => {
    try {
      const res = await Api.get(`/notice/view-file/${fileName}`, {
        responseType: "blob",
      });

      const blob = new Blob([res.data], {
        type: res.headers["content-type"],
      });

      const fileURL = URL.createObjectURL(blob);

   
      window.open(fileURL, "_blank");

   
      setTimeout(() => URL.revokeObjectURL(fileURL), 10000);
    } catch (error) {
      console.error("Error opening file:", error);
    }
  };
  const [menuIndex, setMenuIndex] = useState(null);
  const [openUp, setOpenUp] = useState(false);

  const rowRefs = useRef([]);
  const dropdownRef = useRef(null);
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

  const updatePublishStatus = async (id: string, newStatus: string) => {
    try {
      const response = await Api.patch(`/notice/update-notice/${id}`, {
        statusData: newStatus,
      });

      if (response.status === 200) {
        getAllNotices();
        setMenuIndex(null);
      }
    } catch (error) {
      console.error("Error updating publish status:", error);
    }
  };
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = notices.map((notice) => notice._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  
  const handleSelectRow = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.target.checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const isAllSelected =
    selectedIds.length === notices.length && notices.length > 0;
  const isIndeterminate =
    selectedIds.length > 0 && selectedIds.length < notices.length;

  
  const handleDeleteNotice = async () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one notice to delete.");
      return;
    }

    try {
      const response = await Api.delete("/notice/delete-notices", {
        data: { ids: selectedIds },
      });

      if (response.status === 200) {
        alert("Selected notices deleted successfully!");
        setSelectedIds([]);
        // Refresh notices list
        getNotices && getNotices();
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete notices.");
    }
  };
  return (
    <div>
      <div className="bg-white md:px-6 px-4 md:py-3 py-2.5 border border-gray-300 rounded-xl mt-6 overflow-hidden">
        <div>
          <div className="w-full flex @6xl:flex-row flex-col @6xl:items-center justify-between sm:py-4 py-2.5 ">
            <h2 className="text-lg @6xl:w-[30%] 6xl:mb-0 mb-4 font-semibold text-[#0A0A0A]">
              Employee Time Logs
            </h2>

            <div className="grid @6xl:grid-cols-5 @5xl:grid-cols-4 @md:grid-cols-2 items-center gap-3">
              <input
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm outline-none"
                type="date"
                value={date}
                onChange={(e) => {
                  setPage(1);
                  setDate(e.target.value);
                }}
              />

              <select
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm outline-none"
                value={status}
                onChange={(e) => {
                  setPage(1);
                  setStatus(e.target.value);
                }}
              >
                <option value="">Select Status</option>
                <option>Published</option>
                <option>Unpublished</option>
                <option>Draft</option>
              </select>

              <select
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm outline-none"
                value={department}
                onChange={(e) => {
                  setPage(1);
                  setDepartment(e.target.value);
                }}
              >
                <option value="">Select Department</option>
                {departmentsDropDown.map((emp) => (
                  <option key={emp}>{emp}</option>
                ))}
              </select>
              <button
                onClick={handleDeleteNotice}
                className="border border-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:py-2 py-1.4 mt-1.5 overflow-x-auto customescroll">
           <table className="w-full text-left border-collapse min-w-[1100px]">
          <thead>
            <tr className="bg-[#F3F5F6] text-[#464255] md:text-[16px] text-[13px] font-bold">
              <th className="md:p-4 p-2 rounded-l-lg">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="md:p-4 truncate p-2">Title</th>
              <th className="md:p-4 truncate p-2">Notice Type</th>
              <th className="md:p-4 truncate p-2">Department</th>
              <th className="md:p-4 truncate p-2">Published On</th>
              <th className="md:p-4 truncate p-2">Status</th>
              <th className="md:p-4 p-2 rounded-r-lg">Action</th>
            </tr>
          </thead>

          <tbody>
            {notices.map((notice, i) => (
              <tr
                key={notice._id}
                className={`border-b md:text-[16px] text-[13px] text-[#464255] border-[#E1E1E1] hover:bg-gray-50 ${
                  selectedIds.includes(notice._id) ? "bg-gray-100" : ""
                }`}
              >
                {/* Row Checkbox */}
                <td className="md:p-4 p-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(notice._id)}
                    onChange={(e) => handleSelectRow(e, notice._id)}
                  />
                </td>

                <td className="md:p-4 p-2">{notice.title}</td>
                <td className="md:p-4 truncate p-2">{notice.noticeType}</td>
                <td className="md:p-4 truncate p-2">
                  {notice.targetAudience?.join(", ")}
                </td>
                <td className="md:p-4 p-2">{notice.publishDate}</td>
                <td className="md:p-4 truncate p-2">{notice.status}</td>
                <td className="md:p-4 p-2 relative">
                  <div className="flex gap-4 items-center w-full">
                    {/* View Button */}
                    <div
                      onClick={() =>
                        notice?._id && getSingleNotice(notice?._id)
                      }
                      className="min-w-0 cursor-pointer"
                    >
                      <FaRegEye size={20} />
                    </div>

                    {/* Menu */}
                    <div
                      onClick={() => {
                        setMenuIndex(menuIndex === i ? null : i);
                      }}
                      className="border rounded-lg pt-2 px-1.5 cursor-pointer border-[#DBDFE2]"
                    >
                      <IconSvg name="threeDot" />
                    </div>

                    {/* Dropdown */}
                    {menuIndex === i && (
                      <div
                        ref={dropdownRef}
                        className={`absolute right-0 ${
                          openUp ? "bottom-8" : "top-1"
                        } bg-white shadow-xl rounded-2xl modal-shadow z-50 right-9 animate-[fadeIn_0.15s_ease-out]`}
                      >
                        <div className="flex flex-col space-y-1.5 sm:text-[14px] text-[12px] p-2">
                          <div className="flex items-center justify-between gap-3">
                            <span
                              className={`font-medium ${
                                notice.status === "Published"
                                  ? "text-green-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {notice.status === "Published"
                                ? "Published"
                                : "Unpublished"}
                            </span>
                            <button
                              onClick={() =>
                                updatePublishStatus(
                                  notice._id,
                                  notice.status === "Published"
                                    ? "Unpublished"
                                    : "Published"
                                )
                              }
                              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 ${
                                notice.status === "Published"
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                                  notice.status === "Published"
                                    ? "translate-x-4"
                                    : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
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
          disabled={page === 1}
          onClick={() => setPage((p: number) => Math.max(1, p - 1))}
          className="flex items-center @lg:text-base text-sm cursor-pointer gap-1 hover:text-black disabled:opacity-40"
        >
          <span className="text-lg @lg:block hidden">←</span> Previous
        </button>

        {renderPages()}

        <button
          disabled={page === totalPage}
          onClick={() => setPage((p: number) => Math.min(totalPage, p + 1))}
          className="flex items-center gap-1 cursor-pointer @lg:text-base text-sm hover:text-black disabled:opacity-40"
        >
          Next <span className="text-lg @lg:block hidden">→</span>
        </button>
      </div>
      {isModalOpen && singleNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl modal-slide-down relative overflow-hidden">
         
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                {singleNotice.title}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                &times;
              </button>
            </div>

       
            <div className="px-6 py-5 space-y-4">
         
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="font-medium text-gray-800">
                    {singleNotice.status}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Notice Type</p>
                  <p className="font-medium text-gray-800">
                    {singleNotice.noticeType}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Publish Date</p>
                  <p className="font-medium text-gray-800">
                    {new Date(singleNotice.publishDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Audience</p>
                  <p className="font-medium text-gray-800">
                    {singleNotice.targetAudience.join(", ")}
                  </p>
                </div>
              </div>

        
              {singleNotice.targetAudience.includes("Individual") &&
                singleNotice.employeeDetail && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-semibold text-gray-700 mb-3">
                      Employee Details
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Employee ID</p>
                        <p className="font-medium text-gray-800">
                          {singleNotice.employeeDetail.employeeId}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Name</p>
                        <p className="font-medium text-gray-800">
                          {singleNotice.employeeDetail.name}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Position</p>
                        <p className="font-medium text-gray-800">
                          {singleNotice.employeeDetail.position}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

            
              <div>
                <p className="text-gray-500 mb-1">Notice Description</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {singleNotice.noticeBody}
                </p>
              </div>
            </div>

     
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t bg-gray-50">
           
              {singleNotice.attachmentUrl && (
                <h1
                  onClick={() =>
                    handleViewFile(singleNotice.attachmentUrl as string)
                  }
                  className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                >
                  View File
                </h1>
              )}

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-sm hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
