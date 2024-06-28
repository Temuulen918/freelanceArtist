'use client'

import React, { useState, useEffect } from 'react';
import { getUrlagSalbarOptions, getUrlagChiglelOptions } from '../../myXata';
import { addChiglel, addSalbar } from '../../myXata';


const AddAngilal = () => {
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

    const handleUrlagSalbarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUrlagSalbar(event.target.value);
    };

    return (
        <div className="flex flex-col space-y-4">
            <form className="flex flex-col" action={addSalbar}>
                <h1 className='text-xl'>Урлагийн салбар нэмэх</h1>
                <label>Салбарын нэр</label>
                <input name="newSalbar" className="border border-black border-opacity-25 h-10" placeholder='Салбарын нэр' required />
                <label>Салбарын чиглэл</label>
                <input name="newChiglel" className="border border-black border-opacity-25 h-10" placeholder='Чиглэлийн нэр' required />
                <button className="btn blue-button text-white mt-5">Нэмэх</button>
            </form>

            <form className="flex flex-col" action={addChiglel}>
                <h1 className='text-xl'>Урлагийн чиглэл нэмэх</h1>

                <select
                    id="urlagSalbar"
                    name="urlagSalbar"
                    value={selectedUrlagSalbar}
                    onChange={handleUrlagSalbarChange}
                    className="select select-bordered mytextarea"
                >
                    {urlagSalbarOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <input name="danChiglel" className="border border-black border-opacity-25 h-10" required />
                <button className="btn blue-button text-white">Нэмэх</button>
            </form>
        </div>



    )
}

export default AddAngilal