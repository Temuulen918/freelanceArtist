import React from 'react';
import { getData } from '../../myXata';
import { DeleteButton2 } from './deleteButton';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import DownloadExcel from './downloadExcel';
import { HolbooRecord } from '@/src/xata';
import { SearchBar } from '../pages/buteelSan/search/searchBar';

export default async function HolbooTable() {

  const holbooData = await getData('holboo');

  const formatDate = (dateString: Date | null | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <div>
      <div className='flex justify-end gap-3 mb-4'>
        <Link href={'../pages/holbooSan/nemeh'}><button className="btn blue-button text-white">+ Холбоо</button></Link>
        <DownloadExcel myData={holbooData} fileName='buteelchSan' />
      </div>
      <SearchBar/>
        <br></br>
        <br></br>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Нэр</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>ТУЗ дарга</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Үйл ажиллагаа</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Хаяг</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Бүртгэлийн дугаар</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Үүсгэн байгуулагдсан</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Утас</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Цахим шуудан</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Цахим хаяг</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {holbooData.filter((holboo: HolbooRecord) => holboo.huselteseh === false).map((holboo: HolbooRecord) => (
            <tr key={holboo.id}>
              <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '8rem' }}>{holboo.ner}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '7rem' }}>{holboo.TUZdarga}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '8rem' }}>{holboo.uilajillagaa}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '8rem' }}>{holboo.hayg}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '6rem' }}>{holboo.burtgelDugaar}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '6rem' }}>{formatDate(holboo.uusgenbaiguulsan)}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '6rem' }}>{holboo.utas}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '2rem' }}>{holboo.tsahimshuudan}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '8rem' }}>{holboo.tsahimhayg}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '2rem' }}>
                <Link href={'../pages/holbooSan/' + holboo.id}><FontAwesomeIcon icon={faPenToSquare} size='2x' color='#9B9B9B' /></Link>
                <DeleteButton2 id={holboo.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}