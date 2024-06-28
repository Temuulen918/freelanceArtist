import { getXataClient } from '@/src/xata';
import React from 'react'
import { addHolboo } from '@/myXata';
import Link from 'next/link';


const xata = getXataClient();

export default function ButeelchForm() {
    'use client'

    const today = new Date();
    const minAge = 5; // Minimum age requirement
    const max = new Date();
    max.setFullYear(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    const maxDate = max.toISOString().slice(0, 10); // YYYY-MM-DD format

    return (
        <div className='myform'>
            <form action={addHolboo}>
            <Link href='/pages/holbooSan' className='btn  white-button'>Буцах</Link>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="input-caption">Нэр<span className="required">*</span></span>
                    </div>
                    <input name='ner' type="text" placeholder="Нэр" className="input input-bordered w-full mytextarea" required pattern="[А-ЯҮӨа-яүө]+" />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="input-caption">Үйл ажиллагааны чиглэл<span className="required">*</span></span>
                    </div>
                    <input name='uilajillagaa' type="text" placeholder="Үйл ажиллагааны чиглэл" className="input input-bordered w-full mytextarea" required pattern="[А-ЯҮӨа-яүө]+" />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="input-caption">ТУЗ дарга<span className="required">*</span></span>
                    </div>
                    <input name='TUZdarga' type="text" placeholder="ТУЗ дарга" className="input input-bordered w-full mytextarea" required pattern="[А-ЯҮӨа-яүө]+" />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="input-caption">Үүсгэн байгуулагдсан<span className="required">*</span></span>
                    </div>
                    <input name='uusgenbaiguulsan' type="date" className="input input-bordered w-full mytextarea" required />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="input-caption">Бүртгэлийн дугаар<span className="required">*</span></span>
                    </div>
                    <input name='burtgelDugaar' type="text" placeholder="Бүртгэлийн дугаар" className="input input-bordered w-full mytextarea" required />
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="input-caption">Утасны дугаар<span className="required">*</span></span>
                    </div>
                    <input name='utas' type="text" placeholder="99999999" className="input input-bordered w-full mytextarea" required pattern="\d{8}" />
                </label>
                
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="input-caption">Цахим шуудан<span className="required">*</span></span>
                    </div>
                    <input name='tsahimshuudan' type="email" placeholder="name@domain.com" className="input input-bordered w-full mytextarea" required />
                </label>
                
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="input-caption">Цахим хаяг</span>
                    </div>
                    <input name='tsahimhayg' type="url" placeholder="https://example.com" className="input input-bordered w-full mytextarea"/>
                </label>

                <label className="form-control">
                    <div className="label">
                        <span className="input-caption">Хаяг</span>
                    </div>
                    <textarea name='hayg' className="textarea textarea-bordered h-24 mytextarea" placeholder="Холбооны албан хаяг"></textarea>
                </label> 

                <button type="submit" className="btn text-white blue-button mt-5">
                    Бүртгүүлэх
                </button>
            </form>
        </div>
    )
}