'use client'

import { signup } from '@/src/actions'
import Link from 'next/link'
import React from 'react'
import { useFormState } from 'react-dom'

const SignUpForm = () => {

    const [state, formAction] = useFormState<any, FormData>(signup, undefined)

    return (
        <div className="flex items-center justify-center h-screen ">
            <form action={signup} className='flex flex-col w-1/4 items-center border'>
                <h1 className='text-center mb-10'>Чөлөөт уран бүтээлч, бүтээлийн бүртгэлийн программ</h1>
                <label>Хаягийн төрөл</label>
                <select className="select select-bordered w-full max-w-xs" name='tableName'>
                    <option selected value='buteelch'>Уран бүтээлч</option>
                    <option value='holboo'>Уран бүтээлчдийн холбоо</option>
                </select>
                <input type='email' name='username' required placeholder='Нэвтрэх нэр' className="input input-bordered w-full mt-5"></input>
                <input type='password' name='password' required placeholder='Нууц үг' className="input input-bordered w-full mt-2"></input>
                <button className='btn blue-button text-white w-32 mt-5'>Бүртгүүлэх</button>
                {state?.error && <p>{state.error}</p>}
                <div className='items-center'>
                    <h1 >Бүртгэлтэй юу?</h1>
                    <Link href='/'><p className='text-blue-500 text-center'>Нэвтрэх</p></Link>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm