import React, { FunctionComponent } from 'react'

const DownloadFile: FunctionComponent<{ downloadPageLink: string }> = ({ downloadPageLink }) => {
    return (
        <div className='p-1'>
            <h1 className='my-2 text-lg font-medium'>You can also share via email</h1>
            <div>
                <span className='break-all'>{downloadPageLink}</span>
                <img src="../images/copy.png"
                    className='w-8 h-8 object-contain cursor-pointer'
                    onClick={() => navigator.clipboard.writeText(downloadPageLink)}
                />
            </div>
        </div>
    )
}

export default DownloadFile