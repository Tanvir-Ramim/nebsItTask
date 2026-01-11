import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

import status from 'http-status'
import { NoticeServices } from './notice.service'

const createNotice = catchAsync(async (req, res, next) => {
  try {
    const { noticeAllData } = req.body
    if (req.file) {
      noticeAllData.attachmentUrl = req.file.path
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

export const NoticeController = {
  createNotice,
}
