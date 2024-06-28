import React, { Suspense } from 'react'
import Link from "next/link";
import ButeelchTable from '@/app/components/buteelchTable';
import { getSession } from '@/src/actions';
import { redirect } from 'next/navigation';
import Loading from '../../loading';


export default async function ButeelchSan() {

    const session = await getSession();

    if(!session.isLoggedIn){
        redirect("/")
    }

    if(session.type === "buteelch"){
        redirect("/pages/profile")
    }

    return (
        <Suspense fallback={<Loading />}>
        <div className="myform">
            <h1 className="text-2xl mx-3 my-3">Чөлөөт уран бүтээлчийн бүртгэлийн сан</h1>
            <ButeelchTable/>
        </div>
        </Suspense>
    )
}