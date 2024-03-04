import React, { useState } from 'react';
import CanvasDraw from 'react-canvas-draw';

const DrawName = ({ setDrawingDownloadUrl, showDrawingDownloadButton, handleDrawingDownload, canvasRef, setDrawing }) => {

    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(3);

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const handleBrushSizeChange = (event) => {
        setBrushSize(parseInt(event.target.value));
    };

    const handleClear = () => {
        // Clear drawing
        if (canvasRef.current) {
            canvasRef.current.clear();
            setDrawing(null);
            setDrawingDownloadUrl(null);
        }
    };



    return (
        <div className='space-y-3'>
            <CanvasDraw
                ref={canvasRef}
                brushColor={color}
                brushRadius={brushSize}
                onChange={(canvas) => setDrawing(canvas.getSaveData())}
                className='border rounded-xl'
            />
            <div className='flex justify-around'>
                <label className='text-center'>
                    Color:
                    <input type="color" value={color} onChange={handleColorChange} />
                </label>
                <label>
                    Brush Size:
                    <input
                        type="number"
                        value={brushSize}
                        onChange={handleBrushSizeChange}
                        className='ring-1 ring-gray-300 focus:ring-blue-400 focus:shadow-inner p-2 mx-3 w-16 rounded-md outline-none'
                    />
                </label>
            </div>
            <div className='flex justify-between'>
                <button onClick={handleClear} className='px-3 py-1 bg-red-400 rounded-2xl hover:bg-red-500 text-white disabled:cursor-not-allowed'>Clear</button>
                <button onClick={handleDrawingDownload} className='px-3 py-1 bg-blue-400 rounded-2xl hover:bg-blue-500 text-white disabled:cursor-not-allowed'>Submit</button>
            </div>
        </div>
    )
}

export default DrawName