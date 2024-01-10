import React, { useEffect,useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,LineChart, Line } from 'recharts';
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,  BsFillBellFill, BsExclamationCircle }
 from 'react-icons/bs'
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import './admin.css'
import useAxiosAuth from '../../service/useAxiosAuth';
// import {useNavigate} from 'react-router-dom'
import useAuth from '../../context/useAuth';




function AdminHome() {
  const parmas = useParams();
  const axiosAuth = useAxiosAuth();
  const [response, setResponse] = useState([]);
  const navigate = useNavigate();
  const {accessToken} = useAuth()
// Getting Data and rendering them
useEffect(() => {
  const fetchData = async () => {
    try {

     
      const response = await axiosAuth.get('http://localhost:8000/birth-certs', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('Fetched data:', response.data);
      setResponse(response.data); // Update the state with the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();

  // Your existing code...

}, [axiosAuth]);
return (
  <>
    {response.length > 0 ? (
      <main className='main-container'>
        <div className='text-center mt-8'>
          <h1 className='text-slate-900 text-3xl font-bold'>Application Requests</h1>
        </div>

        <div className="sifarish-request">
          {response.map((data, index) => (
            <Link to={`/sifarishdemo/${data._id}`} key={index}>
              <h1>Type of sifaris</h1>
              <div className="card mt-4" style={{ width: 300, height: 300 }}>
                <div className="card-body">
                  <h5 className="card-title font-bold text-xl text-center font-sans">जन्म दर्ता बनाउने सिफारिस</h5>
                  <hr />
                  <div className="container flex flex-col gap-4">
                    <span className='font-bold pt-1'>Name : {data.fullName}</span>
                    <span className='font-bold pt-1'>Age : {data.age}</span>
                    <span className='font-bold pt-1'>Click to get Sifarish Template</span>
             
                  </div>
                 
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    ) : (
      <p>No data available</p>
    )}
  </>
);





     }

export default AdminHome
