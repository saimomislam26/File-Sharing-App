import Files from '../models/FileModel'
import { Request, Response } from 'express'
import multer from 'multer'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

const storage = multer.diskStorage({})

const upload = multer({
    storage
})

module.exports.uploadFiles = async (req: Request, res: Response) => {
    upload.single("myFile")
    try {
        if (!req.file) {
            return res.status(400).json({ message: "There is no file" })
        }

        try {
            const cloudinaryUpload: UploadApiResponse = await cloudinary.uploader.upload(req.file.path, {
                folder: "file sharing app",
                resource_type: "auto"
            })

            const { originalname } = req.file
            const { secure_url, bytes, format } = cloudinaryUpload

            const file = await Files.create({
                fileName: originalname,
                sizeInBytes: bytes,
                secure_url,
                format
            })

            res.status(200).json({
                id: file._id,
                downloadPageLink: `${process.env.API_BASE_ENDPOINT_CLIENT}/download/${file._id}`
            })

        } catch (error) {
            return res.status(400).json({ message: "Error from Cloudinary" })
        }

    } catch (error) {
        // console.log(error?.message);
        return res.status(500).json({ message: "Internal Server  Error" })
    }

}

