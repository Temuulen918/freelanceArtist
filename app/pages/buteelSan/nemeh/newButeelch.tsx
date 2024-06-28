'use client'

import React, { useState } from 'react';

export const NewButeelch = ({ buteelchData }: { buteelchData: any[] }) => {
    const [selectCount, setSelectCount] = React.useState(1);
    const [selectedArtists, setSelectedArtists] = React.useState<string[]>([]);

    const addCoArtist = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSelectCount(selectCount + 1);
        setSelectedArtists([...selectedArtists, '']); // Add empty value for new select
    };

    const deleteCoArtist = (index: number) => {
        setSelectCount(selectCount - 1);
        const newSelectedArtists = selectedArtists.filter((_, i) => i !== index);
        setSelectedArtists(newSelectedArtists);
    };

    const handleSelectChange = (index: number, value: string) => {
        const newSelectedArtists = [...selectedArtists];
        newSelectedArtists[index] = value;
        setSelectedArtists(newSelectedArtists);
    };

    return (
        <>
            {[...Array(selectCount)].map((_, index) => (
                <div key={index} className="flex mr-10 mb-5">
                    <label className="label">
                        <span className="input-caption">Уран бүтээлч<span className="required">*</span></span>
                    </label>
                    <select
                        className="select select-bordered mytextarea"
                        name={`buteelchid-${index}`}
                        value={selectedArtists[index] || ''}
                        onChange={(e) => handleSelectChange(index, e.target.value)}
                    >
                        {buteelchData
                            .filter((option: { RD: string }) => !selectedArtists.includes(option.RD) || selectedArtists[index] === option.RD)
                            .map((option: { RD: string, ner: string, ovog: string }) => (
                                <option key={option.RD} value={option.RD}>
                                    {option.RD} {option.ner} {option.ovog}
                                </option>
                            ))}
                    </select>
                    {index !== 0 && (
                        <button className='btn white-button ml-2' onClick={() => deleteCoArtist(index)}>Хасах</button>
                    )}
                </div>
            ))}
            <button className='btn white-button ml-5 mb-5' onClick={addCoArtist}>+ Хамтран бүтээгч</button>
        </>
    );
};





import iso6391 from 'iso-639-1';

const languages = iso6391.getLanguages(iso6391.getAllCodes());

export const EhButeel = () => {
    const [showOptionalFields, setShowOptionalFields] = useState(false);

    const handleToggleFields = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowOptionalFields(!showOptionalFields);
    };

    return (
        <>
            <div className='flex justify-center w-full mt-5'>
                <button className="btn white-button" onClick={handleToggleFields}>
                    {showOptionalFields ? 'Эх бүтээл устгах' : 'Эх бүтээл нэмэх'}
                </button>
            </div>

            {showOptionalFields && (
                <>
                    <label className='text-center ml-10 text-lg'>Эх бүтээлийн мэдээлэл</label>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border p-4 flex flex-col items-center bg-gray-100">

                            <label>
                                <div className="label">
                                    <span className="input-caption">Эх бүтээлийн нэр<span className="required">*</span></span>
                                </div>
                                <input type="text" placeholder="Эх бүтээлийн нэр" name='ehbuteelner' className="input input-bordered w-full mytextarea" required />
                            </label>

                            <label>
                                <div className="label">
                                    <span className="input-caption">Зохиогчийн нэр</span>
                                </div>
                                <input type="text" placeholder="Зохиогчийн нэр" name='ehNer' className="input input-bordered w-full mytextarea" />
                            </label>

                            <label>
                                <div className="label">
                                    <span className="input-caption">Зохиогчийн овог</span>
                                </div>
                                <input type="text" placeholder="Зохиогчийн овог" name='ehovog' className="input input-bordered w-full mytextarea" />
                            </label>

                            <label>
                                <div className="label">
                                    <span className="input-caption">Ямар хэл дээр туурвисан</span>
                                </div>
                                <select className="select select-bordered mytextarea" name='hel'>
                                    {languages.map(language => (
                                        <option key={language.code} value={language.code}>
                                            {language.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="border p-4 flex flex-col items-center bg-gray-100">
                            <label>
                                <div className="label">
                                    <span className="input-caption">Цахим холбоос</span>
                                </div>
                                <input type="text" placeholder="Цахим холбоос" name='ehlink' className="input input-bordered w-full mytextarea" />
                            </label>

                            <label>
                                <div className="label">
                                    <span className="input-caption">Тайлбар<span className="required">*</span></span>
                                </div>
                                <textarea className="textarea textarea-bordered h-24 mytextarea" name='ehtailbar' placeholder="Тайлбар" required></textarea>
                            </label>

                            <label>
                                <div className="label">
                                    <span className="input-caption">Зохиогчийн зөвшөөрөл<span className="required">*</span></span>
                                </div>
                                <input type="file" className="file-input file-input-bordered w-full max-w-xs" required />
                                <div className="label">
                                    <span className="label-text-alt">*файлын хэмжээг 10mb-аас хэтрүүлэхгүй байна уу</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}