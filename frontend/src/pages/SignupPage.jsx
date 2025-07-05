import { Link } from "react-router-dom"

const SignupPage = () => {
  
     return (
    <div className='w-[100vw] h-[100vh] min-h-100 flex justify-center items-center'>
        <form action="" className='bg-linear-to-bl flex flex-col justify-center gap-6 items-center from-amber-300 to-teal-400 w-[80%] md:w-[50%] md:h-[70%] h-[80%] min-h-85 rounded-xl'>
            <h1 className='bg-linear-to-br from-teal-900 to-amber-900 bg-clip-text text-transparent font-bold text-3xl tracking widest '>CREATE AN ACCOUNT</h1>
             <input type="text" placeholder='Enter your fullname' className='w-[60%] p-3 outline-none rounded-xl bg-teal-950 text-white' />
            <input type="email" placeholder='Enter your email' className='w-[60%] p-3 outline-none rounded-xl bg-teal-950 text-white' />
            <input type="password" placeholder='Enter your password' className='w-[60%] p-3 outline-none rounded-xl bg-teal-950 text-white' />
            <button className='py-3 px-6 bg-teal-700 cursor-pointer text-white rounded-xl hover:bg-amber-700 transition-all duration-500'>SignUp</button>
            <span className="text-sm">Already have an account? <Link to={'/login'}><span className='underline text-amber-900 cursor-pointer hover:text-gray-700'>LogIn</span></Link></span>
        </form>
    </div>
  )
}

export default SignupPage