export interface IFile{
    name:string,
    sizeInBytes:number,
    format:string,
    id?:string
}

export interface UploadApiResponse{
    downloadPageLink: string;
    id: string;
}