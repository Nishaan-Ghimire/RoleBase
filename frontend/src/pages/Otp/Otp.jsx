import React, { useState} from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import axios from 'axios'; // Import Axios
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';





function Otp() {
  const params = useParams();
  console.log(params)

  const Navigate = useNavigate()




  // const [userName, setuserName] = useState();
  const [otp, setotp] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form data to be sent in the POST request
    const formData = {
    otp: otp,
    };

    try {
      // Make POST request to the specified endpoint
      const response = await axios.post(`http://localhost:8000/users/${params.userId}/verify`, formData);

      // Handle the response here if needed
      console.log('OTP Verification Successful:', response.data);
      // window.location.href="/";
      // Navigate(`/${params.userId}/user-home`)
      Navigate('/login')
      // Redirect or perform any other action after successful registration
    } catch (error) {
      // Handle error if the registration fails
      console.error('OTP Verification Failed:', error);
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
        <form action="/otp-confirmation" onSubmit={handleSubmit} method="POST"  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

            <div className="mb-4">
                <label className="block text-slate-950 text-lg font-semibold  mb-2" forhtml="userOtp">
                Enter the OTP
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="otp" 
                    type="text" 
                    name = "otp"
                    onChange = {(e) => setotp(e.target.value)}
                    value = {otp}
                   
                    placeholder="eg: 1234"/>
            </div>

            <div className="flex flex-col items-center">
  <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4">
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

export default Otp
