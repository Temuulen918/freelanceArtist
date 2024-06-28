'use server'

import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData, defaultSession } from './lib'
import { cookies } from 'next/headers'
import { getXataClient } from './xata'
import { redirect } from 'next/navigation'
import { getData } from '@/myXata'
import { revalidatePath } from 'next/cache'


const xata = getXataClient()

export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions)

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }
    return session
}


export const login = async (
    prevState: { error: undefined | string },
    formData: FormData) => {

    const session = await getSession()

    const formUsername = formData.get('username') as string
    const formPassword = formData.get('password') as string

    const userName = await xata.search.all(formUsername, {
        tables: [
            {
                table: "account",
            },
        ],
        fuzziness: 0,
    })
    

    if (userName.records[0].record.username !== formUsername) {
        return { error: "Нэвтрэх нэр буруу байна" }
    }

    if (userName.records[0].record.password !== formPassword) {
        return { error: "Нууц үг буруу байна" }
    }

    session.username = formUsername;
    session.password = formPassword;
    session.type = userName.records[0].record.turul as string;
    session.isLoggedIn = true

    await session.save()
    redirect("/pages/profile")
    
}


export const signup = async (formData: FormData) => {

    const accounts = await getData("account");
    const davhardsan = accounts.some((account: any)=> account.username === formData?.get('username'));
  
    if(!davhardsan){
      await xata.db.account.create({
        username: formData.get('username'),
        password: formData.get('password'),
        turhayg: true,
        turul: formData.get("tableName"),
      });
    }
    
    revalidatePath('/')
  }

export const logout = async () => {
    const session = await getSession()
    session.destroy()
    redirect("/")
}


export const changePassword = async (formData: FormData) => {
    
    const session = await getSession()
   
    const username = formData.get('username') as string;

    const xataRecord = await xata.search.all(username, {
        tables: [
            {
                table: "account",
            },
        ],
        fuzziness: 0,
    })

    const password = formData.get('password') as string;
    const id = xataRecord.records[0].record.id;

    console.log(password)
    await xata.db.account.update(id, {
        password: password,
    })
}

