'use client'
import React, { Dispatch, FunctionComponent, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import folder from '@/app/images/folder.png'

const DropZoneComponent: FunctionComponent<{ setFile: Dispatch<File | null> }> = ({ setFile }) => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFile(acceptedFiles[0])
    }, [])

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'audio/mpeg': []
        }
    })

    return (
        <div className='p-3 w-full'>
            <div {...getRootProps()} className='w-full h-80 rounded-md cursor-pointer focus:outline-none'>
                <input {...getInputProps()} />
                <div className={
                    `flex flex-col items-center justify-center border-2 border-dashed rounded-xl w-full h-full ${isDragReject ? 'border-red-500' : isDragAccept ? 'border-green-500' : 'border-yellow-light'
                    }`

                }
                >
                    <img src='../images/folder.png' alt='folder' className='w-16 h-16' />

                    {
                        isDragReject ?
                            (<p>Sorry, The app only accepts jpeg, png, mp3</p>)
                            :
                            isDragActive ?
                                <p>Drop the files here ...</p> :
                                <p>Drag & Drop Files Here</p>
                    }

                    <p className='mt-2 text-base text-gray-300'>Ony jpeg, png, & mp3 Files Supported</p>
                </div>

            </div>
        </div>
    )
}

export default DropZoneComponent  