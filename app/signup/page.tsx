import React from 'react'
import { getSession } from '@/src/actions'
import { redirect } from 'next/navigation'
import SignUpForm from '../components/signUpForm'

const SignUp = async () => {

    const session = await getSession()

    if (session.isLoggedIn) {
        redirect("/pages/profile")
    }

    return (
        <div className='flex flex-col'>
            <SignUpForm/>
        </div>
    )
}

export default SignUp
