import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

import status from 'http-status'
import { NoticeServices } from './notice.service'

//create notice
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
      message: 'Notice created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
})

// get all notices
const getAllNotices = catchAsync(async (req, res, next) => {
  try {
    const filterData = {
      status: req.query.status as string,
      targetAudience: req.query.targetAudience as string,
      date: req.query.date as string,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    }

    const result = await NoticeServices.getAllNoticesService(filterData)

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Notices retrieved successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
})
//get single notices
const getSingleNotices = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await NoticeServices.getSingleNoticesService(id)
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Single Notice retrieved successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
})

//update notices
const updateNotice = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params
    const { statusData } = req.query as { statusData: string }
    const result = await NoticeServices.updateNoticeService(id, statusData)
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Single Notice update successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
})

//delete notices
const deleteNotices = catchAsync(async (req, res, next) => {
  try {
    const { ids } = req.body

    const result = await NoticeServices.deleteNoticesService(ids)

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Notices deleted successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
})

export const NoticeController = {
  createNotice,
  getAllNotices,
  getSingleNotices,
  updateNotice,
  deleteNotices,
}
