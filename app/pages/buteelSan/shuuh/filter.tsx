'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUrlagSalbarOptions, getUrlagChiglelOptions } from '../../../../myXata';

const Filter = () => {
  const [urlagSalbarOptions, setUrlagSalbarOptions] = useState<string[]>([]);
  const [urlagChiglelOptions, setUrlagChiglelOptions] = useState<string[]>([]);
  const [selectedUrlagSalbar, setSelectedUrlagSalbar] = useState<string>('Бүгд');
  const [selectedUrlagChiglel, setSelectedUrlagChiglel] = useState<string>('Бүгд');

  useEffect(() => {
    async function fetchUrlagSalbarOptions() {
      try {
        const salbarOptions = await getUrlagSalbarOptions();

        setUrlagSalbarOptions(['Бүгд', ...salbarOptions.map(option => option?.urlagSalbar as string)]);
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

          setUrlagChiglelOptions(['Бүгд', ...chiglelOptions.map(option => option || '')]);
        } catch (error) {
          console.error('Алдаа гарлаа:', error);
        }
      }
    }
    fetchUrlagChiglelOptions();
  }, [selectedUrlagSalbar]);

  const handleUrlagSalbarChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUrlagSalbar(event.target.value);
    setSelectedUrlagChiglel('Бүгд');
  };

  const handleUrlagChiglelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUrlagChiglel(event.target.value);
  };

  return (
    <div >
      <div className='flex justify-end mb-3'>
        <label className="form-control">
          <div className="label">
            <label htmlFor="urlagSalbar">Урлагийн салбар</label>
          </div>
          <select
            id="urlagSalbar"
            name="urlagSalbar"
            value={selectedUrlagSalbar}
            onChange={handleUrlagSalbarChange}
            className="select select-bordered white-button"
          >
            {urlagSalbarOptions.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control">
          <div className="label">
            <label htmlFor="urlagChiglel">Урлагийн чиглэл</label>
          </div>
          <select
            id="urlagChiglel"
            name="urlagChiglel"
            value={selectedUrlagChiglel}
            onChange={handleUrlagChiglelChange}
            className="select select-bordered white-button"
          >
            {urlagChiglelOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className='flex justify-end mb-3'>
        {selectedUrlagSalbar === 'Бүгд' ? (
          <Link href="/pages/buteelSan" className='text-blue-700'>
            Шүүлтүүргүй харах
          </Link>
        ) : selectedUrlagChiglel === 'Бүгд' ? (
          <Link href={`/pages/buteelSan/shuuh/${selectedUrlagSalbar}`} className='text-blue-700'>
            {selectedUrlagSalbar} салбарын бүх чиглэлээр харах
          </Link>
        ) : (
          <Link href={`/pages/buteelSan/shuuh/${selectedUrlagSalbar}/${selectedUrlagChiglel}`} className='text-blue-700'>
            {selectedUrlagSalbar} салбарын {selectedUrlagChiglel} чиглэлээр харах
          </Link>
        )}
      </div>
    </div>
  );
};

export default Filter;
