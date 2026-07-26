import React, {useState} from "react";
import Logo from "../components/Logo";
import axios from "axios"
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:3000/api/auth/login", 
            {email, password}
        );
        if (response.data.success) {
            login(response.data.user)
            localStorage.setItem("token", response.data.token)
            if(response.data.user.role === "admin") {
                navigate('/admin-dashboard')
            }else {
                navigate('/employee-dashboard')
            }
        }
        }catch(error){
            if(error.response && !error.response.data.success) {
                setError(error.response.data.error)
            }else {
                setError("Server Error")
            }
        }
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#B5C2B7]">
  
            {/* Top Left Circle */}
            <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-[#A1ABB0]/50"></div>

            {/* Bottom Right Curves */}
            <div className="absolute -bottom-40 -right-32 h-[420px] w-[650px] rounded-tl-full bg-[#62466B]"></div>
            <div className="absolute -bottom-28 -right-20 h-[360px] w-[560px] rounded-tl-full border-[30px] border-[#776D8A]/70"></div>

            {/* Main Content */}
            <div className="relative z-10 flex w-full max-w-7xl flex-col items-center px-6">

                {/* Logo */}
                <div className="mb-6 text-center">
                    <div className="flex justify-center mb-2">
                        <Logo size={80} />
                    </div>

                    <h1 className="font-cinzel text-5xl font-bold text-[#2D2327]">
                    Communique
                    </h1>

                    <div className="mt-2 flex items-center justify-center gap-3">
                        <div className="h-[2px] w-12 bg-[#62466B]"></div>
                        <div className="h-2 w-2 rounded-full bg-[#62466B]"></div>
                        <div className="h-[2px] w-12 bg-[#62466B]"></div>
                    </div>

                    <p className="mt-3 text-lg font-medium text-[#62466B]">
                        Employee Management System
                    </p>
                </div>

                {/* Login Card */}

                <div className="w-full max-w-[450px] rounded-[28px] bg-white px-10 py-8 shadow-[0_20px_50px_rgba(45,35,39,0.15)]">
                    <h2 className="font-monsterrat mb-8 text-center text-4xl text-[#2D2327]">
                        Login
                    </h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="mb-2 block font-semibold text-[#45364B]">
                                Email
                            </label>
                            <input 
                                type="email" 
                                placeholder="Please enter your registered email" 
                                className="h-12 w-full rounded-xl border border-[#A1ABB0] px-4 text-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#776D8A] focus:ring-2 focus:ring-[#776D8A]/30"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block font-semibold text-[#45364B]">
                                Password
                            </label>
                            <input 
                                type="password" 
                                placeholder="*****" 
                                className="h-12 w-full rounded-xl border border-[#A1ABB0] px-4 text-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#776D8A] focus:ring-2 focus:ring-[#776D8A]/30"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                />
                        </div>
                        <div className="mb-4 flex items-center justify-between">
                            <label className="inline-flex items-center">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="ml-2 text-gray-700">Remember me</span>
                            </label>
                            <a href="#" className="text-purple-600">
                                Forgot password?
                            </a>
                        </div>
                        
                        {/* Button */}
                        <button type="submit" className="mt-2 h-12 w-full rounded-xl bg-[#62466B] text-lg font-semibold text-white transition duration-300 hover:bg-[#45364B]">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;