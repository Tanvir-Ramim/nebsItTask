export type TEmployeeDetail = {
  employeeId: string
  name: string
  position: string
}

export type TNotice = {
    id: string
  targetAudience: string
  title: string
  noticeType: string
  publicDate: Date
  employeeDetail?: TEmployeeDetail
  noticeBody: string
  attachmentUrl?: string
}

