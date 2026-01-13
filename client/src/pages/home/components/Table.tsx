import { useState, useEffect, useRef } from "react";
import { FaRegEye } from "react-icons/fa";
import "../../../shared/styles/ModalAndScroll.css";
import Api from "../../../shared/utils/api";
import {
  noticeTypeStyles,
  type TNotice,
  type TPageDetails,
} from "../../../shared/utils/content";
import IconSvg from "../../../shared/utils/IconSvg";
import Swal from "sweetalert2";
import { TableSkeletonRow } from "../../../shared/components/TableSkeletonRow";
import FilterSection from "./FilterSection";
import PaginationSection from "./PaginationSection";
import SingleNoticeModal from "./SingleNoticeModal";

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

  const [loading, setLoading] = useState(false);

  const getAllNotices = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllNotices();
  }, [status, department, date, page]);

  const totalPage = pageDetails?.totalPage || 1;

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

  const [menuIndex, setMenuIndex] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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
      Swal.fire({
        icon: "warning",
        title: "No selection",
        text: "Please select at least one notice to delete.",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    try {
      Swal.fire({
        title: "Deleting...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await Api.delete("/notice/delete-notices", {
        data: { ids: selectedIds },
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Selected notices deleted successfully.",
          timer: 2000,
          showConfirmButton: false,
        });

        setSelectedIds([]);
        getAllNotices();
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Failed to delete notices.",
      });
    }
  };

  return (
    <div>
      <div className="bg-white md:px-6 px-4 md:py-3 border border-gray-300 rounded-xl mt-6 overflow-hidden">
        <FilterSection
          date={date}
          setDate={setDate}
          status={status}
          setStatus={setStatus}
          department={department}
          setDepartment={setDepartment}
          setPage={setPage}
          handleDeleteNotice={handleDeleteNotice}
        />

        <div className="w-full min-h-[49vh] md:py-2 py-2 mt-1.5 overflow-x-auto customescroll">
          <table className="w-full text-left border-collapse min-w-275 ">
            <thead>
              <tr className="bg-[#F3F5F6] text-[#464255] md:text-[16px] text-[13px] font-bold">
                <th className="md:p-4 truncate p-2">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={handleSelectAll}
                  />
                  <span className="ml-2">Title</span>
                </th>
                <th className="md:p-4 truncate p-2">Notice Type</th>
                <th className="md:p-4 truncate p-2">Department</th>
                <th className="md:p-4 truncate p-2">Published On</th>
                <th className="md:p-4 truncate p-2">Status</th>
                <th className="md:p-4 p-2 rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: limit || 4 }).map((_, i) => (
                    <TableSkeletonRow key={i} />
                  ))
                : notices?.map((notice, i) => (
                    <tr
                      key={notice._id}
                      className={`border-b md:text-[16px] text-[13px] text-[#464255] border-[#E1E1E1] hover:bg-gray-50 ${
                        notice._id && selectedIds.includes(notice._id)
                          ? "bg-gray-100"
                          : ""
                      }`}
                    >
                      <td className="md:p-4 p-2 md:max-w-56 max-w-40">
                        <div className="flex items-center gap-2">
                          <input
                            className="cursor-pointer w-4 shrink-0"
                            type="checkbox"
                            checked={selectedIds.includes(notice._id)}
                            onChange={(e) => handleSelectRow(e, notice._id)}
                          />

                          <span className="truncate block">{notice.title}</span>
                        </div>
                      </td>
                      <td className="md:p-4 truncate p-2">
                        {notice.noticeType}
                      </td>
                      <td className="md:p-4 truncate p-2">
                        {notice.targetAudience?.join(", ")}
                      </td>
                      <td className="md:p-4 p-2">
                        {new Date(notice?.publishDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td className="md:p-4 p-2">
                        <span
                          className={`px-3 py-1 rounded text-sm font-medium inline-block
      ${noticeTypeStyles[notice.status]?.text}
      ${noticeTypeStyles[notice.status]?.bg}`}
                        >
                          {notice.status}
                        </span>
                      </td>
                      <td className="md:p-4 p-2 relative">
                        <div className="flex gap-4 items-center w-full">
                          <div
                            onClick={() =>
                              notice?._id && getSingleNotice(notice?._id)
                            }
                            className="min-w-0 cursor-pointer"
                          >
                            <FaRegEye size={20} />
                          </div>

                          <div
                            onClick={() => {
                              setMenuIndex(menuIndex === i ? null : i);
                            }}
                            className="border rounded-lg pt-2 px-1.5 cursor-pointer border-[#DBDFE2]"
                          >
                            <IconSvg name="threeDot" />
                          </div>

                          {menuIndex === i && (
                            <div
                              ref={dropdownRef}
                              className={`absolute bg-white shadow-xl rounded-2xl modal-shadow z-50 right-9 animate-[fadeIn_0.15s_ease-out]`}
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

      <PaginationSection page={page} setPage={setPage} totalPage={totalPage} />

      <SingleNoticeModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        singleNotice={singleNotice}
      />
    </div>
  );
};

export default Table;
