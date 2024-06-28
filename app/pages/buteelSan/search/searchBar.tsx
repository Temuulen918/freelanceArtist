'use client'

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';

export const SearchBar = () => {
  const [searchWord, setSearchWord] = useState('');

  const handleSearchSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  return (
    <div className='myform ml-5'>
      <form className="flex" onSubmit={handleSearchSubmit}>
        <input
          placeholder="Хайх"
          className="input input-bordered w-50 white-button"
          name="searchWord"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <Link href={searchWord ? `/pages/buteelSan/search/${searchWord}` : '#'}>
          <button
            className={'btn bg-white'}
            
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
          </button>
        </Link>
      </form>
    </div>
  );
};
