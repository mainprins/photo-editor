import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", formData, { withCredentials: true });
      console.log("Signup Successful:", response.data);
      toast.success(response.data?.message);
      localStorage.setItem('auth',"true");
      navigate('/');
    } catch (error) {
      console.error("Signup Failed",error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error);
    }

  }
  return (
    <div className='w-[100vw] h-[100vh] min-h-100 flex justify-center items-center'>
      <form className='bg-linear-to-bl flex flex-col justify-center gap-6 items-center from-amber-300 to-teal-400 w-[80%] md:w-[50%] md:h-[70%] h-[80%] min-h-85 rounded-xl' onSubmit={handleSubmit}>
        <h1 className='bg-linear-to-br from-teal-900 to-amber-900 bg-clip-text text-transparent font-bold text-3xl tracking widest '>CREATE AN ACCOUNT</h1>
        <input type="text" onChange={(e) => { setFormData((prev) => ({ ...prev, fullname: e.target.value })) }} placeholder='Enter your fullname' className='w-[60%] p-3 outline-none rounded-xl bg-teal-950 text-white' />
        <input type="email" onChange={(e) => { setFormData((prev) => ({ ...prev, email: e.target.value })) }} placeholder='Enter your email' className='w-[60%] p-3 outline-none rounded-xl bg-teal-950 text-white' />
        <input type="password" onChange={(e) => { setFormData((prev) => ({ ...prev, password: e.target.value })) }} placeholder='Enter your password' className='w-[60%] p-3 outline-none rounded-xl bg-teal-950 text-white' />
        <button className='py-3 px-6 bg-teal-700 cursor-pointer text-white rounded-xl hover:bg-amber-700 transition-all duration-500'>SignUp</button>
        <span className="text-sm">Already have an account? <Link to={'/login'}><span className='underline text-amber-900 cursor-pointer hover:text-gray-700'>LogIn</span></Link></span>
      </form>
    </div>
  )
}

export default SignupPage