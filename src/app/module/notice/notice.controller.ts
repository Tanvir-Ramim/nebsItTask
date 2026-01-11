import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

import status from 'http-status'
import { NoticeServices } from './notice.service'

const createNotice = catchAsync(async (req, res, next) => {
  try {
    const noticeAllData = req.body
    if (req.file) {
      noticeAllData.attachmentUrl = req.file.filename
    }
    const result = await NoticeServices.createNoticeService(noticeAllData)
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
})

const getAllNotices = catchAsync(async (req, res, next) => {
  try {
    const filterData = {
      status: req.query.status as string,
      targetAudience: req.query.targetAudience as string,
      date: req.query.date as string,
    }
    const result = await NoticeServices.getAllNoticesService(filterData)
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
})

export const NoticeController = {
  createNotice,
  getAllNotices,
}
