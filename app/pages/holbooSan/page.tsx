import React, { Suspense } from 'react'
import Link from "next/link";
import HolbooTable from '@/app/components/holbooTable';
import { getSession } from '@/src/actions';
import { redirect } from 'next/navigation';
import Loading from '@/app/loading';


export default async function HolbooSan() {

    const session = await getSession();

    if (!session.isLoggedIn) {
        redirect("/")
    }

    if (session.type !== "ajiltan" && session.type !== "admin") {
        redirect("/pages/profile")
    }

    return (
        <Suspense fallback={<Loading />}>
            <div className="myform">
                <h1 className="text-2xl mx-3 my-3">Уран бүтээлчдийн холбооны бүртгэлийн сан</h1>
                
                <HolbooTable />
            </div>
        </Suspense>
    )
}