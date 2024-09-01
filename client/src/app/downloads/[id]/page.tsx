import React, { FunctionComponent } from 'react'
import { getDownloadFile } from '../../../../libs/getDownloadFile'
// import { GetServerSidePropsContext, NextPage } from 'next'
// import { notFound } from 'next/navigation'
import { IFile } from '../../../../libs/types'
import RenderFile from '@/app/Components/RenderFile'


// This is a way of calling api in nextjs
const DownloadPage: FunctionComponent<{ params: { id: string } }> = async ({ params }) => {
  let { id } = params

  // This is a way of calling api in nextjs
  const data: IFile | undefined = await getDownloadFile(id)

  if (!data) {
    return (
      <div> File Not Found</div>
    )
  }

  const { name, format, sizeInBytes } = data

  // Another Way
  // const DownloadPage: NextPage<{ file: IFile }> = ({ file: { name, format, sizeInBytes, id } }) => {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <div className='flex flex-col items-center justify-center h-80 w-96 border-2 bg-gray-800 rounded-md shadow-xl'>
        <img src="../images/file-download.png" alt="" className='w-16 h-16' />
        <h1 className='text-xl mt-5'>Your file is ready to be downloaded</h1>
        <RenderFile file={data} />
        <button className="p-2 my-5 bg-gray-900 rounded-md w-44 focus:outline-none text-white" >Download</button>
      </div>
    </main>

  )
}

export default DownloadPage


// Can not use inside app directory
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const { id } = context.query
//   let file;
//   try {
//     if (typeof id === 'string') {
//       file = await getDownloadFile(id)
//     } else {
//       return {
//         notFound: true
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     file = {}
//   }

//   return {
//     props: {
//       file
//     }
//   }
// }