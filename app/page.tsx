import React from 'react'
import LoginForm from '../app/components/loginForm'
import { getSession } from '@/src/actions'
import { redirect } from 'next/navigation'


const Login = async () => {

  const session = await getSession()

  if(session.isLoggedIn){
    redirect("/pages/profile")
}

  return (
    <div className=''>
      <LoginForm/>
    </div>
  )
}

export default Login
