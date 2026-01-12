import { useState, useEffect } from "react";
import IconSvg from "../utils/IconSvg";
import { departmentsDropDown } from "../utils/content";
import Api from "../utils/api";

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

const Table = () => {
  const [notices, setNotices] = useState<TNotice[]>([]);
  const [pageDetails, setPageDetails] = useState<any>({});

  /* ---------------- filters ---------------- */
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");

  /* ---------------- pagination ---------------- */
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

  /* ---------------- pagination helpers ---------------- */
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
            </div>
          </div>
        </div>

        <div className="w-full md:py-2 py-1.4 mt-1.5 overflow-x-auto customescroll">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-[#F3F5F6] text-[#464255] md:text-[16px] text-[13px] font-bold">
                <th className="md:p-4 p-2 rounded-l-lg">Title</th>
                <th className="md:p-4 truncate p-2">Notice Type</th>
                <th className="md:p-4 p-2">Department</th>
                <th className="md:p-4 truncate p-2">Published On</th>
                <th className="md:p-4 truncate p-2">Status</th>
                <th className="md:p-4 p-2 rounded-r-lg">Action</th>
              </tr>
            </thead>

            <tbody>
              {notices.map((notice) => (
                <tr
                  key={notice._id}
                  className="border-b md:text-[16px] text-[13px] text-[#464255] border-[#E1E1E1] hover:bg-gray-50"
                >
                  <td className="md:p-4 p-2">{notice.title}</td>
                  <td className="md:p-4 truncate p-2">{notice.noticeType}</td>
                  <td className="md:p-4 truncate p-2">
                    {notice.targetAudience?.join(", ")}
                  </td>
                  <td className="md:p-4 p-2">{notice.publishDate}</td>
                  <td className="md:p-4 truncate p-2">{notice.status}</td>
                  <td className="md:p-4 p-2 relative w-[140px]">
                    <div className="flex items-center gap-3.5 w-full min-w-[200px]">
                      <div className="flex-1 min-w-0"></div>
                      <div className="border rounded-lg pt-2 px-1.5 cursor-pointer border-[#DBDFE2]">
                        <IconSvg name="threeDot" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------------- pagination ---------------- */}
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
    </div>
  );
};

export default Table;
