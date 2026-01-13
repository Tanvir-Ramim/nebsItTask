import express from 'express'
import validateRequest from '../../middlwares/validRequest'

import uploadToServer from '../../utils/multa'
import { NoticeController } from './notice.controller'
import { createNoticeValidationSchema } from './notice.validation'
const router = express.Router()

router.post(
  '/create-notice',
  uploadToServer.single('attachmentUrl'),
  validateRequest(createNoticeValidationSchema),
  NoticeController.createNotice,
)

router.get('/all-notices', NoticeController.getAllNotices)
// ?status=&targetAudience=&date=&page=&limit=

router.get('/single-notice/:id', NoticeController.getSingleNotices)
// sdfsdfsdf
router.patch('/update-notice/:id', NoticeController.updateNotice) //upd  ate-notice/:id?statusData=

router.delete('/delete-notices', NoticeController.deleteNotices)

router.get('/view-file/:filename', NoticeController.viewFile)
export const NoticeRoutes = router
