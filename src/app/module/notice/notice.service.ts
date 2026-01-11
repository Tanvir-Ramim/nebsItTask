/* eslint-disable @typescript-eslint/no-explicit-any */
import { TNotice } from './notice.interface'
import { NoticeModel } from './notice.modal'

const createNoticeService = async (allNoticeData: TNotice) => {
  const result = await NoticeModel.create(allNoticeData)
  return result
}

const getAllNoticesService = async (filter: {
  status?: string | string[]
  targetAudience?: string
  date?: string
}) => {
  const query: Record<string, any> = {}

  if (filter.status && filter.status !== '' && !Array.isArray(filter.status)) {
    query.status = filter.status
  }

  if (
    filter.targetAudience &&
    filter.targetAudience !== '' &&
    !Array.isArray(filter.targetAudience)
  ) {
    query.targetAudience = filter.targetAudience
  }

  if (filter.date && filter.date !== '') {
    const start = new Date(filter.date)
    const end = new Date(filter.date)
    end.setHours(23, 59, 59, 999)

    query.createdAt = { $gte: start, $lte: end }
  }



  return await NoticeModel.find(query).sort({ createdAt: -1 })
}

export const NoticeServices = {
  createNoticeService,
  getAllNoticesService,
}
