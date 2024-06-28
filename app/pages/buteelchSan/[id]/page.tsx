import { getSingleValue } from '@/myXata'
import React from 'react'
import Link from 'next/link'
import {EditButton} from '@/app/components/editButton'


const SingleArtist = async ({ params }: any) => {
    'use server'
    const artist = await getSingleValue(params.id, 'buteelch');
    return (
        <div className='myform' style={{width: '30rem' }}>
            <Link href='/pages/buteelchSan' className='btn white-button w-20'>Буцах</Link>
            <EditButton artist={artist} /> 
        </div>
    );
};

export default SingleArtist