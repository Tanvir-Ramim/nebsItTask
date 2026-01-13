import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

import status from 'http-status'
import { NoticeServices } from './notice.service'
import fs from 'fs'
import path from 'path'
import AppError from '../../erros/AppError'

//create notice
const createNotice = catchAsync(async (req, res) => {

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
 
})

// get all notices
const getAllNotices = catchAsync(async (req, res) => {

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
})
//get single notices
const getSingleNotices = catchAsync(async (req, res) => {

    const { id } = req.params
    const result = await NoticeServices.getSingleNoticesService(id)
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Single Notice retrieved successfully',
      data: result,
    })

})

//update notices
const updateNotice = catchAsync(async (req, res) => {
 
    const { id } = req.params
    const { statusData } = req.body as { statusData: string }
      console.log(statusData);
    const result = await NoticeServices.updateNoticeService(id, statusData)
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Single Notice update successfully',
      data: result,
    })
 
})

//delete notices
const deleteNotices = catchAsync(async (req, res) => {

    const { ids } = req.body

    const result = await NoticeServices.deleteNoticesService(ids)

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Notices deleted successfully',
      data: result,
    })
 
    

})

const viewFile = catchAsync(async (req, res) => {
  const { filename } = req.params
 
  if (filename.includes("..")) {
    throw new AppError("Invalid file name", status.BAD_REQUEST);
  }

  const filePath = path.join(
    process.cwd(),
    "/dist/app/.store/files",
    filename
  );

  if (!fs.existsSync(filePath)) {
    throw new AppError("File not found", status.NOT_FOUND);
  }
  res.setHeader("Content-Disposition", "inline");
  res.sendFile(filePath);
})
export const NoticeController = {
  createNotice,
  getAllNotices,
  getSingleNotices,
  updateNotice,
  deleteNotices,
  viewFile,
}
