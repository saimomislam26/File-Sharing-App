import axios, { AxiosResponse } from "axios";
import { IFile } from "./types";

export const getDownloadFile: (id: string) => Promise<IFile | undefined> = async(id:string)=>{
    try {
        const response: AxiosResponse<IFile> = await axios({
          method: "get",
          url: `http://localhost:8000/files/${id}`,
          headers: {
            "Content-Type": "application/json"
          }
        })
        console.log(response.data);
        
        return response.data
      } catch (error) {
        if (axios.isAxiosError(error))
          console.log(error?.response?.data);
      }
}