import React, { useState, useRef } from 'react';
import InputName from './InputName';
import DrawName from './DrawName';

const SignCreator = () => {
  const [option, setOption] = useState('text');

  const [text, setText] = useState('');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [drawing, setDrawing] = useState(null);
  const [textDownloadUrl, setTextDownloadUrl] = useState(null);
  const [drawingDownloadUrl, setDrawingDownloadUrl] = useState(null);
  const [showTextDownloadButton, setShowTextDownloadButton] = useState(false);
  const [showDrawingDownloadButton, setShowDrawingDownloadButton] = useState(false);

  const canvasRef = useRef(null);

  const handleOptionChange = (event) => {
    setOption(event.target.value);
    setShowTextDownloadButton(false); // Hide text download button when option changes
    setShowDrawingDownloadButton(false); // Hide drawing download button when option changes
    setText('')
    setDrawing(null);
    setSelectedFont('Arial')
    setTextDownloadUrl(null);
    setDrawingDownloadUrl(null);
  };

  const handleTextDownload = () => {

    // Create a canvas with white background
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidth = 300; // Set canvas width
    const canvasHeight = 100; // Set canvas height
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = '#ffffff'; // Set white background
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Measure the text dimensions
    const textWidth = ctx.measureText(text).width;
    const textHeight = 50; // Set text height

    // Calculate text position for centering
    const textX = (canvasWidth - textWidth) / 2;
    const textY = (canvasHeight + textHeight) / 2;

    // Draw the text on the white background canvas
    ctx.font = `500 50px ${selectedFont}`; // Set font style
    ctx.fillStyle = '#000000'; // Set text color to black
    ctx.fillText(text, textX, textY); // Draw text

    // Convert canvas to data URL and set as download link
    setTextDownloadUrl(canvas.toDataURL('image/png'));

  };

  const handleDrawingDownload = () => {
    if (canvasRef.current && canvasRef.current.canvasContainer.children[1]) {
      // Get the drawing data URL from CanvasDraw component
      const canvas = canvasRef.current.canvasContainer.children[1].children[0];

      // Create a canvas with white background and draw the drawing onto it
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const whiteBackgroundCanvas = document.createElement('canvas');
      whiteBackgroundCanvas.width = canvasWidth;
      whiteBackgroundCanvas.height = canvasHeight;
      const ctx = whiteBackgroundCanvas.getContext('2d');
      ctx.fillStyle = '#ffffff'; // Set white background
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Calculate drawing position for centering
      const drawingX = (canvasWidth - canvas.width) / 2;
      const drawingY = (canvasHeight - canvas.height) / 2;

      // Draw the drawing onto the white background canvas
      ctx.drawImage(canvas, drawingX, drawingY);

      // Convert canvas to data URL and set as download link
      setDrawingDownloadUrl(whiteBackgroundCanvas.toDataURL('image/png'));
    }
  };

  return (
    <div className='m-5 max-h-screen flex flex-col items-center'>
      <p className='text-4xl font-semibold my-3'>Create Personalized Signature</p>
      <div className='m-5 space-x-5'>
        <label className='bg-gray-200 px-4 py-2 rounded-full cursor-pointer'>
          <input
            type="radio"
            value="text"
            checked={option === 'text'}
            onChange={handleOptionChange}
            className='mr-2'
          />
          Type Name
        </label>
        <label className='bg-gray-200 px-4 py-2 rounded-full cursor-pointer'>
          <input
            type="radio"
            value="draw"
            checked={option === 'draw'}
            onChange={handleOptionChange}
            className='mr-2'
          />
          Draw Sign
        </label>
      </div>
      {option === 'text' ? (
        <InputName handleTextDownload={handleTextDownload} showTextDownloadButton={showTextDownloadButton} setTextDownloadUrl={setTextDownloadUrl} setShowTextDownloadButton={setShowTextDownloadButton} selectedFont={selectedFont} setSelectedFont={setSelectedFont} text={text} setText={setText} />
      ) : (
        <DrawName handleDrawingDownload={handleDrawingDownload} setDrawingDownloadUrl={setDrawingDownloadUrl} showDrawingDownloadButton={showDrawingDownloadButton} canvasRef={canvasRef} drawing={drawing} setDrawing={setDrawing} />
      )}
      {textDownloadUrl && (
        <a href={textDownloadUrl} download="Sign.png" className='px-3 py-1 m-3 bg-green-500 rounded-2xl hover:bg-green-600 text-white'>
          Download
        </a>
      )}
      {drawingDownloadUrl && (
        <a href={drawingDownloadUrl} download="Sign.png" className='px-3 py-1 bg-green-500 rounded-2xl hover:bg-green-600 text-white'>
          Download
        </a>
      )}
    </div>
  );
};

export default SignCreator;
