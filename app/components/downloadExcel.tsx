
'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx'; // Import for Excel generation


const DownloadExcel = ( {myData, fileName}: any) => {

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(myData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'data');
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
      };

  return (
    <button onClick={downloadExcel} className='btn white-button'>
      <FontAwesomeIcon icon={faDownload} /> Файлаар татах
    </button>
  );
};

export default DownloadExcel;
