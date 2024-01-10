import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar';
function ForgotPassword() {
  return (
    <>
    <div>
    <Navbar/>
    </div>
    <div className='flex flex-col h-screen bg-slate-300'>
    <section className="login flex justify-center pt-24">
    <div className="w-full max-w-xs">
        <form action="/forgot-password" method="POST"  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

        <div className="mb-4">
                <label className="block text-slate-950 text-lg font-semibold  mb-2" for="email">
                   Enter the Email
                </label>
                <input
                name="email" 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email" type="email"  placeholder="eg : test@test.com"/>
            </div>

            <div className="flex flex-col items-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4">
              Submit
            </button>
            <Link to="/login" className="inline-block font-bold text-sm hover:text-slate-950">
              Back
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

export default ForgotPassword
