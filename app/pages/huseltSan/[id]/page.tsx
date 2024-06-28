import { acceptArtistReq, acceptArtworkReq, acceptHolbooReq, deleteArtistReq, deleteArtworkReq, deleteHolbooReq, getSingleValue } from '@/myXata'
import React from 'react'
import Link from 'next/link'


const Accepting = async ({ params }: any) => {
    'use server'

    const buteel = await getSingleValue(params.id, 'buteel');

    if (buteel) {
        const { id, ner, tailbar, tuurvijduussan, link, zohiogchiinerh, urlagChiglel, urlagSalbar, buteelchid } = buteel;
        return (
            <div className='myform' >
                <Link href='/pages/huseltSan' className='btn  white-button w-20'>Буцах</Link>
                <form action={acceptArtworkReq}>
                    <div className='myform'>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border p-4 flex flex-col items-center">
                                <input type='hidden' name='id' value={id} />

                                <label>Уран бүтээлч</label>
                                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={buteelchid} readOnly></input>

                                <label>Урлагийн салбар</label>
                                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={urlagSalbar} readOnly></input>

                                <label>Урлагийн чиглэл</label>
                                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={urlagChiglel} readOnly></input>

                                <label>Бүтээлийн нэр</label>
                                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={ner} readOnly></input>

                                <label>Туурвиж дууссан</label>
                                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={tuurvijduussan} readOnly></input>
                            </div>
                            <div className="border p-4 flex flex-col items-center">
                                <label>Уран бүтээлчид</label>
                                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={buteelchid} readOnly></input>

                                <label>Файл</label>
                                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={''} readOnly></input>

                                <label>Тайлбар<span className="required">*</span></label>
                                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={tailbar} readOnly></input>

                                <label>Цахим холбоос</label>
                                <input type='url' className="input input-bordered w-full mytextarea" defaultValue={link} readOnly></input>

                                <label>Зохиогчийн эрхийн гэрчилгээ</label>
                                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={zohiogchiinerh} readOnly></input>

                                <div className='form-control'>
                                    <label htmlFor='completed'></label>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center w-full mt-5'>
                            <button type='submit' className='btn text-white blue-button w-32 mt-5'>Бүртгэл баталгаажуулах</button>
                        </div>
                    </div>
                </form >
                <div className='flex justify-center w-full mt-5'>
                    <form action={deleteArtworkReq}>
                        <input type='hidden' value={buteel.id} name='id'></input>
                        <button type='submit' className='btn white-button w-32'>Бүртгэл цуцлах</button>
                    </form>
                </div>
            </div>
        );
    }

    const buteelch = await getSingleValue(params.id, 'buteelch');

    if (buteelch) {
        const { id, ner, ovog, RD, tursunognoo, huis, urlagChiglel, urlagSalbar, dugaar, bolovsrol, turshlaga, nasbarsaneseh, nasbarsanognoo } = buteelch;
        return (
            <div className='myform'>
                <Link href='/pages/huseltSan' className='btn  white-button w-20'>Буцах</Link>
                <form action={acceptArtistReq} >
                    <div className='myform'>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border p-4 flex flex-col items-center">
                                <input type='hidden' name='id' value={id} />

                                <label>Нэр</label>
                                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={ner} readOnly></input>

                                <label>Овог</label>
                                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={ovog} readOnly></input>

                                <label>Регистерийн дугаар</label>
                                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={RD} readOnly></input>

                                <label>Төрсөн огноо</label>
                                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={tursunognoo} readOnly></input>

                                <label>Хүйс</label>
                                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={huis} readOnly></input>

                                <label>Урлагийн салбар</label>
                                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={urlagSalbar} readOnly></input>

                                <label>Урлагийн чиглэл</label>
                                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={urlagChiglel} readOnly></input>
                            </div>
                            <div className="border p-4 flex flex-col items-center">
                                <label>Утасны дугаар</label>
                                <input type='text' className="input input-bordered w-full mytextarea" required defaultValue={dugaar} readOnly></input>

                                <label>Боловсрол</label>
                                <textarea className="input input-bordered w-full mytextarea h-24 " defaultValue={bolovsrol} readOnly></textarea>

                                <label>Туршлага</label>
                                <textarea className="input input-bordered w-full mytextarea h-24" defaultValue={turshlaga} readOnly></textarea>

                                <label>Нас барсан эсэх</label>
                                <select defaultValue={nasbarsaneseh} className="select select-bordered mytextarea" disabled>
                                    <option>Үгүй</option>
                                    <option>Тийм</option>
                                </select>

                                <label>Нас барсан огноо</label>
                                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={nasbarsanognoo} name='nasbarsanognoo' readOnly></input>

                                <div className='form-control'>
                                    <label htmlFor='completed'></label>
                                </div>

                            </div>
                        </div>
                        <div className='flex justify-center w-full'>
                            <button type='submit' className='btn text-white blue-button mt-10 w-32'>Бүртгэл баталгаажуулах</button>
                        </div>
                    </div>
                </form >
                <div className='flex justify-center w-full'>
                    <form action={deleteArtistReq}>
                        <input type='hidden' value={buteelch.id} name='id'></input>
                        <button type='submit' className='btn white-button w-32 mt-5'>Бүртгэл цуцлах</button>
                    </form>
                </div>
            </div>
        )
    }


    const holboo = await getSingleValue(params.id, 'holboo');

    if (holboo) {
        const { id, ner, TUZdarga, uilajillagaa, hayg, burtgelDugaar, uusgenbaiguulsan, utas, tsahimshuudan, tsahimhayg } = holboo;
        return (
            <div className='myform' style={{ width: '30rem' }}>
                <Link href='/pages/huseltSan' className='btn  white-button w-20'>Буцах</Link>
                <form action={acceptHolbooReq} style={{ width: '10rem' }}>
                    <div className='myform'>
                        <input type='hidden' name='id' value={id} />

                        <label>Нэр</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={ner} readOnly></input>

                        <label>Үйл ажиллагаа</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={uilajillagaa} readOnly></input>

                        <label>Бүртгэлийн дугаар</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={burtgelDugaar} readOnly></input>

                        <label>Үүсгэн байгуулагдсан</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={uusgenbaiguulsan} readOnly></input>

                        <label>ТУЗ дарга<span className="required">*</span></label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={TUZdarga} readOnly></input>

                        <label>Утас<span className="required">*</span></label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={utas} readOnly></input>

                        <label>Цахим шуудан<span className="required">*</span></label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={tsahimshuudan} readOnly></input>

                        <label>Цахим хаяг</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={tsahimhayg} readOnly></input>

                        <label>Хаяг</label>
                        <textarea className="textarea textarea-bordered h-24 mytextarea" defaultValue={hayg} disabled></textarea>

                        <button type='submit' className='btn text-white blue-button mt-5 w-32'>Хадгалах</button>
                    </div>
                </form >
                <form action={deleteHolbooReq}>
                    <input type='hidden' value={holboo.id} name='id'></input>
                    <button type='submit' className='btn white-button w-32 mt-5'>Цуцлах</button>
                </form>
            </div>
        )
    }


};

export default Accepting