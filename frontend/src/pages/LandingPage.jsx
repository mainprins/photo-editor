import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className='bg-teal-950 flex w-[100vw] h-[100vh] text-white'>
        <div id="left" className='flex flex-col gap-[2vh] md:w-1/2 justify-center h-full px-15'>
            <div id="top">
                <h1 className='text-xl md:text-4xl tracking-wider font-semibold md:w-[20vw]'>Create your own version of the image.</h1>
            </div>
            <p className='md:w-[30vw] wrap text-md'>Edit your photos effortlessly with our powerful and easy-to-use online photo editor.</p>
            <Link to={'/lists'}><button className='bg-amber-700 text-white py-2 md:w-[20%] rounded-md hover:bg-teal-600 cursor-pointer transition-colors duration-700'>Your Projects</button></Link>
        </div>
        <div id="right" className='hidden md:flex justify-center items-center md:w-1/2 h-full'>
           <figure className=" bg-linear-to-br from-teal-500 to-amber-500 w-[30vw] h-[30vw] rounded-t-full relative">
             <img src="/personPhotifier.png" alt="PersonLiking" className="object-contain w-full h-full scale-x-[-1]" />
             <div className="backdrop-blur-3xl rounded-md absolute top-15 -left-10 w-[10vw] p-4 flex gap-4 flex-col text-black h-[25vh]">
                <h4>Adjustments</h4>
                <div className="flex w-[70%] justify-between">
                      <span className="text-xs">Brightness</span>
                      <div className="w-[1vw] h-[2vh] rounded-full bg-linear-to-r from-black to-white"></div>
                </div>
              
                <div className="w-[70%] h-[0.3vh] rounded-md bg-linear-to-r from-black to-white relative">
                    <div className="rounded-full absolute ring-1 ring-gray-700 -top-2 right-10 w-[1vw] h-[2vh]"></div>
                </div>
                <div className="flex w-[70%] justify-between">
                      <span className="text-xs">Hue</span>
                      <div className="w-[1vw] h-[2vh] rounded-full bg-linear-to-r from-yellow-400 to-green-500"></div>
                </div>
              
                <div className="w-[70%] h-[0.3vh] rounded-md bg-linear-to-r from-black to-white relative">
                    <div className="rounded-full absolute ring-1 ring-gray-700 -top-2 right-10 w-[1vw] h-[2vh]"></div>
                </div>
             </div>
             <div className="bg-teal-500 w-[4vw] h-[8vh] rounded-full absolute bottom-10 -left-10"></div>
             <div className="bg-amber-300 w-[4vw] h-[8vh] rounded-full absolute bottom-80 -right-3"></div>
           </figure>
           
        </div>
    </div>
  )
}

export default LandingPage