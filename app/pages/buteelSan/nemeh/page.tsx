import { getXataClient } from '@/src/xata';

import { addArtwork, findAccount, getData } from '@/myXata';
import MyUrlag from '../../../components/myUrlag';
import Link from 'next/link';
import { getSession } from '@/src/actions';
import { EhButeel, NewButeelch } from './newButeelch';


const xata = getXataClient()

const today = new Date();
today.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
const maxDate = today.toISOString().slice(0, 10);

export const RestofForm = () => {
    return (
        <><br></br>
            <label className='mb-5 ml-5'>Бүтээлийн мэдээлэл</label>
            <div className="grid grid-cols-2 gap-4">
                <div className="border p-4 flex flex-col items-center">

                    <MyUrlag />

                    <label>
                        <div className="label">
                            <span className="input-caption">Бүтээлийн нэр<span className="required">*</span></span>
                        </div>
                        <input type="text" placeholder="Нэр" name="ner" className="input input-bordered w-full mytextarea" required />
                    </label>


                    <label>
                        <div className="label">
                            <span className="input-caption">Тайлбар</span>
                        </div>
                        <textarea className="textarea textarea-bordered h-24 mytextarea" name='tailbar' placeholder="Тайлбар"></textarea>
                    </label>
                </div>

                <div className=" border p-4 flex flex-col items-center">
                    <label>
                        <div className="label">
                            <span className="input-caption">Туурвиж дууссан огноо<span className="required">*</span></span>
                        </div>
                        <input type="date" className="input input-bordered w-full mytextarea" name='tuurvijduussan' required max={maxDate} />
                    </label>

                    <label>
                        <div className="label">
                            <span className="input-caption">Зохиогчийн эрхийн гэрчилгээний дугаар</span>
                        </div>
                        <input type="text" placeholder="Гэрчилгээний дугаар" name='zohiogchiinerh' className="input input-bordered w-full mytextarea" pattern="\d{5}" />
                    </label>

                    <label>
                        <div className="label">
                            <span className="input-caption">Цахим холбоос</span>
                        </div>
                        <input type="text" placeholder="Цахим холбоос" name='link' className="input input-bordered w-full mytextarea" />
                    </label>

                    <label>
                        <div className="label">
                            <span className="input-caption">Холбогдох файл оруулах<span className="required">*</span></span>
                        </div>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs" required />
                        <div className="label">
                            <span className="label-text-alt">*файлын хэмжээг 10mb-аас хэтрүүлэхгүй байна уу</span>
                        </div>
                    </label>
                </div>
            </div>
            <EhButeel />
            <div className='flex justify-center w-full mt-5'>
                <button type="submit" className="btn text-white blue-button">
                    Бүртгүүлэх
                </button>
            </div>
        </>
    )
}


export default async function ButeelForm() {


    const buteelchData = await getData('buteelch');
    const session = await getSession();

    if (session.type !== 'buteelch' && session.type !== 'holboo') {
        return (
            <div className='myform'>
                <form action={addArtwork}>
                    <Link href='/pages/buteelSan' className='btn  white-button'>Буцах</Link>
                    <NewButeelch buteelchData={buteelchData} />
                    <RestofForm />
                </form>
            </div>
        )
    } else {
        if (session.type == 'buteelch') {
            {
                const id = await findAccount(session.username) as string;
                const buteelch = await xata.db.buteelch.read(id);
                const ovogner = buteelch?.RD + " " + buteelch?.ner + " " + buteelch?.ovog;
                const rd = buteelch?.RD as string;

                return (
                    <div className='myform'>
                        <form action={addArtwork}>
                            <Link href='/pages/buteelSan' className='btn white-button'>Буцах</Link>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="input-caption">Уран бүтээлч<span className="required">*</span></span>
                                </div>
                                <input className="input input-bordered w-full mytextarea mb-5" readOnly defaultValue={ovogner}></input>
                            </label>
                            <input name='buteelchid' defaultValue={rd} type='hidden'></input>
                            <RestofForm />
                        </form>
                    </div>
                )
            }
        } else {
            if (session.type == 'holboo') {

                const id = await findAccount(session.username) as string
                const holboo = await xata.db.holboo.read(id);
                const holbooner = holboo?.ner as string;

                return (
                    <div className='myform'>
                        <form action={addArtwork}>
                            <Link href='/pages/buteelSan' className='btn  white-button'>Буцах</Link>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="input-caption">Холбооны нэр<span className="required">*</span></span>
                                </div>
                                <input className="input input-bordered w-full mytextarea" readOnly name="holboo" defaultValue={holbooner}></input>
                            </label>

                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="input-caption">Уран бүтээлч<span className="required">*</span></span>
                                </div>
                                <select className="select select-bordered mytextarea" name='buteelchid'>
                                    {buteelchData.map((option: any) => (
                                        option.holboo === holboo?.id && (
                                            <option key={option.RD} value={option.RD}>
                                                {option.RD} {option.ner} {option.ovog}
                                            </option>
                                        )
                                    ))}
                                </select>
                            </label>
                            <RestofForm />
                        </form>
                    </div>
                )
            }
        }
    }
}