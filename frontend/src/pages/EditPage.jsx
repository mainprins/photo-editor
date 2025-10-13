import { useEffect, useRef, useState } from 'react'
import { Canvas, CircleBrush, FabricImage, FabricText, filters, PatternBrush, PencilBrush, SprayBrush, StaticCanvas } from "fabric"
import { Brush, Contrast, Crop, Download, Droplets, EyeOff, Gem, Image, ImagePlus, Layers2, Sparkles, Sun, Trash, Type } from 'lucide-react';
import toast from "react-hot-toast"
import ReactCrop from 'react-image-crop';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditPage = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [textColor, setTextColor] = useState("#000");
  const [activeBeforeCrop, setActiveBeforeCrop] = useState(null);
  const [isEligible, setIsEligible] = useState(false);
  const [chooseText, setChooseText] = useState(false);
  const [chooseBrush, setChooseBrush] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({
    unit: 'px',
    x: 0,
    y: 0,
    width: 100,
    height: 100
  });
  const [croppingImageSrc, setCroppingImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const cropImageRef = useRef(null);
  const [brush, setBrush] = useState(null);
  const [chooseFilter, setChooseFilter] = useState(false);
  const [brushColor, setBrushColor] = useState('#000');
  const [brushWidth, setBrushWidth] = useState(1);
  const [chooseImage, setChooseImage] = useState(false);
  const [addedImageFile, setAddedImageFile] = useState(null);
  const [objects, setObjects] = useState([]);
  const [chooseLayer, setChooseLayer] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [addedText, setAddedText] = useState("#fff")
  const [layers, setLayers] = useState([]);
  const canvasRef = useRef(null);

  const initCanvas = () => {
    if (canvasRef.current && isEligible) {

      const mycanvas = new Canvas(canvasRef.current, {
        width: 1000,
        height: 1000,
      });

      mycanvas.backgroundColor = '#002728';
      mycanvas.renderAll();
      setCanvas(mycanvas);
    } else {
      setCanvas(null);
    }
  }

  const clearAll = () => {
    canvas.remove(...canvas.getObjects());
  }

  useEffect(() => {
    if (canvas) {
      canvas.on("object:added", updateLayers);
      canvas.on("object:removed", updateLayers);
      canvas.on("object:modified", updateLayers);

      updateLayers();
    }

  }, [canvas])

  useEffect(() => {
    if (projectData) {
      setIsEligible(true);
    }
  }, [projectData])

  useEffect(() => {
    if (canvas && projectData) {
      canvas.loadFromJSON(projectData, () => {
        setTimeout(() => {
          canvas.renderAll();
          console.log("Project Loaded into canvas successfully.")
        }, 50);
      });
    }
  }, [projectData, canvas])
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/project/getProjects", { withCredentials: true });
        const allProjects = res.data.projects;

        const project = allProjects.find(p => p._id === id);
        if (!project) {
          console.log("Project not found");
          return;
        }

        console.log("Found project:", project);
        setProjectData(project.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };


    fetchProject();
  }, [id]);

  const updateLayers = () => {
    if (!canvas) return;
    setLayers([...canvas.getObjects()].reverse());
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.download = 'photo_editor_image.png';
    link.href = canvas.toDataURL();
    link.click();
  }



  const handleAddText = () => {
    const text = new FabricText(addedText, {
      left: 50,
      top: 50,
      fill: textColor,
      fontSize: 24,
      fontFamily: 'Arial'
    });

    canvas.add(text);
    canvas.centerObject(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    setChooseText(false);
  }

  const handleAddImage = (e) => {

    const file = e.target.files[0];
    if (!file) return;
    setAddedImageFile(file);
    setChooseImage(false);
  }


  useEffect(() => {
    initCanvas();
  }, [isEligible]);

  const saveProject = async () => {
    try {
      const json = canvas.toJSON();

      const res = await axios.post("http://localhost:3000/api/project/save", {
        id: id,
        data: json,
      }, { withCredentials: true });

      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error while saving the project");
    }
  };


  useEffect(() => {
    if (canvas && addedImageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(addedImageFile);
      reader.onload = (ev) => {
        const imageUrl = ev.target.result;
        const imageElem = document.createElement("img");
        imageElem.src = imageUrl;
        imageElem.onload = function () {
          const image = new FabricImage(imageElem);
          canvas.add(image);
          canvas.centerObject(image);
          canvas.setActiveObject(image);
          canvas.renderAll();
        };
      };
    }
  }, [canvas, addedImageFile]);

  useEffect(() => {
    if (!canvas) return;

    if (isCropping) {
      setActiveBeforeCrop(canvas.getActiveObject());

      canvas.selection = false;
      canvas.forEachObject(obj => {
        obj.selectable = false;
        obj.evented = false;
      });

      if (canvas.getActiveObject()) {
        canvas.setActiveObject(canvas.getActiveObject());
      }

    } else {
      canvas.selection = true;
      canvas.forEachObject(obj => {
        obj.selectable = true;
        obj.evented = true;
      });

    }
  }, [isCropping, canvas]);


  useEffect(() => {
    if (canvas) {
      const handleKeyDown = (e) => {
        if (e.key === "Delete" || e.key === "Backspace") {
          const activeObject = canvas.getActiveObject();
          if (activeObject) {
            canvas.remove(activeObject);
            canvas.discardActiveObject();
            canvas.requestRenderAll();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [canvas]);

  useEffect(() => {
    if (isCropping && canvas) {
      const activeObj = canvas.getActiveObject();
      if (activeObj && activeObj.type === "image") {
        setCroppingImageSrc(activeObj.getSrc());

      }
    }
  }, [isCropping, canvas]);


  const handleImageUpload = (e) => {
    setIsEligible(true);
    const file = e.target.files[0];
    if (!file) return;
    setAddedImageFile(file);
  };

  return (
    <div className='w-[100vw] h-[100vh] overflow-hidden flex flex-col md:flex-row pt-[10vh]'>
      <div id='left' className='bg-teal-100 md:w-[15vw] w-[100vw] h-max  md:h-[90vh] p-3 flex flex-wrap flex-row md:flex-col gap-3'>
        <div className='flex bg-teal-800 text-white hover:bg-teal-950 cursor-pointer transition-all duration-500 w-[20vw] md:w-[90%] justify-around rounded-xl p-3' onClick={() => { isEligible && setChooseText(true) }}><Type className='bg-teal-500 rounded-full p-1' /><span className='hidden md:block'>Add Text</span></div>
        <div className='flex bg-teal-800 text-white hover:bg-teal-950 cursor-pointer transition-all duration-500 w-[20vw] md:w-[90%] justify-around rounded-xl p-3' onClick={() => { isEligible && setChooseFilter(true) }}><Sparkles className='bg-teal-500 rounded-full p-1' /><span className='hidden md:block'>Add Filters</span></div>
        <div className='flex bg-teal-800 text-white hover:bg-teal-950 cursor-pointer transition-all duration-500 w-[20vw] md:w-[90%] justify-around rounded-xl p-3' onClick={() => { isEligible && setChooseBrush(true) }}><Brush className='bg-teal-500 rounded-full p-1' /><span className='hidden md:block'>Brushes</span></div>
        <div className='flex bg-teal-800 text-white hover:bg-teal-950 cursor-pointer transition-all duration-500 w-[20vw] md:w-[90%] justify-around rounded-xl p-3' onClick={() => { isEligible && setChooseImage(true) }}><Image className='bg-teal-500 rounded-full p-1' /><span className='hidden md:block'>Add Image</span></div>
        <div
          className='flex bg-teal-800 text-white hover:bg-teal-950 cursor-pointer transition-all duration-500 w-[20vw] md:w-[90%] justify-around rounded-xl p-3'
          onClick={() => {
            if (canvas) {
              const activeObj = canvas.getActiveObject();
              if (activeObj && activeObj.type === "image") {
                setIsCropping(true);
              } else {
                toast.error("Select an image to crop");
              }
            }
          }}

        >
          <Crop className='bg-teal-500 rounded-full p-1' />
          <span className='hidden md:block'>Crop Image</span>
        </div>

        <div className='flex bg-teal-800 text-white hover:bg-teal-950 cursor-pointer transition-all duration-500 w-[20vw] md:w-[90%] justify-around rounded-xl p-3' onClick={() => { isEligible && setChooseLayer(true) }}><Layers2 className='bg-teal-500 rounded-full p-1' /><span className='hidden md:block'>Adjust Layers</span></div>
        <div className='flex bg-teal-800 text-white hover:bg-teal-950 cursor-pointer transition-all duration-500 w-[20vw] md:w-[90%] justify-around rounded-xl p-3' onClick={() => { clearAll() }}><Trash className='bg-teal-500 rounded-full p-1' /><span className='hidden md:block'>Clear All</span></div>
        <div className='flex bg-teal-800 text-white hover:bg-teal-950 cursor-pointer transition-all duration-500 w-[20vw] md:w-[90%] justify-around rounded-xl p-3' onClick={() => { downloadImage() }}><Download className='bg-teal-500 rounded-full p-1' /><span className='hidden md:block'>Save Image</span></div>
        <div className='flex bg-teal-800 text-white hover:bg-teal-950 cursor-pointer transition-all duration-500 w-[20vw] md:w-[90%] justify-around rounded-xl p-3' onClick={() => { saveProject() }}><Download className='bg-teal-500 rounded-full p-1' /><span className='hidden md:block'>Save Project</span></div>


      </div>
      <div id="right" className='w-[100vw] overflow-scroll h-auto flex relative items-center justify-center'>
        {isEligible ? <canvas ref={canvasRef} className='w-auto h-full' /> :
          <form>
            <label className='p-4 flex bg-teal-600 rounded-xl gap-3 hover:bg-teal-800 cursor-pointer transition-all duration-500'>
              <input type="file" accept='image/*' onChange={handleImageUpload} className='hidden' name="" id="" />
              <div><ImagePlus /></div>
              <span>Upload Image</span>
            </label>
          </form>}

      </div>
      {chooseText && (
        <div className='fixed min-w-100 md:min-w-150 min-h-100 bg-linear-to-bl from-black to-teal-950 top-50 sm:left-20 md:left-140 rounded-xl flex flex-col gap-6 justify-center items-center'>
          <span className='text-white font-bold tracking-widest text-xl md:text-3xl'>Add Text</span>
          <input type="text" className='min-w-10 min-h-10 bg-stone-700 rounded-xl p-3 outline-0 text-white' placeholder='Enter the text' onChange={(e) => { setAddedText(e.target.value) }} />
          <input type="color" value={textColor} onChange={(e) => { setTextColor(e.target.value) }} />
          <button className='p-3 bg-teal-500 min-w-20 hover:bg-black hover:ring-1 hover:ring-teal-500 text-white rounded-xl transition-all duration-500 cursor-pointer' onClick={handleAddText}>Add</button>
          <button className='p-3 hover:bg-teal-500 min-w-20 bg-black ring-1 ring-teal-500 text-white rounded-xl transition-all duration-500 cursor-pointer' onClick={() => { setChooseText(false) }}>Cancel</button>
        </div>
      )}

      {chooseImage && (
        <div className='fixed min-w-100 md:min-w-150 min-h-100 bg-linear-to-bl from-black to-teal-950 top-50 sm:left-20 md:left-140 rounded-xl flex flex-col gap-6 justify-center items-center'>
          <span className='text-white font-bold tracking-widest text-xl md:text-3xl'>Add Image</span>
          <label className='p-4 flex bg-teal-600 rounded-xl gap-3 hover:bg-teal-800 cursor-pointer transition-all duration-500'>
            <input type="file" accept='image/*' onChange={handleAddImage} className='hidden' name="" id="" />
            <div><ImagePlus /></div>
            <span>Upload Image</span>
          </label>
          <button className='p-3 hover:bg-teal-500 min-w-20 bg-black ring-1 ring-teal-500 text-white rounded-xl transition-all duration-500 cursor-pointer' onClick={() => { setChooseImage(false) }}>Cancel</button>

        </div>
      )}

      {chooseBrush && (
        <div className='fixed min-w-100 md:min-w-150 min-h-100 bg-gradient-to-bl from-black to-teal-950 top-50 sm:left-20 md:left-140 rounded-xl flex flex-col gap-6 justify-center items-center p-6'>
          <span className='text-white font-bold tracking-widest text-xl md:text-3xl'>Brush Settings</span>

          <div className="flex gap-3 items-center">
            <span className="text-white">Color:</span>
            <input
              type="color"
              value={brushColor}
              onChange={(e) => {
                if (canvas) {
                  setBrushColor(e.target.value);
                }
              }}
            />
          </div>

          {/* Brush Size */}
          <div className="flex gap-3 items-center">
            <span className="text-white">Size:</span>
            <input
              type="range"
              min="1"
              max="50"
              value={brushWidth}
              onChange={(e) => {
                if (canvas) {
                  setBrushWidth(e.target.value);
                }
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              className="flex flex-col items-center bg-teal-600 p-3 rounded-xl hover:bg-teal-800 text-white transition-all"
              onClick={() => {
                if (canvas) {
                  canvas.isDrawingMode = true;
                  const pencilbrush = new PencilBrush(canvas);
                  setBrush(pencilbrush);
                }
              }}
            >
              <Brush />
              <span>Pencil</span>
            </button>

            <button
              className="flex flex-col items-center bg-teal-600 p-3 rounded-xl hover:bg-teal-800 text-white transition-all"
              onClick={() => {
                if (canvas) {
                  canvas.isDrawingMode = true;
                  const circlebrush = new CircleBrush(canvas);
                  setBrush(circlebrush)
                }
              }}
            >
              <Sparkles />
              <span>Circle</span>
            </button>

            <button
              className="flex flex-col items-center bg-teal-600 p-3 rounded-xl hover:bg-teal-800 text-white transition-all"
              onClick={() => {
                if (canvas) {
                  canvas.isDrawingMode = true;
                  const spraybrush = new SprayBrush(canvas);
                  setBrush(spraybrush)
                }
              }}
            >
              <Sun />
              <span>Spray</span>
            </button>

            <button
              className="flex flex-col items-center bg-teal-600 p-3 rounded-xl hover:bg-teal-800 text-white transition-all"
              onClick={() => {
                if (canvas) {
                  canvas.isDrawingMode = true;
                  const patternbrush = new PatternBrush(canvas);
                  setBrush(patternbrush);
                }
              }}
            >
              <Gem />
              <span>Pattern</span>
            </button>
          </div>

          <div className="flex gap-4 mt-6">

            <button
              className="p-3 bg-teal-500 min-w-20 hover:bg-black hover:ring-1 hover:ring-teal-500 text-white rounded-xl transition-all"
              onClick={() => {
                if (canvas && brush) {
                  brush.color = brushColor;
                  brush.width = brushWidth;
                  canvas.freeDrawingBrush = brush
                  setChooseBrush(false);
                } else {
                  toast.error("Please choose the brush type.");
                }
              }}
            >
              Done
            </button>
            <button
              className="p-3 bg-teal-500 min-w-20 hover:bg-black hover:ring-1 hover:ring-teal-500 text-white rounded-xl transition-all"
              onClick={() => {
                if (canvas) canvas.isDrawingMode = false;
                setChooseBrush(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {chooseFilter && (
        <div className='fixed min-w-100 md:min-w-150 min-h-100 bg-gradient-to-bl from-black to-teal-950 top-50 sm:left-20 md:left-140 md left-50:md:left-140 rounded-xl flex flex-col gap-6 justify-center items-center p-6'>
          <span className='text-white font-bold tracking-widest text-xl md:text-3xl'>Image Filters</span>

          <div className="grid grid-cols-2 gap-4">
            <button
              className="flex flex-col items-center bg-teal-600 p-3 rounded-xl hover:bg-teal-800 text-white transition-all"
              onClick={() => {
                if (!canvas) return;
                const obj = canvas.getActiveObject();
                if (obj && obj.type === "image") {
                  obj.filters.push(new filters.Grayscale());
                  obj.applyFilters();
                  canvas.renderAll();
                } else {
                  toast.error("Select an image to apply filter");
                }
              }}
            >
              <EyeOff />
              <span>Grayscale</span>
            </button>

            <button
              className="flex flex-col items-center bg-teal-600 p-3 rounded-xl hover:bg-teal-800 text-white transition-all"
              onClick={() => {
                if (!canvas) return;
                const obj = canvas.getActiveObject();
                if (obj && obj.type === "image") {
                  obj.filters.push(new filters.Sepia());
                  obj.applyFilters();
                  canvas.renderAll();
                } else {
                  toast.error("Select an image to apply filter");
                }
              }}
            >
              <Sun />
              <span>Sepia</span>
            </button>

            <button
              className="flex flex-col items-center bg-teal-600 p-3 rounded-xl hover:bg-teal-800 text-white transition-all"
              onClick={() => {
                if (!canvas) return;
                const obj = canvas.getActiveObject();
                if (obj && obj.type === "image") {
                  obj.filters.push(new filters.Invert());
                  obj.applyFilters();
                  canvas.renderAll();
                } else {
                  toast.error("Select an image to apply filter");
                }
              }}
            >
              <Contrast />
              <span>Invert</span>
            </button>

            <button
              className="flex flex-col items-center bg-teal-600 p-3 rounded-xl hover:bg-teal-800 text-white transition-all"
              onClick={() => {
                if (!canvas) return;
                const obj = canvas.getActiveObject();
                if (obj && obj.type === "image") {
                  obj.filters.push(new filters.Brightness({ brightness: 0.1 }));
                  obj.applyFilters();
                  canvas.renderAll();
                } else {
                  toast.error("Select an image to apply filter");
                }
              }}
            >
              <Droplets />
              <span>Brightness</span>
            </button>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              className="p-3 bg-teal-500 min-w-20 hover:bg-black hover:ring-1 hover:ring-teal-500 text-white rounded-xl transition-all"
              onClick={() => {
                if (!canvas) return;
                const obj = canvas.getActiveObject();
                if (obj && obj.type === "image") {
                  obj.filters = [];
                  obj.applyFilters();
                  canvas.renderAll();
                  toast.success("Filters cleared!");
                }
                setChooseFilter(false);
              }}
            >
              Clear Filters
            </button>

            <button
              className="p-3 bg-teal-500 min-w-20 hover:bg-black hover:ring-1 hover:ring-teal-500 text-white rounded-xl transition-all"
              onClick={() => {
                setChooseFilter(false);
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}



      {chooseLayer && (
        <div className='fixed min-w-100 md:min-w-150 min-h-100 bg-linear-to-bl from-black to-teal-950 top-50 sm:left-20 md:left-140 rounded-xl flex flex-col gap-6 justify-center items-center'>
          {layers.map((obj, index) => (
            <div key={index} className='flex gap-3 w-full justify-center items-center'>
              <span className='text-white'>Layer {index + 1} ({obj.type})</span>
              <button className='p-1 hover:ring-teal-500 min-w-20 hover:bg-black hover:ring-1 bg-teal-500 text-white rounded-xl transition-all duration-500 cursor-pointer' onClick={() => { setChooseImage(false); canvas.bringToFront(obj) }}>Front</button>
              <button className='p-1 hover:ring-teal-500 min-w-20 hover:bg-black hover:ring-1 bg-teal-500 text-white rounded-xl transition-all duration-500 cursor-pointer' onClick={() => { setChooseImage(false); canvas.sendToBack(obj) }}>Back</button>
            </div>
          ))}
          <button className='p-3 hover:bg-teal-500 min-w-20 bg-black ring-1 ring-teal-500 text-white rounded-xl transition-all duration-500 cursor-pointer' onClick={() => { setChooseLayer(false) }}>Ok</button>

        </div>
      )}

      {isCropping && croppingImageSrc && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-white p-6 rounded-xl shadow-xl z-50 flex flex-col gap-4">
          <div className="max-w-[400px] max-h-[400px] overflow-hidden">
            <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={(c) => setCompletedCrop(c)}>
              <img src={croppingImageSrc} ref={cropImageRef} />
            </ReactCrop>
          </div>

          <div className="flex gap-4 justify-center mt-4">
            <button
              onClick={() => {

                if (!canvas || !cropImageRef.current || !activeBeforeCrop) return;

                const activeObj = activeBeforeCrop;
                if (!activeObj || activeObj.type !== "image") return;

                const prevLeft = activeObj.left;
                const prevTop = activeObj.top;
                const originX = activeObj.originX;
                const originY = activeObj.originY;
                const scaleX = activeObj.scaleX;
                const scaleY = activeObj.scaleY;
                const angle = activeObj.angle;


                canvas.remove(activeObj);

                const image = cropImageRef.current;


                const scaleWidth = image.naturalWidth / image.width;
                const scaleHeight = image.naturalHeight / image.height;


                const newCanvas = document.createElement("canvas");
                newCanvas.width = crop.width * scaleWidth;
                newCanvas.height = crop.height * scaleHeight;

                const ctx = newCanvas.getContext("2d");
                ctx.drawImage(
                  image,
                  crop.x * scaleWidth,
                  crop.y * scaleHeight,
                  crop.width * scaleWidth,
                  crop.height * scaleHeight,
                  0,
                  0,
                  crop.width * scaleWidth,
                  crop.height * scaleHeight
                );

                const img = new FabricImage(newCanvas);

                img.set({
                  left: prevLeft,
                  top: prevTop,
                  originX,
                  originY,
                  scaleX,
                  scaleY,
                  angle
                });

                canvas.add(img);
                canvas.setActiveObject(img);
                canvas.requestRenderAll();

                setIsCropping(false);
              }}

            >
              Crop & Apply
            </button>




            <button
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-800"
              onClick={() => {
                setIsCropping(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}



    </div>
  )
}

export default EditPage