import { useEffect, useRef, useState } from 'react'
import { Canvas, FabricImage, FabricText, StaticCanvas } from "fabric"
import { Brush, Crop, Gem, Image, ImagePlus, Layers2, Sparkles, Sun, Type } from 'lucide-react';

const EditPage = () => {
  const [textColor,setTextColor] = useState(null);
  const [isEligible, setIsEligible] = useState(false);
  const [chooseText, setChooseText] = useState(false);
  const [chooseImage, setChooseImage] = useState(false);
  const [chooseLayer, setChooseLayer] = useState(false);
  const [addedText, setAddedText] = useState("#fff")
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  const initCanvas = () => {
    if (canvasRef.current) {
      console.log("Hello");

      const mycanvas = new Canvas(canvasRef.current, {
        width: canvasRef.current.parentElement.clientWidth,
        height: canvasRef.current.parentElement.clientHeight,
      });

      mycanvas.backgroundColor = '#002728';
      mycanvas.renderAll();
      fabricCanvasRef.current = mycanvas;
    }
  }

  const handleAddText = () => {
    const text = new FabricText(addedText, {
      left: 50,
      top: 50,
      fill: textColor,
      fontSize: 24,
      fontFamily: 'Arial'
    });

    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.centerObject(text);
    fabricCanvasRef.current.setActiveObject(text);
    fabricCanvasRef.current.renderAll();
    setChooseText(false);
  }

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      const imageElem = document.createElement('img');
      imageElem.src = imageUrl;
      imageElem.onload = function () {
        const image = new FabricImage(imageElem);
        fabricCanvasRef.current.add(image);
        fabricCanvasRef.current.centerObject(image);
        fabricCanvasRef.current.setActiveObject(image);
        fabricCanvasRef.renderAll();
        setChooseImage(false);
      }

    }

  }

  useEffect(() => {
    initCanvas();
  }, [isEligible]);

  const handleImageUpload = (e) => {
    setIsEligible(true);
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      const imageElem = document.createElement('img');
      imageElem.src = imageUrl;
      imageElem.onload = function () {
        const image = new FabricImage(imageElem);
        fabricCanvasRef.current.add(image);
        fabricCanvasRef.current.centerObject(image);
        fabricCanvasRef.current.setActiveObject(image);
      }

    }


  };

  return (
    <div className='w-[100vw] h-[100vh] flex pt-[10vh]'>
      <div id='left' className='bg-teal-100 w-[15vw] h-[90vh] p-3 flex flex-col gap-3'>
        <div className='flex bg-teal-800 text-white hover:bg-teal-950 cursor-pointer transition-all duration-500 w-[90%] justify-around rounded-xl p-3' onClick={() => { isEligible && setChooseText(true) }}><Type className='bg-teal-500 rounded-full p-1' /><span>Add Text</span></div>
        <div className='flex bg-teal-800 text-white hover:bg-teal-950 cursor-pointer transition-all duration-500 w-[90%] justify-around rounded-xl p-3'><Sparkles className='bg-teal-500 rounded-full p-1' /><span>Add Filters</span></div>
        <div className='flex bg-teal-800 text-white hover:bg-teal-950 cursor-pointer transition-all duration-500 w-[90%] justify-around rounded-xl p-3'><Brush className='bg-teal-500 rounded-full p-1' /><span>Brushes</span></div>
        <div className='flex bg-teal-800 text-white hover:bg-teal-950 cursor-pointer transition-all duration-500 w-[90%] justify-around rounded-xl p-3' onClick={() => { isEligible && setChooseImage(true) }}><Image className='bg-teal-500 rounded-full p-1' /><span>Add Image</span></div>
        <div className='flex bg-teal-800 text-white hover:bg-teal-950 cursor-pointer transition-all duration-500 w-[90%] justify-around rounded-xl p-3'><Crop className='bg-teal-500 rounded-full p-1' /><span>Crop Image</span></div>
        <div className='flex bg-teal-800 text-white hover:bg-teal-950 cursor-pointer transition-all duration-500 w-[90%] justify-around rounded-xl p-3' onClick={() => { isEligible && setChooseLayer(true) }}><Layers2 className='bg-teal-500 rounded-full p-1' /><span>Adjust Layers</span></div>
        <div className='flex bg-teal-800 text-white hover:bg-teal-950 cursor-pointer transition-all duration-500 w-[90%] justify-around rounded-xl p-3'><Sun className='bg-teal-500 rounded-full p-1' /><span>Adjust</span></div>
        <div className='flex bg-teal-800 text-white hover:bg-teal-950 cursor-pointer transition-all duration-500 w-[90%] justify-around rounded-xl p-3'><Gem className='bg-teal-500 rounded-full p-1' /><span>Add Graphics</span></div>
      </div>
      <div id="right" className='w-[100%] h-[90vh] flex relative items-center justify-center'>
        {isEligible ? <canvas ref={canvasRef} className='w-full h-full' /> :
          <form>
            <label className='p-4 flex bg-teal-600 rounded-xl gap-3 hover:bg-teal-800 cursor-pointer transition-all duration-500'>
              <input type="file" accept='image/*' onChange={handleImageUpload} className='hidden' name="" id="" />
              <div><ImagePlus /></div>
              <span>Upload Image</span>
            </label>
          </form>}

      </div>
      {chooseText && (
        <div className='fixed min-w-150 min-h-100 bg-linear-to-bl from-black to-teal-950 top-50 left-140 rounded-xl flex flex-col gap-6 justify-center items-center'>
          <span className='text-white font-bold tracking-widest text-3xl'>Add Text</span>
          <input type="text" className='min-w-10 min-h-10 bg-stone-700 rounded-xl p-3 outline-0 text-white' placeholder='Enter the text' onChange={(e) => { setAddedText(e.target.value) }} />
          <input type="color" onChange={(e)=>{setTextColor(e.target.value)}} />
          <button className='p-3 bg-teal-500 min-w-20 hover:bg-black hover:ring-1 hover:ring-teal-500 text-white rounded-xl transition-all duration-500 cursor-pointer' onClick={handleAddText}>Add</button>
          <button className='p-3 hover:bg-teal-500 min-w-20 bg-black ring-1 ring-teal-500 text-white rounded-xl transition-all duration-500 cursor-pointer' onClick={() => { setChooseText(false) }}>Cancel</button>
        </div>
      )}

      {chooseImage && (
        <div className='fixed min-w-150 min-h-100 bg-linear-to-bl from-black to-teal-950 top-50 left-140 rounded-xl flex flex-col gap-6 justify-center items-center'>
          <span className='text-white font-bold tracking-widest text-3xl'>Add Image</span>
          <label className='p-4 flex bg-teal-600 rounded-xl gap-3 hover:bg-teal-800 cursor-pointer transition-all duration-500'>
            <input type="file" accept='image/*' onChange={handleAddImage} className='hidden' name="" id="" />
            <div><ImagePlus /></div>
            <span>Upload Image</span>
          </label>
          <button className='p-3 hover:bg-teal-500 min-w-20 bg-black ring-1 ring-teal-500 text-white rounded-xl transition-all duration-500 cursor-pointer' onClick={() => { setChooseImage(false) }}>Cancel</button>

        </div>
      )}

      {chooseLayer && (
        <div className='fixed min-w-150 min-h-100 bg-linear-to-bl from-black to-teal-950 top-50 left-140 rounded-xl flex flex-col gap-6 justify-center items-center'>
           {fabricCanvasRef.current.getObjects().map((obj)=>(
              <div className='flex'>
                     <span className='text-white'>{obj.type}</span>
              </div>
           ))}
        </div>
      )}

    </div>
  )
}

export default EditPage