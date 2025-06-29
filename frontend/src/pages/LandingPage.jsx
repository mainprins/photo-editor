import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className='bg-teal-950 flex flex-col md:flex-row w-[100vw] h-[100vh] text-white'>
        
        <div id="right" className='flex justify-center items-center md:w-1/2 pt-12 xl:pt-0 h-[60vh] md:h-full'>
           <figure className=" bg-linear-to-br from-teal-500 to-amber-500 w-[60vw] h-[40vh] xl:h-[60vh] xl:w-[30vw] sm:h-[40vh] sm:w-[40vw] rounded-t-full relative">
             <img src="/personPhotifier.png" alt="PersonLiking" className="object-contain w-full h-full scale-x-[-1]" />
             <div className="hidden xl:flex backdrop-blur-3xl rounded-md absolute top-15 -left-16 w-[15vw] p-4 gap-4 flex-col text-white h-[25vh]">
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
             <div className="hidden md:block bg-teal-500 w-[4vw] xl:w-[3vw] h-[4vh] rounded-full absolute bottom-15 -left-6 "></div>
             <div className="hidden md:block bg-amber-300 w-[4vw] xl:w-[3vw]  h-[4vh] rounded-full absolute bottom-70 -right-4 xl:bottom-50"></div>
           </figure>
           
        </div>
        <div id="left" className='flex flex-col gap-[2vh] md:w-1/2 justify-center px-15'>
            <div id="top">
                <h1 className='text-xl md:text-4xl tracking-wider font-semibold md:w-[20vw]'>Create your own version of the image.</h1>
            </div>
            <p className='md:w-[30vw] wrap text-md'>Edit your photos effortlessly with our powerful and easy-to-use online photo editor.</p>
            <Link to={'/lists'}><button className='bg-amber-700 text-white py-2 px-3 md:px-6 rounded-md hover:bg-teal-600 cursor-pointer transition-colors duration-700'>Your Projects</button></Link>
        </div>
    </div>
  )
}

export default LandingPage