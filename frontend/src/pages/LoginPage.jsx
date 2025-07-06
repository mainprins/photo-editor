import { useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import toast from "react-hot-toast";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', formData, { withCredentials: true });
      console.log("Login successful:", response.data);
      toast.success(response.data?.message);
    } catch (error) {
      console.error("Login failed:", error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error);
    }
  }
  return (
    <div className='w-[100vw] h-[100vh] min-h-100 flex justify-center items-center'>
      <form className='bg-linear-to-bl flex flex-col justify-center gap-6 items-center from-amber-300 to-teal-400 w-[80%] md:w-[50%] md:h-[70%] h-[80%] min-h-85 rounded-xl' onSubmit={handleSubmit}>
        <h1 className='bg-linear-to-br from-teal-900 to-amber-900 bg-clip-text text-transparent font-bold text-3xl tracking widest '>WELCOME BACK</h1>
        <input type="email" name="email" onChange={(e) => { setFormData((prev) => ({ ...prev, email: e.target.value })) }} placeholder='Enter your email' className='w-[60%] p-3 outline-none rounded-xl bg-teal-950 text-white' />
        <input type="password" name="password" onChange={(e) => { setFormData((prev) => ({ ...prev, password: e.target.value })) }} placeholder='Enter your password' className='w-[60%] p-3 outline-none rounded-xl bg-teal-950 text-white' />
        <button className='py-3 px-6 bg-teal-700 cursor-pointer text-white rounded-xl hover:bg-amber-700 transition-all duration-500' type="submit">Login</button>
        <span className="text-sm">Don't have an account? <Link to={'/signup'}><span className='underline text-amber-900 cursor-pointer hover:text-gray-700'>SignUp</span></Link></span>
      </form>
    </div>
  )
}

export default LoginPage