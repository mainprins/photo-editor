import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

const ListsPage = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            <div className={`bg-teal-950 w-[100vw] min-h-80 h-[50vh] ${isPopupOpen ? "blur-3xl" : null}`}>
                <figure className='w-full h-full overflow-hidden relative'>
                    <img src="/colored.jpg" alt="coloredMan" className='w-[100%] h-[100%] opacity-30 object-cover' />
                    <div className='bg-linear-to-b from-transparent to-teal-950 w-[100vw] min-h-80 h-[50vh] absolute top-0'></div>
                    <h1 className='absolute bg-linear-to-r from-amber-400 to-teal-400 text-transparent bg-clip-text top-45 left-[28vw] font-bold text-4xl md:text-7xl tracking-widest'>YOUR PROJECTS.</h1>
                </figure>
            </div>
            <div className={`bg-teal-950 ${isPopupOpen ? "blur-3xl" : null} w-[100vw] flex flex-wrap gap-4 justify-center p-8`}>
                <div className='bg-stone-800 flex flex-col gap-4 p-8 w-[80vw] md:w-[40vw] h-[80vh] min-h-140 md:h-[60vh] rounded-xl'>
                    <figure className='bg-red-300 w-full h-[80%] rounded-xl relative'>
                        <div className='bg-linear-to-b from-transparent to-teal-950 w-full h-full absolute top-0'></div>
                        <img src="/personPhotifier.png" alt="thumbnail" className='w-full h-full object-cover' />

                    </figure>
                    <div className='w-full flex flex-col md:flex-row md:justify-between justify-center items-center gap-4'>
                        <Trash2 className='text-red-400 text-center h-full cursor-pointer hover hover:text-stone-700 transition-all duration-500' />
                        <div className='bg-linear-to-l from-stone-900 to-amber-800 rounded-xl text-center text-white w-[70%] md:w-110 h-full py-2 text-md tracking-widest'>Untitled Project</div>
                        <Pencil className='text-green-400 text-center h-full cursor-pointer hover:text-stone-700 transition-all duration-500' />
                    </div>
                </div>
                <div className='bg-stone-800 flex flex-col gap-4 p-8 w-[80vw] md:w-[40vw] h-[80vh] min-h-140 md:h-[60vh] rounded-xl'>
                    <figure className='bg-red-300 w-full h-[80%] rounded-xl relative'>
                        <div className='bg-linear-to-b from-transparent to-teal-950 w-full h-full absolute top-0'></div>
                        <img src="/personPhotifier.png" alt="thumbnail" className='w-full h-full object-cover' />

                    </figure>
                    <div className='w-full flex flex-col md:flex-row md:justify-between justify-center items-center gap-4'>
                        <Trash2 className='text-red-400 text-center h-full cursor-pointer hover hover:text-stone-700 transition-all duration-500' />
                        <div className='bg-linear-to-l from-stone-900 to-amber-800 rounded-xl text-center text-white w-[70%] md:w-110 h-full py-2 text-md tracking-widest'>Untitled Project</div>
                        <Pencil className='text-green-400 text-center h-full cursor-pointer hover:text-stone-700 transition-all duration-500' />
                    </div>
                </div>
            </div>
            <div className={`w-full flex gap-2 justify-center items-center pb-4 ${isPopupOpen ? "blur-3xl" : null}`}>

                <button onClick={() => setIsPopupOpen(true)} className={` ${isPopupOpen ? "disabled" : null} flex gap-2 bg-amber-700 text-white rounded-xl p-4 cursor-pointer hover:bg-teal-900 transition-colors duration-500`}>
                    <div className='w-[2vw] h-[4vh] rounded-full bg-stone-700 hidden md:flex items-center justify-center'><Plus /></div>
                    <span className='tracking-wider'>Create New</span>
                </button>
            </div>
            {isPopupOpen && (
                <>
                    <div className='fixed top-50 bg-black w-[80vw] min-h-90 h-[60vh] md:h-[60vh] flex flex-col gap-6 justify-center items-center left-10 md:left-30 rounded-xl p-8 text-white'>
                        <h1 className='bg-linear-to-r text-center from-amber-400 to-teal-400 text-transparent bg-clip-text font-bold text-4xl tracking-widest'>Create New Project</h1>
                        <form action="" className='flex flex-col items-center gap-6'>
                            <input type="text" placeholder='Enter Project Name' name="" id="" className='p-3 outline-none' />
                            <input type="text" placeholder='Enter Project Genre' name="" id="" className='p-3 outline-none' />
                            <button className='p-2 bg-teal-300 text-black hover:bg-amber-200 cursor-pointer transition-all duration-500 tracking-wider rounded-xl'>Create</button>
                            <button onClick={()=> setIsPopupOpen(false)} className='p-2 bg-red-400 text-black hover:bg-red-200 cursor-pointer transition-all duration-500 tracking-wider rounded-xl'>Cancel</button>
                        </form>
                         
                    </div>
                  


                </>
            )}

        </>


    )
}

export default ListsPage