import React, { useState, useRef } from 'react';
import FontSelector from './FontSelector';

const InputName = ({ handleTextDownload, showTextDownloadButton, setShowTextDownloadButton, selectedFont, setSelectedFont, text, setText, setTextDownloadUrl }) => {

    const handleTextChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        setShowTextDownloadButton(newText.trim().length > 0); 
    };

    const handleFontChange = (font) => {
        setSelectedFont(font);
    };

    const handleClear = () => {
        setText('');
        setTextDownloadUrl(null);
    };

    return (
        <div className='space-y-3 border rounded-lg p-10'>
            <div>
                <p>Enter Name:</p>
                <input type="text" value={text} onChange={handleTextChange} className='ring-1 ring-gray-300 focus:ring-blue-400 focus:shadow-inner p-2 rounded-md w-96 outline-none' />
            </div>

            <FontSelector onSelectFont={handleFontChange} />

            <div style={{ fontFamily: selectedFont, fontSize: '50px' }} className='w-96 select-all ring-1 ring-gray-300 focus:ring-blue-400 focus:shadow-inner py-2 px-8 rounded-md outline-none break-all'>
                {text ? text : 'Preview'}
            </div>

            <div className='flex justify-end space-x-4'>
                <button onClick={handleClear} className='px-3 py-1 bg-red-400 rounded-2xl hover:bg-red-500 text-white disabled:cursor-not-allowed'>Clear</button>
                <button onClick={handleTextDownload} disabled={!showTextDownloadButton} className='px-3 py-1 bg-blue-400 rounded-2xl hover:bg-blue-500 text-white disabled:cursor-not-allowed'>
                    Submit
                </button>
            </div>

        </div>
    )
}

export default InputName