import React, { FunctionComponent } from 'react'

const DownloadFile: FunctionComponent<{ downloadPageLink: string }> = ({ downloadPageLink }) => {
    return (
        <div className='p-1'>
            <h1 className='my-2 text-lg font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima esse quam dignissimos, vitae illum impedit maiores? Autem eum, consequuntur in aspernatur sequi sit, labore ipsa debitis, atque veritatis aliquid voluptatem.</h1>
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