import { getXataClient } from '@/src/xata';
import React from 'react'
import { addAjiltan } from '@/myXata';
import Link from 'next/link';


const xata = getXataClient();

export default function AjiltanForm() {
    'use client'

    const today = new Date();
    const minAge = 5; 
    const max = new Date();
    max.setFullYear(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    const maxDate = max.toISOString().slice(0, 10); 

    return (
        <div className='myform'>
            <form action={addAjiltan}>
            <Link href='/pages/ajiltanSan' className='btn  white-button'>Буцах</Link>
                
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

                <button type="submit" className="btn text-white blue-button mt-5">
                    Бүртгүүлэх
                </button>
            </form>
        </div>
    )
}