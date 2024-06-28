import { getSingleValue } from '@/myXata'
import React from 'react'
import Link from 'next/link'
import {EditButton1} from '@/app/components/editButton'


const SingleArtwork = async ({ params }: any) => {
    'use server'
    const artwork = await getSingleValue(params.id, 'buteel');
    return (
        <div className='myform' >
            <Link href='/pages/buteelSan' className='btn  white-button w-20'>Буцах</Link>
            <EditButton1 artwork={artwork} /> 
        </div>
    );
};

export default SingleArtwork