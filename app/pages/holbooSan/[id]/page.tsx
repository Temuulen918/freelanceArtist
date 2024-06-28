import { getSingleValue } from '@/myXata'
import React from 'react'
import Link from 'next/link'
import {EditButton2} from '@/app/components/editButton'

const SingleHolboo = async ({ params }: any) => {
    'use server'
    const holboo = await getSingleValue(params.id, 'holboo');
    return (
        <div className='myform' style={{width: '30rem' }}>
            <Link href='/pages/holbooSan' className='btn white-button w-20'>Буцах</Link>
            <EditButton2 holboo={holboo} /> 
        </div>
    );
};

export default SingleHolboo