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



router.get('/all-notices', NoticeController.getAllNotices) //?status=&targetAudience=&publicedate=

export const NoticeRoutes = router
