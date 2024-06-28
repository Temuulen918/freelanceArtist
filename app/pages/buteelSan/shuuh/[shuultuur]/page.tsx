import { searchbuteel } from '@/myXata'
import React from 'react';
import { findAccount, getData } from '../../../../../myXata';
import { DeleteButton1 } from '../../../../components/deleteButton';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ButeelRecord } from '@/src/xata';
import { getSession } from '@/src/actions';
import { getXataClient } from '@/src/xata';
import Filter from '../filter';


const Filtering = async ({ params }: any) => {
    'use server'

    const salbar = decodeURIComponent(params.shuultuur);
    console.log("salbar ni" + salbar);

    const xata = await getXataClient()
    const session = await getSession();

    const buteelData = await getData('buteel');

    const formatDate = (dateString: Date | null | undefined) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    };

    const Head = () => {
        return (
            <thead>
                <tr>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Уран бүтээлч</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Урлагийн салбар</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Урлагийн чиглэл</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Бүтээлийн нэр</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Тайлбар</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Туурвиж дууссан огноо</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Зохиогчийн эрхийн гэрчилгээ</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Цахим холбоос</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Файл</th>
                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Үйлдэл</th>
                </tr>
            </thead>
        )
    }

    if (session.type === 'buteelch') {
        const id = await findAccount(session.username) as string;
        const buteelch = await xata.db.buteelch.read(id);
        const RD = buteelch?.RD as string;

        return (
            <div>
                <div className='flex justify-end gap-3 mb-4'>
                    <Link href={'../pages/buteelSan/nemeh'}><button className="btn blue-button text-white">+ Бүтээл</button></Link>
                </div>
                <input placeholder='Хайх' className="input input-bordered w-50" ></input>

                <Filter />

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <Head />
                    <tbody>
                        {buteelData.filter((buteel: ButeelRecord) =>
                            buteel.huselteseh === false &&
                            buteel.buteelchid?.includes(RD) &&
                            buteel.urlagSalbar === salbar).map((buteel: ButeelRecord) => (

                                <tr key={buteel.id}>
                                    <td className="px-2 py-1 border border-gray-300 text-wrap w-7">{buteel.buteelchid}</td>
                                    <td className="px-2 py-1 border border-gray-300 text-wrap w-8">{buteel.urlagSalbar}</td>
                                    <td className="px-2 py-1 border border-gray-300 text-wrap w-8">{buteel.urlagChiglel}</td>
                                    <td className="px-2 py-1 border border-gray-300 text-wrap w-8">{buteel.ner}</td>
                                    <td className="px-2 py-1 border border-gray-300 text-wrap w-2">{buteel.tailbar}</td>
                                    <td className="px-2 py-1 border border-gray-300 text-wrap w-7">{formatDate(buteel.tuurvijduussan)}</td>
                                    <td className="px-2 py-1 border border-gray-300 text-wrap w-3">{buteel.zohiogchiinerh}</td>
                                    <td className="px-2 py-1 border border-gray-300 text-wrap w-3">{buteel.link}</td>
                                    <td className="px-2 py-1 border border-gray-300 text-wrap w-7">
                                        <div>files</div>
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '2rem' }}>
                                        <Link href={'../pages/buteelSan/' + buteel.id}><FontAwesomeIcon icon={faPenToSquare} size='2x' color='#9B9B9B' /></Link>
                                        <DeleteButton1 id={buteel.id} tableName='buteel' />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        if (session.type === 'holboo') {
            const id = await findAccount(session.username) as string;
            const buteelchid = await xata.db.buteelch.select(["RD", "holboo"]).getAll();

            return (
                <div>
                    <div className='flex justify-end gap-3 mb-4'>
                        <Link href={'../pages/buteelSan/nemeh'}><button className="btn blue-button text-white">+ Бүтээл</button></Link>
                    </div>
                    <input placeholder='Хайх' className="input input-bordered w-50 mb-3" ></input>

                    <Filter />

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <Head />
                        <tbody>
                            {buteelData.filter((buteel: ButeelRecord) =>
                                buteel.huselteseh === false && buteelchid.some(record => record.holboo === id)
                            ).map((buteel: ButeelRecord) => (

                                <tr key={buteel.id}>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '8rem' }}>{buteel.buteelchid?.join(', ')}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '8rem' }}>{buteel.urlagSalbar}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '8rem' }}>{buteel.urlagChiglel}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '8rem' }}>{buteel.ner}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '2rem' }}>{buteel.tailbar}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '6rem' }}>{formatDate(buteel.tuurvijduussan)}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '3rem' }}>{buteel.zohiogchiinerh}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '3rem' }}>{buteel.link}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '7rem' }}>
                                        <div>files</div>
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '2rem' }}>
                                        <Link href={'../pages/buteelSan/' + buteel.id}><FontAwesomeIcon icon={faPenToSquare} size='2x' color='#9B9B9B' /></Link>
                                        <DeleteButton1 id={buteel.id} tableName='buteel' />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div className='myform'>
                    <div className='flex justify-end gap-3 mb-4'>
                        <Link href={'../pages/buteelSan/nemeh'}><button className="btn blue-button text-white">+ Бүтээл</button></Link>
                    </div>

                    <Filter />

                    <div >
                        <label>
                            "{salbar}" салбараар шүүсэн
                        </label>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <Head />
                        <tbody>
                            {buteelData.filter((buteel: ButeelRecord) =>
                                buteel.huselteseh === false &&
                                buteel.urlagSalbar === salbar
                            ).map((buteel: ButeelRecord) => (

                                <tr key={buteel.id}>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '2rem' }}>{buteel.buteelchid?.join(', ')}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '6rem' }}>{buteel.urlagSalbar}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '6rem' }}>{buteel.urlagChiglel}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '5rem' }}>{buteel.ner}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '2rem' }}>{buteel.tailbar}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '5rem' }}>{formatDate(buteel.tuurvijduussan)}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '2rem' }}>{buteel.zohiogchiinerh}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '3rem' }}>{buteel.link}</td>
                                    <td style={{ padding: '8px', border: '1px solid #ddd', wordWrap: 'break-word', width: '2rem' }}>
                                        <div>files</div>
                                    </td>
                                    <td style={{ padding: '1px', border: '1px solid #ddd', wordWrap: 'break-word', width: '1rem' }}>
                                        <Link href={'../pages/buteelSan/' + buteel.id}><FontAwesomeIcon icon={faPenToSquare} size='2x' color='#9B9B9B' /></Link>
                                        <DeleteButton1 id={buteel.id} tableName='buteel' />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

};

export default Filtering