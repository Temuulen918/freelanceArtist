import AjiltanTable from '@/app/components/ajiltanTable';
import React from 'react'
import Link from "next/link";
import { getSession } from '@/src/actions';
import { redirect } from 'next/navigation';


export default async function ButeelSan() {

    const session = await getSession();

    if(!session.isLoggedIn){
        redirect("/")
    }

    if(session.type !== "ajiltan" && session.type !== "admin"){
        redirect("/pages/profile")
    }

    return (
        <div className="myform">
            <h1 className="text-2xl mx-3 my-3">Бүртгэлийн ажилтны бүртгэлийн сан</h1>
            <AjiltanTable/>
        </div>
    )
}
