import React from 'react'
import { getData } from '../../../myXata';
import { ButeelchRecord, ButeelRecord, HolbooRecord } from '@/src/xata';
import Link from 'next/link';

export default async function UstgahHuselt() {

  const buteelchData = await getData('buteelch');
  const buteelData = await getData('buteel');
  const holbooData = await getData('holboo');

  return (
    <div className="myform grid grid-cols-3 gap-4 w-100 ">
      <div className='w-80 mx-auto'>
        <label className='label text-xl font-bold text-red-500'>Бүтээлчийн бүртгэлийн устгал</label>
        {buteelchData.filter((buteelch: ButeelchRecord) => buteelch.ustgahtailbar != null).map((buteelch: ButeelchRecord) => (
          <form key={buteelch.id} className='mt-1'>
            <Link href={'../pages/ustgahHuselt/' + buteelch.id}><div className="h-10 w-full btn white-button">{buteelch.ovog}-н {buteelch.ner}</div></Link>
          </form>
        ))}
      </div>

      <div className='w-80 mx-auto'>
        <label className='label text-xl font-bold text-red-500'>Бүтээлийн бүртгэлийн устгал</label>
        {buteelData.filter((buteel: ButeelRecord) => buteel.ustgahtailbar != null).map((buteel: ButeelchRecord) => (
          <form key={buteel.id}  className='mt-1 '>
            <Link href={'../pages/ustgahHuselt/' + buteel.id}><div className="h-10 w-full btn white-button">{buteel.ner}</div></Link>
          </form>
        ))}
      </div>

      <div className='w-80 mx-auto'>
        <label className='label text-xl font-bold text-red-500'>Холбоодын бүртгэлийн устгал</label>
        {holbooData.filter((holboo: HolbooRecord) => holboo.ustgahtailbar != null).map((holboo: HolbooRecord) => (
          <form key={holboo.id}  className='mt-1'>
            <Link href={'../pages/ustgahHuselt/' + holboo.id}><div className="h-10 w-full btn white-button">{holboo.ner}</div></Link>
          </form>
        ))}
      </div>
    </div>
  )
}


