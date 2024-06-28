import { getXataClient } from '@/src/xata';
import React from 'react'
import { addArtist, findAccount } from '@/myXata';
import MyUrlag from '../../../components/myUrlag';
import Link from 'next/link';
import { getSession } from '@/src/actions';


const xata = getXataClient();

const today = new Date();
const mytoday = today.toISOString().slice(0, 10);
const minAge = 5;
const max = new Date();
max.setFullYear(today.getFullYear() - minAge, today.getMonth(), today.getDate());
const maxDate = max.toISOString().slice(0, 10);

export const RestofForm = () => {
    return (
        <>
            <span className='input-label'>Хувийн мэдээлэл</span>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="input-caption">Нэр<span className="required">*</span></span>
                </div>
                <input name='ner' type="text" placeholder="Нэр" className="input input-bordered w-full mytextarea" required pattern="[А-ЯҮӨа-яүө]+" />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="input-caption">Овог<span className="required">*</span></span>
                </div>
                <input name='ovog' type="text" placeholder="Овог" className="input input-bordered w-full mytextarea" required pattern="[А-ЯҮӨа-яүө]+" />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="input-caption">Хүйс<span className="required">*</span></span>
                </div>
                <select name='huis' className="select select-bordered mytextarea">
                    <option>Эр</option>
                    <option>Эм</option>
                </select>
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="input-caption">Төрсөн огноо<span className="required">*</span></span>
                </div>
                <input name='tursunognoo' type="date" className="input input-bordered w-full mytextarea" required max={maxDate} />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="input-caption">Регистерийн дугаар<span className="required">*</span></span>
                </div>
                <input name='RD' type="text" placeholder="Регистерийн дугаар" className="input input-bordered w-full mytextarea" required pattern="[А-ЯҮӨа-яүө]{2}\d{8}" />
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="input-caption">Утасны дугаар<span className="required">*</span></span>
                </div>
                <input name='dugaar' type="text" placeholder="Утасны дугаар" className="input input-bordered w-full mytextarea" required pattern="\d{8}" />
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="input-caption">Нас барсан эсэх<span className="required">*</span></span>
                </div>
                <select name='nasbarsaneseh' className="select select-bordered mytextarea">
                    <option>Үгүй</option>
                    <option>Тийм</option>
                </select>
            </label>

            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="input-caption">Нас барсан огноо</span>
                </div>
                <input name='nasbarsanognoo' type="date" className="input input-bordered w-full mytextarea" required max={mytoday} />
            </label>

            <span>Ажил мэргэжил</span>

            <MyUrlag />

            <label className="form-control">
                <div className="label">
                    <span className="input-caption">Боловсрол</span>
                </div>
                <textarea name='bolovsrol' className="textarea textarea-bordered h-24 mytextarea" placeholder="Боловсрол"></textarea>
            </label>

            <label className="form-control">
                <div className="label">
                    <span className="input-caption">Ажлын туршлага</span>
                </div>
                <textarea name='turshlaga' className="textarea textarea-bordered h-24 mytextarea" placeholder="Ажлын туршлага"></textarea>
            </label>
        </>
    )
}


export default async function ButeelchForm() {
    'use client'

    const session = await getSession();
    const id = await findAccount(session.username) as string;

    const holboo = await xata.db.holboo.read(id);
    const holbooner = holboo?.ner as string;

    if (session.type === 'holboo') {
        return (
            <div className='myform'>
                <form action={addArtist}>
                    <Link href='/pages/buteelchSan' className='btn  white-button'>Буцах</Link>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="input-caption">Холбооны нэр<span className="required">*</span></span>
                        </div>
                        <input defaultValue={holbooner} name='holboo' readOnly className="input input-bordered w-full mytextarea"></input>
                    </label>

                    <RestofForm />

                    <button type="submit" className="btn text-white blue-button mt-5">Бүртгүүлэх</button>
                </form>
            </div>
        )
    } else {
        return (
            <div className='myform'>
                <form action={addArtist}>
                    <Link href='/pages/buteelchSan' className='btn  white-button'>Буцах</Link>

                    <RestofForm />

                    <input type='hidden' defaultValue="Байхгүй" name='holboo'></input>

                    <button type="submit" className="btn text-white blue-button mt-5">Бүртгүүлэх</button>
                </form>
            </div>
        )
    }
}