import express from 'express'
const { uploadFiles, getFiles } = require('../controller/fileController');
const { uploadSingleFile} = require('../middleware/fileUpload.ts')

const router = express.Router();

router.route('/upload').post(uploadSingleFile, uploadFiles)
router.route('/:id').get(getFiles)

module.exports.fileRouter = router