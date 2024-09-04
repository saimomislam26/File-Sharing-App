import express from 'express'
const { uploadFiles, getFiles, downloadFile, sendMail } = require('../controller/fileController');
const { uploadSingleFile } = require('../middleware/fileUpload.ts')

const router = express.Router();

router.route('/upload').post(uploadSingleFile, uploadFiles)
router.route('/:id').get(getFiles)
router.route('/:id/download').get(downloadFile)
router.route('/email').post(sendMail)

module.exports.fileRouter = router