import { useState } from "react";
import Api from "../../shared/utils/api";
import Swal from "sweetalert2";
import type { NoticeFormData, ValidationErrors } from "../../shared/utils/allTypes";

import {  useNavigate } from "react-router-dom";
import NoticeFormHeader from "./components/NoticeFormHeader";
import NoticeForm from "./components/NoticeForm";


const CreateNotice = () => {
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

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [attachmentName, setAttachmentName] = useState<string>("");
  const [loadingAction, setLoadingAction] = useState<"Draft" | "Published" | null>(null);

  const navigate = useNavigate();

  const showSuccessAlert = (noticeTitle: string) => {
    Swal.fire({
      icon: "success",
      title: "Notice Published Successfully",
      html: `
        <p style="margin-top:8px; font-size:14px; color:#555;">
          Your notice "<b>${noticeTitle}</b>" has been published
          and is now visible.
        </p>
        <p style="margin-top:6px; font-size:13px; color:#888;">
          Redirecting to home page...
        </p>
      `,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      willClose: () => {
        navigate("/");
      },
    });
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    if (!formData.targetAudience.length) {
      errors.targetAudience =
        "Please select at least one target department or individual";
      isValid = false;
    }

    if (!formData.title.trim()) {
      errors.title = "Notice title is required";
      isValid = false;
    }

    if (!formData.noticeType) {
      errors.noticeType = "Please select a notice type";
      isValid = false;
    }

    if (!formData.publishDate) {
      errors.publishDate = "Publish date is required";
      isValid = false;
    }

    if (!formData.noticeBody.trim()) {
      errors.noticeBody = "Notice body is required";
      isValid = false;
    }

    if (
      formData.targetAudience.includes("Individual") &&
      !formData.employeeDetail
    ) {
      errors.employeeDetail = "Please select an employee";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };


  const handleSubmit = async (action: "Draft" | "Published") => {
    if (!validateForm()) return;

    setLoadingAction(action);

    const formDataToSend = new FormData();
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

    if (formData?.targetAudience?.includes("Individual")) {
      if (formData.employeeDetail) {
        formDataToSend.append(
          "employeeDetail",
          JSON.stringify(formData.employeeDetail)
        );
      }
    }

    if (formData.attachment) {
      formDataToSend.append("attachmentUrl", formData.attachment);
    }

    try {
      const res = await Api.post("/notice/create-notice", formDataToSend);
      if (res.status === 200) {
        showSuccessAlert(formData.title);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <>
      <NoticeFormHeader />
      <div className="flex items-start justify-center">
        <div className="mx-auto w-full rounded-lg border border-gray-300 bg-white shadow-sm flex flex-col">
          <NoticeForm
            formData={formData}
            setFormData={setFormData}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
            attachmentName={attachmentName}
            setAttachmentName={setAttachmentName}
            loadingAction={loadingAction}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default CreateNotice;