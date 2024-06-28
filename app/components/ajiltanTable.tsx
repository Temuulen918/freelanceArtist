import React from 'react';
import { getData } from '../../myXata';
import { DeleteButton3 } from './deleteButton';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import DownloadExcel from './downloadExcel';
import { AjiltanRecord } from '@/src/xata';
import { SearchBar } from '../pages/buteelSan/search/searchBar';

export default async function AjiltanTable() {

  const ajiltanData = await getData('ajiltan');

  const formatDate = (dateString: Date | null | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <div>
      <div className='flex justify-end gap-3 mb-4'>
        <Link href={'../pages/ajiltanSan/nemeh'}><button className="btn blue-button text-white">+ Ажилтан</button></Link>
        <DownloadExcel myData={ajiltanData} fileName='buteelchSan' />
      </div>
      <SearchBar/>
        <br></br>
        <br></br>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Регистерийн дугаар</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Нэр</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Овог</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Төрсөн огноо</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Хүйс</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Утасны дугаар</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {ajiltanData.map((ajiltan: AjiltanRecord) => (
            <tr key={ajiltan.id}>
              <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '8rem' }}>{ajiltan.RD}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '8rem' }}>{ajiltan.ner}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '8rem' }}>{ajiltan.ovog}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '7rem' }}>{formatDate(ajiltan.tursunognoo)}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '2rem' }}>{ajiltan.huis}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '3rem' }}>{ajiltan.utas}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '2rem' }}>
                <Link href={'../pages/ajiltanSan/' + ajiltan.id}><FontAwesomeIcon icon={faPenToSquare} size='2x' color='#9B9B9B' /></Link>
                <DeleteButton3 id={ajiltan.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}