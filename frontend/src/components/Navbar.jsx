import { Aperture } from 'lucide-react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const refreshPage = ()=>{
     window.location.reload();
  }
  const handleLogout = async ()=>{
    try {
      const response = await axios.post("http://localhost:3000/api/auth/logout",{},{withCredentials:true});
      toast.success(response.data?.message);
      localStorage.setItem('auth',"false");
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error);
    }
  }
  return (

    <nav className='w-[100vw] fixed top-0 h-[10vh] min-h-15 z-30 shadow-lg bg-white/5 backdrop-blur-3xl flex justify-between items-center px-4 md:px-8 xl:px-12 2xl:px-16'>
      <div id="left" className='flex gap-2 cursor-pointer' onClick={refreshPage}>
        <Aperture className='text-amber-400' size={30} />
        <span className='tracking-widest font-bold text-xl text-white'>PHO<span className='text-amber-400'>TI</span>FIER<span className='text-amber-400'>.</span></span>
      </div>
      <div id="right">
        <ul className='text-white hidden md:flex gap-6 justify-center items-center'>
          <Link to={'/'}><li className='cursor-pointer tracking-widest hover:bg-linear-to-r hover:from-amber-400 hover:to-teal-400 hover:bg-clip-text hover:text-transparent transition-all duration-500'>HOME</li></Link>
          <li className='cursor-pointer tracking-widest hover:bg-linear-to-r hover:from-amber-400 hover:to-teal-400 hover:bg-clip-text hover:text-transparent transition-all duration-500'>ABOUT</li>
          <li><button onClick={async ()=>{localStorage.getItem('auth')=="true"?await handleLogout():navigate('/signup')}} className='bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 cursor-pointer transition-colors duration-700 ease-in-out'>{localStorage.getItem('auth')=="true"?"Logout":"signIn"}</button></li>
        </ul>
      </div>
    </nav>


  )
}

export default Navbar
