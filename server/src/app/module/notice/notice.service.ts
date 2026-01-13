/* eslint-disable @typescript-eslint/no-explicit-any */

import AppError from '../../erros/AppError'
import { TNotice } from './notice.interface'
import { NoticeModel } from './notice.modal'

import fs from 'fs'
import path from 'path'
const createNoticeService = async (allNoticeData: TNotice) => {
  const result = await NoticeModel.create(allNoticeData)
  return result
}
//get all notices
const getAllNoticesService = async (filter: {
  status?: string
  targetAudience?: string
  date?: string
  page: number
  limit: number
}) => {
  const query: Record<string, any> = {}

  // filters
  if (filter.status) {
    query.status = filter.status
  }

  if (filter.targetAudience) {
    query.targetAudience = filter.targetAudience
  }

  if (filter.date) {
    const start = new Date(filter.date)
    const end = new Date(filter.date)
    end.setHours(23, 59, 59, 999)

    query.createdAt = { $gte: start, $lte: end }
  }

  // pagination calculation
  const skip = (filter.page - 1) * filter.limit

  const [data, total] = await Promise.all([
    NoticeModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(filter.limit),

    NoticeModel.countDocuments(query),
  ])

  return {
    meta: {
      page: filter.page,
      limit: filter.limit,
      total,
      totalPage: Math.ceil(total / filter.limit),
    },
    data,
  }
}

//single notices
const getSingleNoticesService = async (id: string) => {
  const result = await NoticeModel.findById(id)
  return result
}
//update notices
const updateNoticeService = async (id: string, status: string) => {
  const result = await NoticeModel.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  )
  return result
}

//delete notices
const deleteNoticesService = async (ids: string[]) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new AppError('Id Requried ', 404)
  }

  const deletedNotices = []

  for (const id of ids) {
    const notice = await NoticeModel.findById(id)

    if (!notice) {
      continue
    }

    if (notice.attachmentUrl) {
      const filePath = path.join(
        process.cwd(),
        'src/app/.store/files',
        notice.attachmentUrl,
      )

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }

    const deleted = await NoticeModel.findByIdAndDelete(id)
    deletedNotices.push(deleted)
  }

  return {
    totalRequested: ids.length,
    totalDeleted: deletedNotices.length,
    deletedNotices,
  }
}

//view file
const viewFileService = async (filename: string) => {
  const filePath = path.join(process.cwd(), 'src/app/.store/files', filename)
  if (!fs.existsSync(filePath)) {
    throw new AppError('File not found', 404)
  }
  return filePath
}

export const NoticeServices = {
  createNoticeService,
  getAllNoticesService,
  getSingleNoticesService,
  updateNoticeService,
  deleteNoticesService,
  viewFileService,
}
