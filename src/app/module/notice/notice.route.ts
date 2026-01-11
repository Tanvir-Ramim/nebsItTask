import express from 'express'
import validateRequest from '../../middlwares/validRequest'

import { noticeZValidation } from '../notice/notice.validation'
import uploadToServer from '../../utils/multa'
import { NoticeController } from './notice.controller'
const router = express.Router()

router.post(
  '/create-notice',
  validateRequest(noticeZValidation.createNoticeValidationSchema),
  uploadToServer.single("files"),

  NoticeController.createNotice,
)

export const NoticeRoutes = router
