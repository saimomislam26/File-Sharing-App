import axios, { AxiosResponse } from "axios";
import { IFile } from "./types";

export const getDownloadFile: (id: string) => Promise<IFile | undefined> = async (id: string) => {
  try {
    const response: AxiosResponse<IFile> = await axios({
      method: "get",
      url: `http://localhost:8000/files/${id}`,
      headers: {
        "Content-Type": "application/json"
      }
    })
    // console.log(response.data);

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error))
      console.log(error?.response?.data);
  }
}

export const getDownloaded: (id: string) => Promise<Blob> = async (id: string) => {
  try {
    const response: AxiosResponse = await axios({
      method: "get",
      url: `http://localhost:8000/files/${id}/download`,
      responseType: "blob",
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error))
      console.log(error?.response?.data);
  }
}

export const sendMail: (id: string, emailFrom: string, emailTo: string) => Promise<{ message: string }> = async (id, emailFrom, emailTo) => {
  try {
    const response: AxiosResponse = await axios({
      method: "post",
      url: `http://localhost:8000/files/email`,
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        id,
        emailFrom,
        emailTo
      }

    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error))
      console.log(error?.response?.data);
  }
}