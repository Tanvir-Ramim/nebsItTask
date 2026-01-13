import type { ChangeEvent } from "react";

import { Select } from "antd";
import type { NoticeFormData, ValidationErrors } from "../../../shared/utils/allTypes";
import { departmentsDropDown, employeesDropDonw, noticeTypes } from "../../../shared/utils/content";

interface NoticeFormProps {
  formData: NoticeFormData;
  setFormData: React.Dispatch<React.SetStateAction<NoticeFormData>>;
  validationErrors: ValidationErrors;
  setValidationErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
  attachmentName: string;
  setAttachmentName: React.Dispatch<React.SetStateAction<string>>;
  loadingAction: "Draft" | "Published" | null;
  handleSubmit: (action: "Draft" | "Published") => void;
}

const NoticeForm = ({
  formData,
  setFormData,
  validationErrors,
  setValidationErrors,
  attachmentName,
  setAttachmentName,
  loadingAction,
  handleSubmit,
}: NoticeFormProps) => {
  const INDIVIDUAL = "Individual";

  const handleTargetChange = (selectedValues: string[]) => {
    const errors = { ...validationErrors };
    delete errors.targetAudience;

    if (selectedValues.includes(INDIVIDUAL) && selectedValues.length > 1) {
      const lastSelected = selectedValues[selectedValues.length - 1];

      if (lastSelected === INDIVIDUAL) {
        setFormData((prev) => ({
          ...prev,
          targetAudience: [INDIVIDUAL],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          targetAudience: selectedValues.filter((v) => v !== INDIVIDUAL),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, targetAudience: selectedValues }));
    }

    setValidationErrors(errors);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const errors = { ...validationErrors };
    delete errors[name as keyof ValidationErrors];
    setValidationErrors(errors);

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmployeeIdChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const errors = { ...validationErrors };
    delete errors.employeeDetail;
    setValidationErrors(errors);

    const selectedEmployee = employeesDropDonw?.find((emp) => emp.id === value);

    setFormData((prev) => ({
      ...prev,
      selectedEmpId: value,
      employeeDetail: selectedEmployee
        ? {
            employeeId: selectedEmployee.id,
            name: selectedEmployee.name,
            position: selectedEmployee.position,
          }
        : undefined,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ];

      if (!validTypes.includes(file.type)) {
        alert("Invalid file type. Please upload JPG, PNG, or PDF only.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size too large. Maximum size is 5MB.");
        return;
      }

      setFormData((prev) => ({ ...prev, attachment: file }));
      setAttachmentName(file.name);
    }
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({ ...prev, attachment: null }));
    setAttachmentName("");
  };

  return (
    <>
      {/* Header */}
      <div className="border-b bg-[#F4F5F9] rounded-t-lg border-b-gray-300 md:px-6 sm:px-4 px-3 sm:pb-3 sm:pt-4.5 pt-3.5 pb-2">
        <h2 className="sm:text-base text-sm font-bold">
          Please fill in the details below
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto md:space-y-2 space-y-1 md:px-6 sm:px-4 px-2 py-4">
        <div className="bg-[#F4F5F9] mt-1.5 h-28 px-1 py-3.5 rounded">
          <label className="mb-2 block text-sm font-medium">
            <span className="text-red-500">*</span> Target Departments or
            Individual
          </label>

          <Select
            mode="multiple"
            allowClear
            placeholder="Select department(s)"
            value={formData.targetAudience}
            onChange={handleTargetChange}
            className="w-full"
            size="middle"
          >
            {departmentsDropDown?.map((dept) => (
              <Select.Option key={dept} value={dept}>
                {dept}
              </Select.Option>
            ))}
          </Select>

          <div className="mt-1">
            <p
              className={`sm:text-sm text-xs text-red-500 transition-all duration-300
              ${
                validationErrors.targetAudience
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-1"
              }`}
            >
              {validationErrors.targetAudience || " "}
            </p>
          </div>
        </div>

        <div className="sm:mt-6 mt-3">
          <label className="mb-2 block text-sm font-medium">
            <span className="text-red-500">*</span> Notice Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Write the Title of Notice"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="min-h-5 mt-1">
            <p
              className={`sm:text-sm text-xs text-red-500 transition-all duration-300
              ${
                validationErrors.title
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-1"
              }`}
            >
              {validationErrors.title || " "}
            </p>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out
          ${
            formData.targetAudience?.includes("Individual")
              ? "max-h-96 opacity-100 md:pb-0 pb-7 "
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid md:gap-4 gap-1.5 md:grid-cols-3 ">
            <div className="">
              <label className="mb-2 block text-sm font-medium">
                <span className="text-red-500">*</span> Select Employee ID
              </label>

              <select
                name="selectedEmpId"
                value={formData.selectedEmpId}
                onChange={handleEmployeeIdChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 sm:text-sm text-xs outline-none"
              >
                <option value="">Select employee ID</option>
                {employeesDropDonw.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.id}
                  </option>
                ))}
              </select>

              <div className="min-h-3 mt-1">
                <p
                  className={`sm:text-sm text-xs text-red-500 transition-all duration-300
                  ${
                    validationErrors.employeeDetail
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  {validationErrors.employeeDetail || " "}
                </p>
              </div>
            </div>

            <div className="">
              <label className="mb-2 block text-sm font-medium">
                <span className="text-red-500">*</span> Employee Name
              </label>
              <input
                type="text"
                value={formData.employeeDetail?.name || ""}
                disabled
                placeholder="Employee Name"
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm cursor-not-allowed"
              />
            </div>

            <div className="md:mt-0 mt-6">
              <label className="mb-2 block text-sm font-medium">
                <span className="text-red-500">*</span> Position
              </label>
              <input
                type="text"
                value={formData.employeeDetail?.position || ""}
                disabled
                placeholder="Employee Name"
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="grid md:gap-4 gap-2.5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              <span className="text-red-500">*</span> Notice Type
            </label>
            <select
              name="noticeType"
              value={formData.noticeType}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 border px-4 py-2 text-sm outline-none"
            >
              <option value="">Select Notice Type</option>
              {noticeTypes?.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <div className="min-h-5 mt-1">
              <p
                className={`sm:text-sm text-xs text-red-500 transition-all duration-300
              ${validationErrors.noticeType ? "opacity-100" : "opacity-0"}`}
              >
                {validationErrors.noticeType || " "}
              </p>
            </div>
          </div>

          <div className="md:mb-0 mb-2">
            <label className="mb-2 block text-sm font-medium">
              <span className="text-red-500">*</span> Publish Date
            </label>
            <input
              type="date"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm outline-none"
            />

            <div className="min-h-5 mt-1">
              <p
                className={`sm:text-sm text-xs text-red-500 transition-all duration-300
              ${validationErrors.publishDate ? "opacity-100" : "opacity-0"}`}
              >
                {validationErrors.publishDate || " "}
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            <span className="text-red-500">*</span> Notice Body
          </label>
          <textarea
            rows={4}
            name="noticeBody"
            placeholder="Write the details about notice"
            value={formData.noticeBody}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm resize-none"
          />

          <div className="min-h-5 mt-1">
            <p
              className={`sm:text-sm text-xs text-red-500 transition-all duration-300
            ${validationErrors.noticeBody ? "opacity-100" : "opacity-0"}`}
            >
              {validationErrors.noticeBody || " "}
            </p>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Upload Attachments (optional)
          </label>

          <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed border-emerald-400 md:p-4 p-2.5 text-center">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="mb-2 text-emerald-500">⬆️</div>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-emerald-600">Upload</span>{" "}
                nominee profile image or drag and drop.
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Accepted File Type: jpg, png, pdf (Max 5MB)
              </p>
            </label>
          </div>

          <div className="min-h-6 mt-3">
            {attachmentName && (
              <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm transition-all duration-300">
                📎 {attachmentName}
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap md:justify-end justify-between gap-3 border-t border-gray-300 md:px-4 px-3 py-4 md:py-6">
        <button
          type="button"
          disabled={loadingAction !== null}
          onClick={() => handleSubmit("Draft")}
          className={`rounded-full cursor-pointer border border-blue-500 md:px-5 px-3 md:py-2 py-1.5 md:text-sm text-xs
          ${
            loadingAction
              ? "cursor-not-allowed opacity-60"
              : "text-blue-500 hover:bg-blue-50"
          }`}
        >
          {loadingAction === "Draft" ? "Saving..." : "Save as Draft"}
        </button>

        <button
          type="button"
          disabled={loadingAction !== null}
          onClick={() => handleSubmit("Published")}
          className={`rounded-full cursor-pointer md:px-5 px-3 md:py-2 py-1.5 text-sm font-medium
          ${
            loadingAction
              ? "cursor-not-allowed opacity-60 bg-orange-400"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          <span className="text-white">
            {loadingAction === "Published"
              ? "Publishing..."
              : "✓ Publish Notice"}
          </span>
        </button>
      </div>
    </>
  );
};

export default NoticeForm;