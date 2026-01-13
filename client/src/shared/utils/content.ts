
export const employeesDropDonw = [
  {
    id: "em1",
    name: "John Smith",
    position: "Software Developer",
  },
  {
    id: "em2",
    name: "Sarah Johnson",
    position: "Sales Executive",
  },
  {
    id: "em3",
    name: "Mike Chen",
    position: "QA Engineer",
  },
  {
    id: "em4",
    name: "Emma Wilson",
    position: "Project Manager",
  },
  {
    id: "em5",
    name: "Alex Brown",
    position: "Senior Tester",
  },
];

export const noticeTypes = [
  "Warning",
  "Holiday",
  "Advisory",
  "Performance Improvement",
  "General",
  "Urgent",
  "Meeting",
  "Policy Update",
  "Training",
  "Deadline",
];
export const colors = [
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
  "bg-teal-100 text-teal-700",
];

export const departmentsDropDown = [
  "Individual",
  "Development",
  "SQA",
  "Marketing",
];

export const noticeTypeStyles: Record<
  string,
  { text: string; bg: string }
> = {
  Published: {
    text: "text-[#00A46E]",
    bg: "bg-[#DAFAEF]",
  },
  Unpublished: {
    text: "text-[#334155]",
    bg: "bg-[#F0F0F0]",
  },
  Draft: {
    text: "text-[#F59E0B]",
    bg: "bg-[#F9EDE0]",
  },
};

export type TEmployeeDetail = {
  employeeId: string;
  name: string;
  position: string;
};

export type TNotice = {
  _id: string;
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
