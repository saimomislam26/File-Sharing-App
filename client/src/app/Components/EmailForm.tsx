'use client'
import React, { FunctionComponent, MouseEventHandler, useState } from 'react'
import { sendMail } from '../../../libs/getDownloadFile'

const EmailForm: FunctionComponent<{ id: string }> = ({ id }) => {

    interface Email {
        emailFrom: string,
        emailTo: string
    }

    const [email, setEmail] = useState<Email>({
        emailFrom: "",
        emailTo: ""
    })
    const [message,setMessage] = useState<string | null>(null)

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setEmail(prevEmail => ({
            ...prevEmail,
            [name]: value
        }));
    };

    const handleSendMail: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()
        const data = await sendMail(id, email.emailFrom, email.emailTo)
        setMessage(data.message)
    }

    return (
        <div className='flex flex-col items-center justify-center w-full p-2 space-y-3'>
            <h3>You can also send the file through mail</h3>
            <form className='flex flex-col items-center justify-center w-full p-2 space-y-3'>
                <input className='p-1 text-white border-2 bg-gray-800 rounded-md focus:outline-none'
                    type="text"
                    required
                    name='emailFrom'
                    value={email.emailFrom}
                    placeholder='Email From'
                    onChange={(e) => handleInput(e)}
                />
                <input className='p-1 text-white border-2 bg-gray-800 rounded-md focus:outline-none'
                    type="text"
                    required
                    name='emailTo'
                    value={email.emailTo}
                    placeholder='Email To'
                    onChange={(e) => handleInput(e)}
                />
                <button className="p-2 my-5 bg-gray-900 rounded-md w-44 focus:outline-none" type='submit' onClick={(e)=>handleSendMail(e)}>Send Email</button>
            </form>
            {message && <p className='text-red-500 font-medium'>{message}</p>}
        </div>
    )
}

export default EmailForm