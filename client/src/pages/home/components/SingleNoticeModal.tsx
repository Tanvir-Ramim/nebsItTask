import { RxCross2 } from "react-icons/rx";
import type { TNotice } from "../../../shared/utils/content";
import Api from "../../../shared/utils/api";

interface SingleNoticeModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  singleNotice: TNotice | null;
}

const SingleNoticeModal = ({
  isModalOpen,
  setIsModalOpen,
  singleNotice,
}: //   handleViewFile,
SingleNoticeModalProps) => {
  if (!isModalOpen || !singleNotice) return null;
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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl modal-slide-down relative overflow-hidden">
        <div className="flex items-center justify-between gap-3.5 px-6 pt-3 border-b border-b-gray-300">
          <h2 className="sm:text-lg text-base font-semibold text-gray-800">
            {singleNotice.title}
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 cursor-pointer hover:text-gray-600 text-2xl"
          >
            <RxCross2 />
          </button>
        </div>

        <div className="px-6 py-5 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-medium text-gray-800">{singleNotice.status}</p>
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
              <div className="border border-gray-300 rounded-lg p-2 bg-gray-50">
                <h3 className="font-bold text-gray-700 pt-3">
                  <span className="font-bold"> Employee Details</span>
                </h3>

                <div className="grid pt-3 grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
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

          <div className="pt-3">
            <p className="text-gray-500 mb-1">Notice Description</p>
            <p className="text-gray-700 text-sm leading-relaxed">
              {singleNotice.noticeBody}
            </p>
          </div>
        </div>

        <div
          className={`flex flex-row items-center ${
            singleNotice.attachmentUrl ? "justify-between" : "justify-end"
          } gap-3 px-6 py-4 border-t-gray-300 border-t bg-gray-50`}
        >
          {singleNotice.attachmentUrl && (
            <button
              onClick={() =>
                handleViewFile(singleNotice.attachmentUrl as string)
              }
              className="px-4 py-2 cursor-pointer rounded-md bg-blue-600  text-sm font-medium hover:bg-blue-700 transition"
            >
              <span className="text-white"> View File</span>
            </button>
          )}

          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2  bg-red-500 cursor-pointer rounded-md border border-gray-300 text-white text-sm font-medium transition"
          >
            <span className="text-white"> Close</span>
       
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleNoticeModal;
