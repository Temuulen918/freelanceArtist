'use client'

import React, { useState, useEffect } from 'react';
import { getUrlagSalbarOptions, getUrlagChiglelOptions, deleteSalbar, deleteChiglel } from '../../myXata';

const DeleteAngilal = () => {

    const [urlagSalbarOptions, setUrlagSalbarOptions] = useState<string[]>([]);
    const [urlagChiglelOptions, setUrlagChiglelOptions] = useState<string[]>([]);
    const [selectedUrlagSalbar, setSelectedUrlagSalbar] = useState<string>('');

    useEffect(() => {
        async function fetchUrlagSalbarOptions() {
            try {
                const salbarOptions = await getUrlagSalbarOptions();
                setUrlagSalbarOptions(salbarOptions.map(option => option?.urlagSalbar as string));

                setSelectedUrlagSalbar(salbarOptions[0]?.urlagSalbar || '');
            } catch (error) {
                console.error('Алдаа гарлаа:', error);
            }
        }
        fetchUrlagSalbarOptions();
    }, []);

    useEffect(() => {
        async function fetchUrlagChiglelOptions() {
            if (selectedUrlagSalbar) {
                try {
                    const chiglelOptions = await getUrlagChiglelOptions(selectedUrlagSalbar);

                    setUrlagChiglelOptions(chiglelOptions.map(option => option || ''));

                } catch (error) {
                    console.error('Алдаа гарлаа:', error);
                }
            }
        }
        fetchUrlagChiglelOptions();
    }, [selectedUrlagSalbar]);

    const handleUrlagSalbarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUrlagSalbar(event.target.value);
    };

    return (
        <div>
            <form action={deleteSalbar}>
                <h1 className='text-lg'>Урлагийн салбар</h1>
                <select id="urlagSalbar" name='urlagSalbar' value={selectedUrlagSalbar} onChange={handleUrlagSalbarChange} className="select select-bordered mytextarea">
                    {urlagSalbarOptions.map((option) => (
                        <option key={option} value={option} >
                            {option}
                        </option>
                    ))}
                </select>
                <button className='btn blue-button text-white'>Салбар устгах</button>
            </form>
            <br />
            <form action={deleteChiglel}>
                <h1 className='text-lg'>Урлагийн чиглэл</h1>
                <select id="urlagChiglel" name='urlagChiglel' className="select select-bordered mytextarea">
                    <option value="" disabled>Сонгох</option>
                    {urlagChiglelOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <button className='btn blue-button text-white'>Чиглэл устгах</button>
            </form>
        </div>
    );
};

export default DeleteAngilal;
