'use client'

import { login } from '@/src/actions'
import React from 'react'
import { useFormState } from 'react-dom'
import Link from 'next/link'

const LoginForm = () => {

    const [state, formAction] = useFormState<any, FormData>(login, undefined)

    return (
        <div className="flex items-center justify-center h-screen">
            <form action={formAction} className='flex flex-col w-1/4 items-center border'>
                <h1 className='text-center mb-10'>Чөлөөт уран бүтээлч, бүтээлийн бүртгэлийн программ</h1>
                <input type='email' name='username' required placeholder='Нэвтрэх нэр' className="input input-bordered w-full "></input>
                <input type='password' name='password' required placeholder='Нууц үг' className="input input-bordered w-full mt-3"></input>
                <button className='btn blue-button text-white w-32 mt-5'>Нэвтрэх</button>
                {state?.error && <p>{state.error}</p>}
                <div className='mt-5'>
                    <h1>Бүртгэлгүй юу?</h1>
                    <Link href={'/signup'}><p className='text-blue-500 text-center'>Бүртгүүлэх</p></Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm