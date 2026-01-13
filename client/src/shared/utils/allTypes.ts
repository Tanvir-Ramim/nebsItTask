export type TEmployeeDetail = {
  employeeId: string;
  name: string;
  position: string;
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

export interface NoticeFormData {
  targetAudience: string[];
  title: string;
  noticeType: string;
  publishDate: string;
  noticeBody: string;
  attachment?: File | null;
  employeeDetail?: TEmployeeDetail;
  selectedEmpId: string;
}
 export interface ValidationErrors {
  targetAudience?: string;
  title?: string;
  noticeType?: string;
  publishDate?: string;
  noticeBody?: string;
  employeeDetail?: string;
}
