import { getSingleValue } from '@/myXata'
import React from 'react'
import Link from 'next/link'
import {EditButton3} from '@/app/components/editButton'

const SingleAjiltan = async ({ params }: any) => {
    'use server'
    const ajiltan = await getSingleValue(params.id, 'ajiltan');
    return (
        <div className='myform' style={{width: '30rem' }}>
            <Link href='/pages/ajiltanSan' className='btn white-button w-20'>Буцах</Link>
            <EditButton3 ajiltan={ajiltan} /> 
        </div>
    );
};

export default SingleAjiltan