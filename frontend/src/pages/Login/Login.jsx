import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import useAuth from '../../context/useAuth'


import "./Login.css" 
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import axios from 'axios'
function Login() {
  const { setAuthData } = useAuth();
  const params = useParams()
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
          email: email,
          password: password,
        };
    
        try {
          const response = await axios.post('http://localhost:8000/users/login', formData);
    
          console.log("Login successful:", response.data);
      setAuthData(response.data.accessToken, response.data.user);
      navigate(`/user-home`);


        } catch (error) {
          console.error('Login failed:', error);
        }
      };
    

  return (
    <>
    <div>
    <Navbar/>
    </div>
    <div className='flex flex-col h-screen bg-slate-300'>
    <section className="login flex justify-center pt-24">
    <div className="w-full max-w-xs">
        <form action="/login" method="POST" onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" forhtml="username">
                    Email
                </label>
                <input
                name="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username" type="email" 
                    onChange={(e)=>setEmail(e.target.value)}  value={email}
                    placeholder="Enter your email"/>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" forhtml="password">
                    Password
                </label>
                <input
                name="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password"
                    onChange={(e)=>setPassword(e.target.value)} value={password}
                    placeholder="******************" />
            </div>
            <div className="flex items-center justify-between">
                {/* <button
                    className="btn-primary rounded-full text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline btn"
                    type="submit"> */}
                        <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                    Log In
                </button>
                <Link to="/signup" className="inline-block align-baseline font-bold text-sm hover:text-slate-950" href="/register">
                   Don't have account?
                </Link>
            </div>
        </form>
        <p className="text-center text-slate-900 text-xs">
            &copy;2023 Smart Sifarish.  All rights reserved.
        </p>
    </div>
</section>
</div>
    </>
  )
}

export default Login
