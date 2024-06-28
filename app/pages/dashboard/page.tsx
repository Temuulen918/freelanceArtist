'use server'

import { DoughnutChart, MultiChart, PieChart, PolarChart, BarChart } from '@/app/components/myCharts'
import { StatsChart } from '@/app/components/statsChart'
import { countBchHuis, countBchMonth, countBMonth, countNas, countUrlagSalbar, countBchYear, countBYear, countHYear } from '@/myXata';
import React from 'react';

const page = async () => {

  const countBch = await countBchMonth();
  const countB = await countBMonth();
  const countBchY = await countBchYear();
  const countBY = await countBYear();
  const countHY = await countHYear();

  /////////////for bar chart
  let labels = ['1-р сар', '2-р сар', '3-р сар', '4-р сар', '5-р сар', '6-р сар', '7-р сар',
    '8-р сар', '9-р сар', '10-р сар', '11-р сар', '12-р сар'];


  const data = {
    labels,
    datasets: [
      {
        label: 'Уран бүтээлч',
        data: labels.map((label, index) => countBch[index]),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Уран бүтээл',
        data: labels.map((label, index) => countB[index]),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  ////////////for pie chart

  const huis = await countBchHuis();

  const data1 = {
    labels: ['Эм', 'Эр'],
    datasets: [
      {
        label: '# of Votes',
        data: [huis.em, huis.er],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  ///////////for urlagSalbar
  const salbar = await countUrlagSalbar();

  const mylabels = [];
  const mycounts = [];
  for (const [urlagSalbar, count] of salbar.top5Salbars) {
    mylabels.push(urlagSalbar);
    mycounts.push(count);
  }

  const data2 = {
    labels: [mylabels[0], mylabels[1], mylabels[2], mylabels[3], mylabels[4], "Бусад урлагийн салбар"],
    datasets: [
      {
        label: '# of Votes',
        data: [mycounts[0], mycounts[1], mycounts[2], mycounts[3], mycounts[4], salbar.restCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  //////////// for nas

  const nas = await countNas();

  const data3 = {
    labels: ["5-18", "19-25", "25-40", "40+"],
    datasets: [
      {
        label: '# of Votes',
        data: [nas['5-18'], nas['19-25'], nas['26-40'], nas['40+']],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  //////////// for multi

  labels = ['2020', '2021', '2022', '2023', '2024'];

  const data4 = {
    labels,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Уран бүтээлч',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        data: labels.map((label, index) => countBchY[index]),
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar' as const,
        label: 'Уран бүтээл',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        data: labels.map((label, index) => countBY[index]),
      },
      {
        type: 'line' as const,
        label: 'Холбоо',
        borderColor: 'rgb(110, 137, 216)',
        borderWidth: 2,
        fill: false,
        data: labels.map((label, index) => countHY[index]),
      },
    ],
  };


  ///

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '2024 оны үзүүлэлт',
      },
    },
  };

  return (
    <div className='myform'>
      <StatsChart />

      <div className="grid grid-cols-3 gap-4 mt-10 border">
        <div className="flex flex-col items-center">
          <label>Уран бүтээлчдийн хүйсээр</label>
          <DoughnutChart data={data1} />
        </div>

        <div className="flex flex-col items-center">
          <label>Уран бүтээлчдийн насаар</label>
          <PolarChart data={data3} />
        </div>

        <div className="flex flex-col items-center">
          <label>Уран бүтээл урлагийн салбараар</label>
          <PieChart data={data2} />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mt-10">
          <label className='text-xl'>2024 оны үзүүлэлт</label>
          <BarChart options={options} data={data} />
        </div>
        <div className="flex flex-col items-center mt-10">
          <label className='text-xl'>Сүүлийн 5 жилд шинээр бүртгэгдсэн</label>
          <MultiChart data={data4} />
        </div>
      </div>
    </div>
  )
}

export default page