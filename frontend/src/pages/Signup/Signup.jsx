import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'; // Import Axios
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
function Signup() {

const [userName, setuserName] = useState();
const [email, setEmail] = useState();
const [phone,setphone] = useState();
const [password, setPassword] = useState();
const Navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Form data to be sent in the POST request
        const formData = {
        userName: userName,
        email: email,
        phone : phone,
        password: password,
        };
    
        try {
          // Make POST request to the specified endpoint
          const response = await axios.post('http://localhost:8000/users/register', formData);
    
          // Handle the response here if needed
          console.log('Registration successful:', response.data);
        //   window.location.href="/otp-confirmation";
        Navigate(`/${response.data.userId}/otp-confirmation`)
          // Redirect or perform any other action after successful registration
        } catch (error) {
          // Handle error if the registration fails
          console.error('Registration failed:', error);
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
        <form action="/register" onSubmit={handleSubmit} method="POST" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="userName">
                    Name
                </label>
                <input 
                name="userName" 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="userName" type="text" onChange={(e)=>setuserName(e.target.value)} value={userName} placeholder="Enter your name"/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Email
                </label>
                <input
                name="email" 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email" type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter your email"/>
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone Number
            </label>
            <input 
                name="phone"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="number" 
                onChange={(e)=>setphone(e.target.value)} value={phone}
                placeholder="Enter your phone number"
            />
        </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input
                name="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password" 
                    onChange={(e)=>setPassword(e.target.value)} value={password}
                    placeholder="******************"/>
            </div>
            <div className="flex items-center justify-between">
            <button onSubmit={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded" type="submit">
                    Sign up
                </button>
                <Link to="/login"  className="inline-block align-baseline font-bold text-sm hover:text-slate-950" href="/login">
                   Already have account?
                </Link>
            </div>
        </form>
        <p className="text-center text-slate-900 text-xs">
            &copy;2023 Smart Sifarish. All rights reserved.
        </p>
    </div>
</section>
</div>
</>
  )
}

export default Signup