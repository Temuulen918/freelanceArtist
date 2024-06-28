import { acceptArtistReq, acceptArtworkReq, acceptDelete, acceptHolbooReq, cancelDelete, deleteArtistReq, deleteArtworkReq, deleteHolbooReq, getSingleValue } from '@/myXata'
import React from 'react'
import Link from 'next/link'


const Accepting = async ({ params }: any) => {
    'use server'

    const buteel = await getSingleValue(params.id, 'buteel');

    if (buteel) {
        const { id, ner, tailbar, tuurvijduussan, link, zohiogchiinerh, urlagChiglel, urlagSalbar, buteelchid, ustgahtailbar } = buteel;
        return (
            <div className='myform' style={{ width: '30rem' }}>
                <Link href='/pages/ustgahHuselt' className='btn  white-button w-20'>Буцах</Link>
                <form style={{ width: '10rem' }} action={acceptDelete}>
                    <div className='myform'>
                        <input type='hidden' name='id' value={id} />
                        <input type='hidden' name='type' value="buteel"></input>

                        <label className='mt-2'>Уран бүтээлч</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={buteelchid} readOnly></input>

                        <label className='mt-2'>Урлагийн салбар</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={urlagSalbar} readOnly></input>

                        <label className='mt-2'>Урлагийн чиглэл</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={urlagChiglel} readOnly></input>

                        <label className='mt-2'>Бүтээлийн нэр</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={ner} readOnly></input>

                        <label className='mt-2'>Туурвиж дууссан</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={tuurvijduussan} readOnly></input>

                        <label className='mt-2'>Уран бүтээлчид</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={buteelchid} readOnly></input>

                        <label className='mt-2'>Файл</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={''} readOnly></input>

                        <label className='mt-2'>Тайлбар<span className="required">*</span></label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={tailbar} readOnly></input>

                        <label className='mt-2'>Цахим холбоос</label>
                        <input type='url' className="input input-bordered w-full mytextarea" defaultValue={link} readOnly></input>

                        <label className='mt-2'>Зохиогчийн эрхийн гэрчилгээ</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={zohiogchiinerh} readOnly></input>

                        <label className='mt-2'>Устгаж буй шалтгаан</label>
                        <textarea className="textarea textarea-bordered h-24 mytextarea" readOnly value={buteel.ustgahtailbar}></textarea>

                        <button type='submit' className='btn text-white blue-button mt-5 w-32'>Устгал баталгаажуулах</button>
                    </div>
                </form >

                <form action={cancelDelete}>
                    <input type='hidden' value={buteel.id} name='id'></input>
                    <input type='hidden' name='type' value="buteel"></input>
                    <button type='submit' className='btn white-button w-32 mt-5'>Устгал цуцлах</button>
                </form>
            </div>
        );
    }

    const buteelch = await getSingleValue(params.id, 'buteelch');

    if (buteelch) {
        const { id, ner, ovog, RD, tursunognoo, huis, urlagChiglel, urlagSalbar, dugaar, bolovsrol, turshlaga, nasbarsaneseh, nasbarsanognoo, ustgahtailbar } = buteelch;
        return (
            <div className='myform' style={{ width: '30rem' }}>
                <Link href='/pages/ustgahHuselt' className='btn  white-button w-20'>Буцах</Link>
                <form action={acceptDelete} style={{ width: '10rem' }}>
                    <div className='myform'>
                        <input type='hidden' name='id' value={id} />
                        <input type='hidden' name='type' value="buteelch"></input>

                        <label className='mt-2'>Нэр</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={ner} readOnly></input>

                        <label className='mt-2'>Овог</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={ovog} readOnly></input>

                        <label className='mt-2'>Регистерийн дугаар</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={RD} readOnly></input>

                        <label className='mt-2'>Төрсөн огноо</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={tursunognoo} readOnly></input>

                        <label className='mt-2'>Хүйс</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={huis} readOnly></input>

                        <label className='mt-2'>Урлагийн салбар</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={urlagSalbar} readOnly></input>

                        <label className='mt-2'>Урлагийн чиглэл</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={urlagChiglel} readOnly></input>

                        <label className='mt-2'>Утасны дугаар</label>
                        <input type='text' className="input input-bordered w-full mytextarea" required defaultValue={dugaar} readOnly></input>

                        <label className='mt-2'>Боловсрол</label>
                        <textarea className="input input-bordered w-full mytextarea h-24 " defaultValue={bolovsrol} readOnly></textarea>

                        <label className='mt-2'>Туршлага</label>
                        <textarea className="input input-bordered w-full mytextarea h-24" defaultValue={turshlaga} readOnly></textarea>

                        <label className='mt-2'>Нас барсан эсэх</label>
                        <select defaultValue={nasbarsaneseh} className="select select-bordered mytextarea" disabled>
                            <option>Үгүй</option>
                            <option>Тийм</option>
                        </select>

                        <label className='mt-2'>Нас барсан огноо</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={nasbarsanognoo} name='nasbarsanognoo' readOnly></input>

                        <label className='mt-2'>Устгаж буй шалтгаан</label>
                        <textarea className="textarea textarea-bordered h-24 mytextarea" readOnly value={buteelch.ustgahtailbar}></textarea>

                        <button type='submit' className='btn text-white blue-button mt-5 w-32'>Устгал баталгаажуулах</button>
                    </div>
                </form >

                <form action={cancelDelete}>
                    <input type='hidden' value={buteelch.id} name='id'></input>
                    <input type='hidden' name='type' value="buteelch"></input>
                    <button type='submit' className='btn white-button w-32 mt-5'>Устгал цуцлах</button>
                </form>
            </div>
        )
    }


    const holboo = await getSingleValue(params.id, 'holboo');

    if (holboo) {
        const { id, ner, TUZdarga, uilajillagaa, hayg, burtgelDugaar, uusgenbaiguulsan, utas, tsahimshuudan, tsahimhayg, ustgahtailbar } = holboo;
        return (
            <div className='myform w-30'>
                <Link href='/pages/ustgahHuselt' className='btn  white-button w-20'>Буцах</Link>
                <form action={acceptDelete} style={{ width: '10rem' }}>
                    <div className='myform'>
                        <input type='hidden' name='id' value={id} />
                        <input type='hidden' name='type' value="holboo"></input>

                        <label className='mt-2'>Нэр</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={ner} readOnly></input>

                        <label className='mt-2'>Үйл ажиллагаа</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={uilajillagaa} readOnly></input>

                        <label className='mt-2'>Бүртгэлийн дугаар</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={burtgelDugaar} readOnly></input>

                        <label className='mt-2'>Үүсгэн байгуулагдсан</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={uusgenbaiguulsan} readOnly></input>

                        <label className='mt-2'>ТУЗ дарга<span className="required">*</span></label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={TUZdarga} readOnly></input>

                        <label className='mt-2'>Утас<span className="required">*</span></label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={utas} readOnly></input>

                        <label className='mt-2'>Цахим шуудан<span className="required">*</span></label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={tsahimshuudan} readOnly></input>

                        <label className='mt-2'>Цахим хаяг</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={tsahimhayg} readOnly></input>

                        <label className='mt-2'>Хаяг</label>
                        <textarea className="textarea textarea-bordered h-24 mytextarea" defaultValue={hayg} disabled></textarea>

                        <label className='mt-2'>Устгаж буй шалтгаан</label>
                        <textarea className="textarea textarea-bordered h-24 mytextarea" readOnly value={holboo.ustgahtailbar}></textarea>

                        <button type='submit' className='btn text-white blue-button mt-5 w-32'>Устгал баталгаажуулах</button>
                    </div>
                </form >

                <form action={cancelDelete}>
                    <input type='hidden' value={holboo.id} name='id'></input>
                    <input type='hidden' name='type' value="holboo"></input>
                    <button type='submit' className='btn white-button w-32 mt-5'>Устгал цуцлах</button>
                </form>
            </div>
        )
    }


};

export default Accepting