'use client'

import React from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, BarElement, CategoryScale, LinearScale, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Chart, Doughnut, Pie, PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export function DoughnutChart({ data }: any) {
    return (
        <div style={{ height: '250px', display: "inline-box" }}>
            <Doughnut data={data} />
        </div>
    )
}

export function PieChart({ data }: any) {
    return (
        <div style={{ height: '325px', display: "inline-box" }} >
            <Pie data={data} />
        </div>
    )
}

export function PolarChart({ data }: any) {
    return (
        <div style={{ height: '325px', display: "inline-box" }}>
            <PolarArea data={data} />
        </div>
    )
}

export function BarChart({ data }: any, { options }: any) {

    return (
        <div style={{ height: '450px', width: "900px", display: "inline-box" }} className='border'>
            <Bar options={options} data={data} />
        </div>
    )
}

export function MultiChart({ data }: any) {
    return (
        <div style={{ height: '450px', width:'900px', display: "inline-box" }}  className='border'>
            <Chart type='bar' data={data} />
        </div>
    )
}

