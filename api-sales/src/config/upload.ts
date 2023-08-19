import multer from 'multer'
import path, { extname } from 'path'
import crypto from 'crypto'

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads')

export default {
	directory: uploadFolder,
	storage: multer.diskStorage({
		destination: uploadFolder,
		filename(request, file, callback) {
			const fileHash = crypto.randomBytes(10).toString('hex')
			const extArray = file.mimetype.split('/')
			const extName = extArray[extArray.length - 1]

			const filename = `${Date.now()}_${fileHash}.${extName}`

			callback(null, filename)
		},
	}),
}
