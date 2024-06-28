'use client'

import React, { useState, useEffect } from 'react';
import { getUrlagSalbarOptions, getUrlagChiglelOptions } from '../../myXata';

const MyUrlag = () => {

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
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <label htmlFor="urlagSalbar">Урлагийн салбар<span className="required">*</span></label>
        </div>
        <select id="urlagSalbar" name='urlagSalbar' value={selectedUrlagSalbar} onChange={handleUrlagSalbarChange} className="select select-bordered mytextarea">
          {urlagSalbarOptions.map((option) => (
            <option key={option} value={option} >
              {option}
            </option>
          ))}
        </select>
      </label>

      <label >
        <div className="label">
          <label htmlFor="urlagChiglel">Урлагийн чиглэл<span className="required">*</span>  </label>
        </div>
        <select id="urlagChiglel" name='urlagChiglel' className="select select-bordered mytextarea">
          <option value="" disabled>Сонгох</option>
          {urlagChiglelOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default MyUrlag;
