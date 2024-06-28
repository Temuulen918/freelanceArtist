import React from 'react'
import { CountButeel, CountButeelch, CountButeelchAmid, CountHolboo } from '@/myXata'

export const StatsChart = () => {

    return (
        <div className='flex justify-center '>
            <div className="stats shadow" style={{ overflow: 'hidden', height: '125px', width: "80%" }}>

                <div className="stat place-items-center">
                    <div className="stat-title">Идэвхтэй уран бүтээлч</div>
                    <div className="stat-value text-blue-500"><CountButeelchAmid /></div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Нийт уран бүтээлч</div>
                    <div className="stat-value text-blue-500"><CountButeelch /></div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Нийт уран бүтээл</div>
                    <div className="stat-value text-blue-500"><CountButeel /></div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Нийт холбоод</div>
                    <div className="stat-value text-blue-500"><CountHolboo /></div>
                </div>
            </div>
        </div>
    )
}
