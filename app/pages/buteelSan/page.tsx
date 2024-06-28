import React, { Suspense } from 'react'
import { getData } from '../../../myXata';
import Link from 'next/link';
import ButeelTable from '@/app/components/buteelTable';
import { getSession } from '@/src/actions';
import { redirect } from 'next/navigation';
import Loading from '@/app/loading';

export default async function ButeelSan() {
    const session = await getSession();

    if (!session.isLoggedIn) {
        redirect("/")
    }

    return (
        <Suspense fallback={<Loading />}>
            <div className="myform ">
                <h1 className="text-2xl mx-3 my-3">Чөлөөт уран бүтээлийн бүртгэлийн сан</h1>
                
                <ButeelTable />
            </div>
        </Suspense>
    )
}