import React from 'react'
import { editArtist, editArtwork, editHolboo, editAjiltan } from '@/myXata';

export const EditButton = ({ artist }: any) => { //buteelch

    const { id, ner, ovog, RD, tursunognoo, huis, urlagChiglel, urlagSalbar, dugaar, bolovsrol, turshlaga, nasbarsaneseh, nasbarsanognoo } = artist;

    return (
        <form action={editArtist} >
            <div className='myform'>
                <input type='hidden' name='id' value={id} />

                <div className="grid grid-cols-2 gap-4">
                    <div className="border p-4 flex flex-col items-center">
                        <label>Нэр</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={ner} name='ner' readOnly></input>

                        <label>Овог</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={ovog} name='ovog' readOnly></input>

                        <label>Регистерийн дугаар</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={RD} name='RD' readOnly></input>

                        <label>Төрсөн огноо</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={tursunognoo} name='tursunognoo' readOnly></input>

                        <label>Хүйс</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={huis} name='huis' readOnly></input>
                  
                        <label>Урлагийн салбар</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={urlagSalbar} name='urlagSalbar' readOnly></input>

                        <label>Урлагийн чиглэл</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={urlagChiglel} name='dugaurlagChiglelar' readOnly></input>

                        </div>
                    <div className="border p-4 flex flex-col items-center">

                        <label>Утасны дугаар</label>
                        <input type='text' className="input input-bordered w-full mytextarea" required defaultValue={dugaar} name='dugaar' pattern="\d{8}"></input>

                        <label>Боловсрол</label>
                        <textarea className="input input-bordered w-full mytextarea h-24" defaultValue={bolovsrol} name='bolovsrol'></textarea>

                        <label>Туршлага</label>
                        <textarea className="input input-bordered w-full mytextarea h-24" defaultValue={turshlaga} name='turshlaga'></textarea>

                        <label>Нас барсан эсэх</label>
                        <select required defaultValue={nasbarsaneseh} name='nasbarsaneseh' className="select select-bordered mytextarea">
                            <option>Үгүй</option>
                            <option>Тийм</option>
                        </select>

                        <label>Нас барсан огноо</label>
                        <input type='date' className="input input-bordered w-full mytextarea" defaultValue={nasbarsanognoo} name='nasbarsanognoo'></input>

                        <div className='form-control'>
                            <label htmlFor='completed'></label>
                        </div>
                        <button type='submit' className='btn text-white blue-button mt-10 w-32'>Хадгалах</button>
                    </div>

                </div>
            </div>
        </form >
    );
};



export const EditButton1 = ({ artwork }: any) => { //buteel
    const { id, ner, tailbar, tuurvijduussan, link, zohiogchiinerh, urlagChiglel, urlagSalbar, buteelchid } = artwork;

    return (

        <form action={editArtwork}>
            <div className="grid grid-cols-2 gap-4">
                <div className="border p-4 flex flex-col items-center ">

                    <input type='hidden' name='id' value={id} />

                    <label>Уран бүтээлч</label>
                    <input type='text' className="input input-bordered w-full mytextarea" defaultValue={buteelchid} name='buteelchid' readOnly></input>

                    <label>Урлагийн салбар</label>
                    <input type='text' className="input input-bordered w-full mytextarea" defaultValue={urlagSalbar} name='urlagSalbar' readOnly></input>

                    <label>Урлагийн чиглэл</label>
                    <input type='text' className="input input-bordered w-full mytextarea" defaultValue={urlagChiglel} name='urlagChiglel' readOnly></input>

                    <label>Бүтээлийн нэр</label>
                    <input type='text' className="input input-bordered w-full mytextarea" defaultValue={ner} name='ner' readOnly></input>

                    <label>Туурвиж дууссан</label>
                    <input type='text' className="input input-bordered w-full mytextarea" defaultValue={tuurvijduussan} name='tuurvijduussan' readOnly></input>

                    <label>Уран бүтээлчид</label>
                    <input type='text' className="input input-bordered w-full mytextarea" defaultValue={buteelchid} name='buteelchid' readOnly></input>
                </div>
                <div className="border p-4 flex flex-col items-center ">
                    <label>Файл</label>
                    <input type='text' className="input input-bordered w-full mytextarea" defaultValue={''} name='file' readOnly></input>

                    <label>Тайлбар<span className="required">*</span></label>
                    <input type='text' className="input input-bordered w-full mytextarea" defaultValue={tailbar} name='tailbar' required></input>

                    <label>Цахим холбоос</label>
                    <input type='url' className="input input-bordered w-full mytextarea" defaultValue={link} name='link'></input>

                    <label>Зохиогчийн эрхийн гэрчилгээ</label>
                    <input type='text' className="input input-bordered w-full mytextarea" defaultValue={zohiogchiinerh} name='zohiogchiinerh' pattern="\d+"></input>

                    <div className='form-control'>
                        <label htmlFor='completed'></label>
                    </div>
                    <button type='submit' className='btn text-white blue-button w-32 mt-5'>Хадгалах</button>
                </div>
            </div>
        </form >
    );
}

export const EditButton2 = ({ holboo }: any) => { //holboo
    const { id, ner, TUZdarga, uilajillagaa, hayg, burtgelDugaar, uusgenbaiguulsan, utas, tsahimshuudan, tsahimhayg } = holboo;

    return (
        <form action={editHolboo} style={{ width: '10rem' }}>
            <div className='myform'>
                <input type='hidden' name='id' value={id} />
                <div className="grid grid-cols-2 gap-4">
                    <div className="border p-4 flex flex-col items-center">
                        <label>Нэр</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={ner} name='ner' readOnly></input>

                        <label>Үйл ажиллагаа</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={uilajillagaa} name='uilajillagaa' readOnly></input>

                        <label>Бүртгэлийн дугаар</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={burtgelDugaar} name='burtgelDugaar' readOnly></input>

                        <label>Үүсгэн байгуулагдсан</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={uusgenbaiguulsan} name='uusgenbaiguulsan' readOnly></input>
        
                        <label>ТУЗ дарга<span className="required">*</span></label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={TUZdarga} name='TUZdarga' required></input>

                        </div>
                    <div className="border p-4 flex flex-col items-center">

                        <label>Утас<span className="required">*</span></label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={utas} name='utas' required></input>

                        <label>Цахим шуудан<span className="required">*</span></label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={tsahimshuudan} name='tsahimshuudan' required></input>

                        <label>Цахим хаяг</label>
                        <input type='text' className="input input-bordered w-full mytextarea" defaultValue={tsahimhayg} name='tsahimhayg'></input>

                        <label>Хаяг</label>
                        <textarea className="textarea textarea-bordered h-24 mytextarea" defaultValue={hayg} name='hayg'></textarea>

                        <div className='form-control'>
                            <label htmlFor='completed'></label>
                        </div>
                        <button type='submit' className='btn text-white blue-button mt-10 w-32'>Хадгалах</button>
                    </div>
                </div>
            </div>
        </form >
    );
};

export const EditButton3 = ({ ajiltan }: any) => { //ajiltan
    const { id, ner, ovog, RD, tursunognoo, huis, utas } = ajiltan;

    return (
        <form action={editAjiltan} style={{ width: '10rem' }}>
            <div className='myform'>
                <input type='hidden' name='id' value={id} />

                <label>Нэр</label>
                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={ner} name='ner' readOnly></input>

                <label>Овог</label>
                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={ovog} name='ovog' readOnly></input>

                <label>Регистерийн дугаар</label>
                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={RD} name='RD' readOnly></input>

                <label>Төрсөн огноо</label>
                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={tursunognoo} name='tursunognoo' readOnly></input>

                <label>Хүйс</label>
                <input type='text' className="input input-bordered w-full mytextarea" defaultValue={huis} name='huis' readOnly></input>

                <label>Утасны дугаар<span className="required">*</span></label>
                <input type='text' className="input input-bordered w-full mytextarea" required defaultValue={utas} name='utas' pattern="\d{8}"></input>

                <button type='submit' className='btn text-white blue-button mt-10 w-32'>Хадгалах</button>
            </div>
        </form >
    );
};