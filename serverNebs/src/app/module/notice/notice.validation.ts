import { z } from 'zod'

const employeeDetailValidationSchema = z.object({
  employeeId: z.string({
    required_error: 'Employee ID is required',
    invalid_type_error: 'Employee ID must be a string',
  }),

  name: z.string({
    required_error: 'Employee name is required',
    invalid_type_error: 'Employee name must be a string',
  }),

  position: z.string({
    required_error: 'Employee position is required',
    invalid_type_error: 'Employee position must be a string',
  }),
})

export const createNoticeValidationSchema = z.object({
  // id: z.string({
  //   required_error: 'Notice ID is required',
  //   invalid_type_error: 'Notice ID must be a string',
  // }),

  body: z.object({
    status: z.enum(['Published', 'Unpublished', 'Draft']),
    targetAudience: z.string({
      required_error: 'Target audience is required',
      invalid_type_error: 'Target audience must be a string',
    }),

    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }),

    noticeType: z.string({
      required_error: 'Notice type is required',
      invalid_type_error: 'Notice type must be a string',
    }),

    publicDate: z.coerce.date({
      required_error: 'Public date is required',
      invalid_type_error: 'Public date must be a valid date',
    }),

    employeeDetail: employeeDetailValidationSchema.optional(),

    noticeBody: z.string({
      required_error: 'Notice body is required',
      invalid_type_error: 'Notice body must be a string',
    }),

    attachmentUrl: z
      .string({
        invalid_type_error: 'Attachment URL must be a string',
      })
      .url('Attachment URL must be a valid URL')
      .optional(),
  }),
})

export const noticeZValidation = {
  createNoticeValidationSchema,
}
