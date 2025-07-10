import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ListsPage = () => {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        projectname:"",
        projectgenre:"",
    })
    const [projects, setProjects] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const fetchProjects = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/project/getProjects", { withCredentials: true });
            setProjects(response.data?.projects);
            console.log("Projects fetched successfully.");
        } catch (error) {
            console.log("Error in fetching projects.", error.response?.data);
        }
    }

    const handleDeletion = async (id) => {
        try {
            const response = await axios.delete("http://localhost:3000/api/project/deleteProject",{data: {id},withCredentials:true});
            toast.success("A project deleted successfully.");
            fetchProjects();
        } catch (error) {
            toast.error(error.response?.data?.error);
        }
    }

    const handleCreate = async(e) =>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/project/create",formData,{withCredentials:true});
            console.log("Creation successful:", response.data);
            toast.success("A project created successfully.")
            setIsPopupOpen(false);
            fetchProjects();
        } catch (error) {
             toast.error(error.response?.data?.error);
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await fetchProjects();
        }
        fetch();
    }, []);

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
                {
                projects.length != 0 ? 
                      projects.map((project) => (
                    <div className='bg-stone-800 flex flex-col gap-4 p-8 w-[80vw] md:w-[40vw] h-[80vh] min-h-140 md:h-[60vh] rounded-xl' key={project._id}>
                        <figure className='bg-red-300 w-full h-[80%] rounded-xl relative'>
                            <div className='bg-linear-to-b from-transparent to-teal-950 w-full h-full absolute top-0'></div>
                            <img src="/personPhotifier.png" alt="thumbnail" className='w-full h-full object-cover' />

                        </figure>
                        <div className='w-full flex flex-col md:flex-row md:justify-between justify-center items-center gap-4'>
                            <Trash2 className='text-red-400 text-center h-full cursor-pointer hover hover:text-stone-700 transition-all duration-500' onClick={()=>{handleDeletion(project._id)}} />
                            <div className='bg-linear-to-l from-stone-900 to-amber-800 rounded-xl text-center text-white w-[70%] md:w-110 h-full py-2 text-md tracking-widest'>{project.projectname}</div>
                            <Pencil className='text-green-400 text-center h-full cursor-pointer hover:text-stone-700 transition-all duration-500' />
                        </div>
                    </div>
                )) : <div className='text-white w-full p-8 flex justify-center items-center text-center'>No projects found.</div>
                }
               
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
                        <form onSubmit={handleCreate} className='flex flex-col items-center gap-6'>
                            <input type="text" onChange={(e)=>setFormData((prev)=>({...prev,projectname:e.target.value}))} placeholder='Enter Project Name' name="" id="" className='p-3 outline-none' />
                            <input type="text" onChange={(e)=>setFormData((prev)=>({...prev,projectgenre:e.target.value}))} placeholder='Enter Project Genre' name="" id="" className='p-3 outline-none' />
                            <button className='p-2 bg-teal-300 text-black hover:bg-amber-200 cursor-pointer transition-all duration-500 tracking-wider rounded-xl' type='submit'>Create</button>
                            <button onClick={() => setIsPopupOpen(false)} className='p-2 bg-red-400 text-black hover:bg-red-200 cursor-pointer transition-all duration-500 tracking-wider rounded-xl'>Cancel</button>
                        </form>

                    </div>



                </>
            )}

        </>


    )
}

export default ListsPage