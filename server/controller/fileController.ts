import Files from '../models/FileModel'
import { Request, Response } from 'express'
import multer from 'multer'
import https from 'https'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { createEmailTemplate } from '../utils/createEmailTemplate'
const nodemailer = require("nodemailer");

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
                downloadPageLink: `${process.env.API_BASE_ENDPOINT_CLIENT}/downloads/${file._id}`
            })

        } catch (error) {
            return res.status(400).json({ message: "Error from Cloudinary" })
        }

    } catch (error) {
        // console.log(error?.message);
        return res.status(500).json({ message: "Internal Server  Error" })
    }

}

module.exports.getFiles = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const file = await Files.findById(id)
        console.log({ file });

        if (!file) {
            return res.status(404).json({ message: "File does not exist" })
        }
        const { fileName, format, sizeInBytes } = file

        return res.status(200).json({
            name: fileName,
            sizeInBytes,
            format
        })
    } catch (error) {
        return res.status(500).json({ message: "Server Error" })
    }
}

module.exports.downloadFile = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const file = await Files.findById(id)
        if (!file) {
            return res.status(404).json({ message: "File does not exist" })
        }

        https.get(file.secure_url, (fileStream) => fileStream.pipe(res))

    } catch (error) {
        return res.status(500).json({ message: "Server Error" })
    }
}

module.exports.sendMail = async (req: Request, res: Response) => {
    //Validate Request

    const { id, emailFrom, emailTo } = req.body
    // Check if file exist
    const file = await Files.findById(id)

    if (!file) {
        return res.status(404).json({ message: "File does not exist" })
    }

    // create transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.USER_PASSWORD,
        },
    });

    // prepare email data
    const { fileName, sizeInBytes } = file
    const fileSize = `${(Number(sizeInBytes) / (1024 * 1024)).toFixed(2)} MB`
    const downloadPageLink = `${process.env.API_BASE_ENDPOINT_CLIENT}/downloads/${file._id}`

    //  send mail using transporter
    const info = await transporter.sendMail({
        from: emailFrom, // sender address
        to: emailTo, // list of receivers
        subject: "A File is Shared", // Subject line
        text: `${emailFrom} Shared a file with you`, // plain text body
        html: createEmailTemplate(emailFrom, emailTo, downloadPageLink, fileName, fileSize), // html body
    });

    file.sender = emailFrom
    file.receiver = emailTo

    await file.save()
    return res.status(200).json({message:"Email Sent"})
    // save the data and send the response
}

