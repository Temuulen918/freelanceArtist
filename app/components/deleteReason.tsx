'use client'

import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactNode, useState } from 'react'
import style from '../styles/modal.module.css';
import { Session } from 'inspector';
import { IronSession, SessionOptions } from 'iron-session';
import { SessionData } from '@/src/lib';
import { deleteArtist, deleteReasonAcc } from '@/myXata';




const Rest = ({ children }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form submitted');

    };
    return (
        <div>
            <button><FontAwesomeIcon icon={faTrashCan} size='2x' color='#9B9B9B ' onClick={openModal} /></button>
            {isOpen && (
                <div className={style.overlay}>
                    <dialog open className={style.modal}>
                        <div className="modal-box">
                            <div className='x-button'>
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                            </div>
                            <div className='form-container'>
                                {children}
                            </div>
                            <button className="btn white-button" type="button" onClick={closeModal}>Цуцлах</button>
                        </div>
                    </dialog>
                </div>
            )}
        </div>
    )
}

export const DeleteReason = async ({ idbuteelch, rd }: any) => {

    return (
        <Rest>
            <form action={deleteReasonAcc} className='flex flex-col'>
                <input type='hidden' name='idbuteelch' value={idbuteelch}></input>

                <input readOnly value={rd} className='input input-bordered w-full mb-5'></input>

                <label className='text-xl '>Бүртгэл устгаж буй тайлбар</label>
                <textarea className='mytextarea h-32 border mt-5 border-black' name='reason'></textarea>
                <button className='btn blue-button text-white mt-5 mb-10'>Илгээх</button>
            </form>
        </Rest>
    )
}

export const DeleteReason1 = async ({ idbuteelch, ner }: any) => {

    return (
        <Rest>
            <form action={deleteArtist} className='flex flex-col'>
                <input type='hidden' name='idbuteelch' value={idbuteelch}></input>

                <input readOnly value={ner} className='input input-bordered w-full mb-5'></input>
                <label className='text-lg'>Устгахад итгэлтэй байна уу?</label>
                

                <input type='hidden' name='id' value={idbuteelch} />
                <button className='btn blue-button text-white mt-5 mb-10'>Устгах</button>
                

            </form>
        </Rest>
    )
}
