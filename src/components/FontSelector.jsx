import React from 'react';
import '../App.css'

const FontSelector = ({ onSelectFont }) => {

    const fontOptions = [
        { name: 'Arial', value: 'Arial, sans-serif' },
        { name: 'Autograph', value: 'Autograph' },
        { name: 'Ballpoints', value: 'Ballpoints' },
        { name: 'Ballpoints Italic', value: 'BallpointsItalic' },
        { name: 'Ballpoints Thin', value: 'BallpointsThin' },
        { name: 'Fashioniqa', value: 'Fashioniqa' },
        { name: 'Florita Signature', value: 'FloritaSignature' },
        { name: 'Safiar Signature', value: 'SafiarSignature' },
        { name: 'Signature 1', value: 'Signaturae_1' },
        { name: 'Signature 2', value: 'Signaturae_2' },
        { name: 'Signs Painted Script', value: 'Signspaintedscript' },
        { name: 'Sweety Lovers', value: 'SweetyLoversPersonalUse' },
        { name: 'The Excited', value: 'TheExcited' },
    ];

    const handleFontChange = (event) => {
        const selectedFont = event.target.value;
        onSelectFont(selectedFont);
    };

    return (
        <div>
            <label htmlFor="font-select">Select Font:</label>
            <select id="font-select" onChange={handleFontChange} className='ring-1 ring-gray-300 focus:ring-gray-400 rounded-lg p-1 m-2 outline-none'>
                {fontOptions.map((font, index) => (
                    <option key={index} value={font.value}>
                        {font.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FontSelector;
