import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar';
function ChangePassword() {
  return (
    <>
    <div>
    <Navbar/>
    </div>
    <div className='flex flex-col h-screen bg-slate-300'>
    <section className="login flex justify-center pt-24">
    <div className="w-full max-w-xs">
        <form action="/change-password" method="POST"  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">


            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" forhtml="password">
                    Enter New Password
                </label>
                <input
                name="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password"
                    placeholder="******************" />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" forhtml="cPassword">
                    Confirm Password
                </label>
                <input
                name="cPassword"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="cPassword" type="password"
                    placeholder="******************" />
            </div>
            <div className="flex flex-col items-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4">
              Submit
            </button>
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

export default ChangePassword
