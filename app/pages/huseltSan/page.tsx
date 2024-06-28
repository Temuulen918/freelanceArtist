import React from 'react'
import { getData } from '../../../myXata';
import { ButeelchRecord, ButeelRecord, HolbooRecord } from '@/src/xata';
import Link from 'next/link';

export default async function HuseltSan() {

  const buteelchData = await getData('buteelch');
  const buteelData = await getData('buteel');
  const holbooData = await getData('holboo');

  return (
    <div className="myform grid grid-cols-3 gap-4 w-100 "> {/* Apply grid with 3 columns and gap */}
      <div className='w-80 mx-auto'>
        <label className='label text-xl font-bold text-blue-400'>Бүтээлчийн бүртгэлийн хүсэлт</label>
        {buteelchData.filter((buteelch: ButeelchRecord) => buteelch.huselteseh === true).map((buteelch: ButeelchRecord) => (
          <form key={buteelch.id} className='mt-1'>
            <Link href={'../pages/huseltSan/' + buteelch.id}><div className="h-10 w-full btn white-button">{buteelch.ovog}-н {buteelch.ner}</div></Link>
          </form>
        ))}
      </div>

      <div className='w-80 mx-auto'>
        <label className='label text-xl font-bold text-blue-400'>Бүтээлийн бүртгэлийн хүсэлт</label>
        {buteelData.filter((buteel: ButeelRecord) => buteel.huselteseh === true).map((buteel: ButeelchRecord) => (
          <form key={buteel.id}  className='mt-1 '>
            <Link href={'../pages/huseltSan/' + buteel.id}><div className="h-10 w-full btn white-button">{buteel.ner}</div></Link>
          </form>
        ))}
      </div>

      <div className='w-80 mx-auto'>
        <label className='label text-xl font-bold text-blue-400'>Холбоодын бүртгэлийн хүсэлт</label>
        {holbooData.filter((holboo: HolbooRecord) => holboo.huselteseh === true).map((holboo: HolbooRecord) => (
          <form key={holboo.id}  className='mt-1'>
            <Link href={'../pages/huseltSan/' + holboo.id}><div className="h-10 w-full btn white-button">{holboo.ner}</div></Link>
          </form>
        ))}
      </div>
    </div>

  )
}


