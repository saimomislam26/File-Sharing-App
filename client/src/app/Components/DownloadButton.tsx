"use client"; 

import React, { FunctionComponent } from 'react';
import fileDownload from 'js-file-download';
import { getDownloaded } from '../../../libs/getDownloadFile';


interface DownloadButtonProps {
  id: string;
  fileName: string; 
}

const DownloadButton: FunctionComponent<DownloadButtonProps> = ({ id, fileName }) => {
  const handleDownload = async () => {
    try {
      const response = await getDownloaded(id); // Fetch data
      fileDownload(response, fileName); // Download the file
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };

  return (
    <div>
      <button
        className="p-2 my-5 bg-gray-900 rounded-md w-44 focus:outline-none text-white"
        onClick={handleDownload}
      >
        Download
      </button>
    </div>
  );
};

export default DownloadButton;
