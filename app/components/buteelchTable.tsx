import React from 'react';
import { findAccount, getData } from '../../myXata';
import { DeleteButton } from './deleteButton'; './deleteButton';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import DownloadExcel from './downloadExcel';
import { ButeelchRecord } from '@/src/xata';
import { getSession } from '@/src/actions';
import { DeleteReason } from './deleteReason';
import { SearchBar } from '../pages/buteelSan/search/searchBar';


export default async function ButeelchTable() {

  const buteelchData = await getData('buteelch');
  const session = await getSession();

  const formatDate = (dateString: Date | null | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const Head = () => {
    return (
      <thead>
        <tr>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Регистерийн дугаар</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Нэр</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Овог</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Төрсөн огноо</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Хүйс</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Утасны дугаар</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Урлагийн салбар</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Урлагийн чиглэл</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Боловсрол</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Ажлын туршлага</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Нас барсан эсэх</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Нас барсан огноо</th>
          <th style={{ padding: '8px', border: '1px solid #ddd' }}>Үйлдэл</th>
        </tr>
      </thead>
    )
  }


  if (session.type === 'holboo') {
    const idholboo = await findAccount(session.username) as string;

    return (
      <div>
        <div className='flex justify-end gap-3 mb-4'>
          <Link href={'../pages/buteelchSan/nemeh'}><button className="btn blue-button text-white">+ Бүтээлч</button></Link>
          <DownloadExcel myData={buteelchData} fileName='buteelchSan' />
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <Head />
          <tbody>

            {buteelchData.filter((buteelch: ButeelchRecord) =>
              buteelch.huselteseh === false && buteelch.holboo === idholboo)
              .map((buteelch: ButeelchRecord) => (

                <tr key={buteelch.id}>
                  <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '8rem' }}>{buteelch.RD}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '8rem' }}>{buteelch.ner}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '8rem' }}>{buteelch.ovog}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '5rem' }}>{formatDate(buteelch.tursunognoo)}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '2rem' }}>{buteelch.huis}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '3rem' }}>{buteelch.dugaar}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '3rem' }}>{buteelch.urlagSalbar}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '3rem' }}>{buteelch.urlagChiglel}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '7rem' }}>{buteelch.bolovsrol}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '7rem' }}>{buteelch.turshlaga}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '2rem' }}>{buteelch.nasbarsaneseh ? 'Тийм' : 'Үгүй'}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '5rem' }}>{formatDate(buteelch.nasbarsanognoo)}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '2rem' }}>
                    <Link href={'../pages/buteelchSan/' + buteelch.id}><FontAwesomeIcon icon={faPenToSquare} size='2x' color='#9B9B9B' /></Link>
                    <DeleteReason idbuteelch={buteelch.id} rd={buteelch.RD} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div >
        <div className='flex justify-end gap-3 mb-4'>
          <Link href={'../pages/buteelchSan/nemeh'}><button className="btn blue-button text-white">+ Бүтээлч</button></Link>
          <DownloadExcel myData={buteelchData} fileName='buteelchSan' />
        </div>
        
        <SearchBar/>
        <br></br>
        <br></br>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <Head />
          <tbody>

            {buteelchData.filter((buteelch: ButeelchRecord) =>
              buteelch.huselteseh === false)
              .map((buteelch: ButeelchRecord) => (

                <tr key={buteelch.id}>
                  <td className="px-2 py-1 border border-gray-300 text-wrap w-8">{buteelch.RD}</td>
                  <td className="px-2 py-1 border border-gray-300 text-wrap w-8">{buteelch.ner}</td>
                  <td className="px-2 py-1 border border-gray-300 text-wrap w-5">{buteelch.ovog}</td>
                  <td className="px-2 py-1 border border-gray-300 text-wrap w-5">{formatDate(buteelch.tursunognoo)}</td>
                  <td className="px-2 py-1 border border-gray-300 text-wrap w-2">{buteelch.huis}</td>
                  <td className="px-2 py-1 border border-gray-300 text-wrap w-3">{buteelch.dugaar}</td>
                  <td className="px-2 py-1 border border-gray-300 text-wrap w-3">{buteelch.urlagSalbar}</td>
                  <td className="px-2 py-1 border border-gray-300 text-wrap w-3">{buteelch.urlagChiglel}</td>
                  <td className="px-2 py-1 border border-gray-300 text-wrap w-7">{buteelch.bolovsrol}</td>
                  <td className="px-2 py-1 border border-gray-300 text-wrap w-8">{buteelch.turshlaga}</td>
                  <td className="px-2 py-1 border border-gray-300 text-wrap w-2">{buteelch.nasbarsaneseh ? 'Тийм' : 'Үгүй'}</td>
                  <td className="px-2 py-1 border border-gray-300 text-wrap w-5">{formatDate(buteelch.nasbarsanognoo)}</td>
                  <td className="px-2 py-1 border border-gray-300 text-wrap w-1">
                    <Link href={'../pages/buteelchSan/' + buteelch.id}><FontAwesomeIcon icon={faPenToSquare} size='2x' color='#9B9B9B' /></Link>
                    <DeleteButton id={buteelch.id} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}