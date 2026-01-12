import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import fs from 'fs'

const uploadPath = path.join(__dirname, '../.store/files')

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  },
})

const uploadToServer = multer({
  storage,
  fileFilter: (req, file, cb: FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png|webp|pdf/
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    )
    const mimeType = allowedTypes.test(file.mimetype)

    if (!extname || !mimeType) {
      return cb(new Error('Only images and PDFs are allowed'))
    }

    cb(null, true)
  },
})

export default uploadToServer
