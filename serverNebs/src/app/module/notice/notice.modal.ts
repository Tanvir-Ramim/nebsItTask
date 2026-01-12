import { model, Schema } from 'mongoose'
import { TEmployeeDetail, TNotice } from './notice.interface'

const employeeDetailSchema = new Schema<TEmployeeDetail>(
  {
    employeeId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  { _id: false },
)

const noticeSchema = new Schema<TNotice>(
  {
    status: {
      type: String,
      required: true,
    },
    targetAudience: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    noticeType: {
      type: String,
      required: true,
    },
    publicDate: {
      type: Date,
      required: true,
    },
    employeeDetail: {
      type: employeeDetailSchema,
      required: false,
    },
    noticeBody: {
      type: String,
      required: true,
    },
    attachmentUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export const NoticeModel = model<TNotice>('Notice', noticeSchema)
