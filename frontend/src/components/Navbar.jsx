import { Aperture } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className='w-[100vw] h-[10vh] bg-teal-950 flex justify-between items-center px-4 md:px-8 xl:px-12 2xl:px-16'>
        <div id="left" className='flex gap-2'>
            <Aperture className='text-amber-400' size={30}/>
            <span className='tracking-widest font-bold text-xl text-white'>PHO<span className='text-amber-400'>TI</span>FIER<span className='text-amber-400'>.</span></span>
        </div>
        <div id="right">
            <ul className='text-white hidden md:flex gap-6 justify-center items-center'>
                <li className='hover:text-amber-600 cursor-pointer tracking-widest'>HOME</li>
                <li className='hover:text-amber-600 cursor-pointer tracking-widest'>ABOUT</li>
                <li><button className='bg-linear-to-br from-amber-500 to-teal-600 text-white py-2 px-4 rounded-md hover:bg-linear-to-tl cursor-pointer transition-all duration-5000 ease-in-out'>SignUp</button></li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
