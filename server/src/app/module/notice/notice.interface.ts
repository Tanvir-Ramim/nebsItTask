export type TEmployeeDetail = {
  employeeId: string
  name: string
  position: string
}

export type TNotice = {
  status: "Published" | "Unpublished" | "Draft"
  targetAudience: string[]
  title: string
  noticeType: string
  publishDate: Date
  employeeDetail?: TEmployeeDetail
  noticeBody: string
  attachmentUrl?: string
}
