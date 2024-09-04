import React, { FunctionComponent } from 'react';
import { getDownloadFile } from '../../../../libs/getDownloadFile';
import { IFile } from '../../../../libs/types';
import RenderFile from '@/app/Components/RenderFile';
import DownloadButton from '@/app/Components/DownloadButton'; // Client Component

const DownloadPage: FunctionComponent<{ params: { id: string } }> = async ({ params }) => {
  const { id } = params;

  // Fetch the file data on the server side
  const data: IFile | undefined = await getDownloadFile(id);

  if (!data) {
    return <div>File Not Found</div>;
  }

  const { name } = data;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center h-80 w-96 border-2 bg-gray-800 rounded-md shadow-xl text-white">
        <img src="../images/file-download.png" alt="File download icon" className="w-16 h-16" />
        <h1 className="text-xl mt-5">Your file is ready to be downloaded</h1>
        <RenderFile file={data} />
        {/* Pass the necessary props instead of a function */}
        <DownloadButton id={id} fileName={name} />
      </div>
    </main>
  );
};

export default DownloadPage;



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