import { useState, ChangeEvent } from "react";
import {
  departmentsDropDown,
  employeesDropDonw,
  noticeTypes,
} from "../../shared/utils/content";
import { Select } from "antd";
import Api from "../../shared/utils/api";
import Swal from "sweetalert2";

// Validation interface
interface ValidationErrors {
  targetAudience?: string;
  title?: string;
  noticeType?: string;
  publishDate?: string;
  noticeBody?: string;
  employeeDetail?: string;
}

// Employee detail interface
export type TEmployeeDetail = {
  employeeId: string;
  name: string;
  position: string;
};

// Form data interface
interface NoticeFormData {
  targetAudience: string[];
  title: string;
  noticeType: string;
  publishDate: string;
  noticeBody: string;
  attachment?: File | null;
  employeeDetail?: TEmployeeDetail;
  selectedEmpId: string;
}

const CreateNotice = () => {
  const INDIVIDUAL = "Individual";

  // Form state
  const [formData, setFormData] = useState<NoticeFormData>({
    targetAudience: [],
    title: "",
    noticeType: "",
    publishDate: "",
    noticeBody: "",
    attachment: null,
    employeeDetail: undefined,
    selectedEmpId: "",
  });

  const showSuccessAlert = (noticeTitle: string) => {
    Swal.fire({
      icon: "success",
      title: "Notice Published Successfully",
      html: `
      <p style="margin-top:8px; font-size:14px; color:#555;">
        Your notice "<b>${noticeTitle}</b>" has been published
        and is now visible to all selected departments.
      </p>
    `,
      showConfirmButton: false,
      showCancelButton: false,
      showDenyButton: true,

      // Custom buttons
      denyButtonText: "Close",

      footer: `
      <div style="display:flex; gap:12px; justify-content:center; margin-top:10px;">
        <button id="viewNotice" class="swal-btn view">View Notice</button>
        <button id="createAnother" class="swal-btn create">+ Create Another</button>
      </div>
    `,

      didOpen: () => {
        document.getElementById("viewNotice")?.addEventListener("click", () => {
          Swal.close();
          // navigate("/notices"); // 👉 your route
        });

        document
          .getElementById("createAnother")
          ?.addEventListener("click", () => {
            Swal.close();
            // reset form or navigate("/notice/create");
          });
      },
    });
  };

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [attachmentName, setAttachmentName] = useState<string>("");

  // Handle target audience change
  const handleTargetChange = (selectedValues: string[]) => {
    const errors = { ...validationErrors };
    delete errors.targetAudience;

    if (selectedValues.includes(INDIVIDUAL) && selectedValues.length > 1) {
      const lastSelected = selectedValues[selectedValues.length - 1];

      if (lastSelected === INDIVIDUAL) {
        const newValues = [INDIVIDUAL];
        setFormData((prev) => ({ ...prev, targetAudience: newValues }));
      } else {
        const newValues = selectedValues.filter((v) => v !== INDIVIDUAL);
        setFormData((prev) => ({ ...prev, targetAudience: newValues }));
      }
    } else {
      setFormData((prev) => ({ ...prev, targetAudience: selectedValues }));
    }

    setValidationErrors(errors);
  };

  // Handle input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Clear validation error for this field
    const errors = { ...validationErrors };
    delete errors[name as keyof ValidationErrors];
    setValidationErrors(errors);

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle employee ID change
  const handleEmployeeIdChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const errors = { ...validationErrors };
    delete errors.employeeDetail;
    setValidationErrors(errors);

    // Find the selected employee
    const selectedEmployee = employeesDropDonw.find((emp) => emp.id === value);

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

  // Handle file upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Invalid file type. Please upload JPG, PNG, or PDF files only.");
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size too large. Maximum size is 5MB.");
        return;
      }

      setFormData((prev) => ({ ...prev, attachment: file }));
      setAttachmentName(file.name);
    }
  };

  // Remove uploaded file
  const handleRemoveFile = () => {
    setFormData((prev) => ({ ...prev, attachment: null }));
    setAttachmentName("");
  };

  // Validation function
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    // Validate target audience
    if (!formData.targetAudience.length) {
      errors.targetAudience =
        "Please select at least one target department or individual";
      isValid = false;
    }

    // Validate title
    if (!formData.title.trim()) {
      errors.title = "Notice title is required";
      isValid = false;
    }

    // Validate notice type
    if (!formData.noticeType) {
      errors.noticeType = "Please select a notice type";
      isValid = false;
    }

    // Validate publish date
    if (!formData.publishDate) {
      errors.publishDate = "Publish date is required";
      isValid = false;
    }

    // Validate notice body
    if (!formData.noticeBody.trim()) {
      errors.noticeBody = "Notice body is required";
      isValid = false;
    }

    // If Individual is selected, validate employee detail
    if (
      formData.targetAudience.includes(INDIVIDUAL) &&
      !formData.employeeDetail
    ) {
      errors.employeeDetail = "Please select an employee";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (action: "Draft" | "Published") => {
    if (!validateForm()) {
      return;
    }

    // Prepare FormData
    const formDataToSend = new FormData();

    // Append form fields
    formDataToSend.append(
      "targetAudience",
      JSON.stringify(formData.targetAudience)
    );
    formDataToSend.append("title", formData.title);
    formDataToSend.append("noticeType", formData.noticeType);
    formDataToSend.append("publishDate", formData.publishDate);
    formDataToSend.append("noticeBody", formData.noticeBody);
    formDataToSend.append(
      "status",
      action === "Published" ? "Published" : "Draft"
    );

    // Append employee detail as object if exists
    if (formData.employeeDetail) {
      formDataToSend.append(
        "employeeDetail",
        JSON.stringify(formData.employeeDetail)
      );
    }

    // Append attachment if exists
    if (formData.attachment) {
      formDataToSend.append("attachmentUrl", formData.attachment);
    }

    try {
      const res = await Api.post("/notice/create-notice", formDataToSend);
      if (res.status === 200) {
        showSuccessAlert(formData.title);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <div className=" flex items-start justify-center">
  <div className="mx-auto w-full rounded-lg border border-gray-300 bg-white shadow-sm flex flex-col">
    {/* Header */}
    <div className="border-b bg-[#F4F5F9] rounded-t-lg border-b-gray-300 px-6 py-4">
      <h2 className="text-sm font-medium">
        Please fill in the details below
      </h2>
    </div>

    {/* Form Body (Scrollable & Fixed Height) */}
    <div className="flex-1 overflow-y-auto space-y-6 p-6">
      {/* Target */}
      <div className="bg-[#F4F5F9] h-[110px] px-4 py-3.5 rounded">
        <label className="mb-2 block text-sm font-medium">
          <span className="text-red-500">*</span> Target Departments or Individual
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
          {departmentsDropDown.map((dept) => (
            <Select.Option key={dept} value={dept}>
              {dept}
            </Select.Option>
          ))}
        </Select>

        {/* Error */}
        <div className=" mt-1">
          <p
            className={`text-sm text-red-500 transition-all duration-300
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

      {/* Notice Title */}
      <div>
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

        <div className="min-h-[20px] mt-1">
          <p
            className={`text-sm text-red-500 transition-all duration-300
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

      {/* Employee Info */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out
          ${
            formData.targetAudience?.includes("Individual")
              ? "max-h-40 opacity-100"
              : "max-h-0 opacity-0"
          }`}
      >
        <div className="grid gap-4 md:grid-cols-3 pt-4">
          {/* Employee ID */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              <span className="text-red-500">*</span> Select Employee ID
            </label>

            <select
              name="selectedEmpId"
              value={formData.selectedEmpId}
              onChange={handleEmployeeIdChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm outline-none"
            >
              <option value="">Select employee ID</option>
              {employeesDropDonw.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.id}
                </option>
              ))}
            </select>

            <div className="min-h-[20px] mt-1">
              <p
                className={`text-sm text-red-500 transition-all duration-300
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

          {/* Employee Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              <span className="text-red-500">*</span> Employee Name
            </label>
            <input
              type="text"
              value={formData.employeeDetail?.name || ""}
              disabled
              className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm cursor-not-allowed"
            />
          </div>

          {/* Position */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              <span className="text-red-500">*</span> Position
            </label>
            <input
              type="text"
              value={formData.employeeDetail?.position || ""}
              disabled
              className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Notice Type & Date */}
      <div className="grid gap-4 md:grid-cols-2">
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
            {noticeTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <div className="min-h-[20px] mt-1">
            <p className={`text-sm text-red-500 transition-all duration-300
              ${validationErrors.noticeType ? "opacity-100" : "opacity-0"}`}
            >
              {validationErrors.noticeType || " "}
            </p>
          </div>
        </div>

        <div>
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

          <div className="min-h-[20px] mt-1">
            <p className={`text-sm text-red-500 transition-all duration-300
              ${validationErrors.publishDate ? "opacity-100" : "opacity-0"}`}
            >
              {validationErrors.publishDate || " "}
            </p>
          </div>
        </div>
      </div>

      {/* Notice Body */}
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

        <div className="min-h-[20px] mt-1">
          <p className={`text-sm text-red-500 transition-all duration-300
            ${validationErrors.noticeBody ? "opacity-100" : "opacity-0"}`}
          >
            {validationErrors.noticeBody || " "}
          </p>
        </div>
      </div>

      {/* Upload */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Upload Attachments (optional)
        </label>

        <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed border-emerald-400 p-6 text-center">
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

        {/* Reserved space (no jump) */}
        <div className="min-h-[36px] mt-3">
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

    {/* Footer (Fixed) */}
    <div className="flex flex-wrap items-center justify-end gap-3 border-t px-6 py-4">
      <button
        type="button"
        className="rounded-full border px-6 py-2 text-sm text-gray-600 hover:bg-gray-100"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={() => handleSubmit("Draft")}
        className="rounded-full border border-blue-500 px-6 py-2 text-sm text-blue-500 hover:bg-blue-50"
      >
        Save as Draft
      </button>
      <button
        type="button"
        onClick={() => handleSubmit("Published")}
        className="rounded-full bg-orange-500 px-6 py-2 text-sm font-medium text-white hover:bg-orange-600"
      >
        ✓ Publish Notice
      </button>
    </div>
  </div>
</div>

  );
};

export type TNotice = {
  status: "Published" | "Unpublished" | "Draft";
  targetAudience: string[];
  title: string;
  noticeType: string;
  publicDate: Date;
  employeeDetail?: TEmployeeDetail;
  noticeBody: string;
  attachmentUrl?: string;
};

export default CreateNotice;
