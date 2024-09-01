'use client'
import Image from "next/image";
import DropZoneComponent from "./Components/DropZoneComponent";
import { useState } from "react";
import RenderFile from "./Components/RenderFile";
import axios, { AxiosResponse } from "axios";
import { UploadApiResponse } from "../../libs/types";
import DownloadFile from "./Components/DownloadFile";


axios.defaults.baseURL = "http://localhost:8000/"
export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [id, setId] = useState<string | null>(null)
  const [downloadPageLink, setDownloadPageLink] = useState<string | null>(null)
  const [uploadState, setUploadState] = useState<"Uploading" | "Upload Failed" | "Uploaded" | "Upload">("Upload")

  const handleUpload = async () => {
    if (uploadState === 'Uploading') return;
    setUploadState("Uploading")
    if (file) {
      const formData = new FormData()
      formData.append("myFile", file)
      try {
        const response: AxiosResponse<UploadApiResponse> = await axios({
          method: "post",
          data: formData,
          url: "files/upload",
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        const { downloadPageLink, id } = response.data;

        setDownloadPageLink(downloadPageLink);
        setId(id);
        setUploadState("Uploaded")
      } catch (error) {
        if (axios.isAxiosError(error))
          console.log(error?.response?.data);
        setUploadState("Upload Failed")
      }
    } else {
      setUploadState("Upload Failed")
    }
  }

  const resetComponent =()=>{
    setFile(null)
    setDownloadPageLink(null)
    setUploadState('Upload')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center " >
      <h1 className="my-4 text-3xl font-medium">Share Your file</h1>
      <div className="flex flex-col items-center justify-center bg-gray-800 shadow-xl w-96 rounded-xl text-white" >
        {/* DropZone */}
        {!downloadPageLink && <DropZoneComponent setFile={setFile} />}
        {/* render file */}
        {file && <RenderFile file={{
          format: file?.type.split("/")[1] || "",
          name: file?.name || "",
          sizeInBytes: file?.size || 0
        }} />}
        {/* upload button */}

        {
          !downloadPageLink &&
          <button className="p-2 my-5 bg-gray-900 rounded-md w-44 focus:outline-none" onClick={handleUpload}>{uploadState}</button>
        }

        {
          downloadPageLink &&
          <div className="p-2 text-center">

            <DownloadFile downloadPageLink={downloadPageLink} />
            <button className="p-2 my-5 bg-gray-900 rounded-md w-44 focus:outline-none" onClick={resetComponent}>Upload New File</button>
          </div>
        }
      </div>
    </main>
  );
}
