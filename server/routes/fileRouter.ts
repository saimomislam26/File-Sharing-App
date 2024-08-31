import express from 'express'
const { uploadFiles } = require('../controller/fileController');
const { uploadSingleFile } = require('../middleware/fileUpload.ts')

const router = express.Router();

router.route('/upload').post(uploadSingleFile, uploadFiles)

module.exports.fileRouter = router