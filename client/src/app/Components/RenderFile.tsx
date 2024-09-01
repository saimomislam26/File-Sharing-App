import React, { FunctionComponent } from 'react'
import { IFile } from '../../../libs/types'
import { sizeInMb } from '../../../libs/sizeInMb'

const RenderFile: FunctionComponent<{file: IFile }> = ({ file: { format, sizeInBytes, name } }) => {
    return (
        <div className='flex items-center justify-between w-full p-4 my-2'>
            <img src={`../images/${format}.png`} alt='' className='w-14 h-14' />
            <span className='mx-2'>{name}</span>
            <span className='ml-auto'>{sizeInMb(sizeInBytes)}</span>
        </div>
    )
}

export default RenderFile