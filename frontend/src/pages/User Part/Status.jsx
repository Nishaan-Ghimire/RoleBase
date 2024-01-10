import ReactDOMServer from 'react-dom/server';
import React from 'react'
import './Dashboard.css'
import Header from './Header'
import Sidebar from './Sidebar'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';

import { useState,useEffect } from 'react'
import useAxiosAuth from '../../service/useAxiosAuth';


function Status() {
  const [response, setResponse] = useState([]);
  const axiosAuth = useAxiosAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          // Redirect to login or fetch a new access token
          navigate('/login');
          return;
        }
        const response = await axiosAuth.get('http://localhost:8000/birth-certs',{
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // console.log('Fetched data:', response.data);
        setResponse(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Your existing code...

  }, [axiosAuth]);





// HTML to pdf code
const pdfJSX = () => {
  return (
    <>

      <h1>JSX to PDF Convert Example</h1>
      <h2>Hello React</h2> 
    </>
  )
}

const printHandler = () => {
  const printElement = ReactDOMServer.renderToString(pdfJSX());
  // const printElement = pdfJSX();

  html2pdf().from(printElement).save();
}



  return (
    <>
    <Header/>
    <Sidebar />
    <div className='tablemain'>
 <div className="table-container">
      <table border={1} className="data-table">
      <thead className="table-dark">
          <tr>
            <th>S.N</th>
            <th>Name</th>

            <th>Sifarish Type</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Action</th>
          
          </tr>
        </thead>
        <tbody>
              {response.length > 0 ? (
                response.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.fullName}</td>
                    <td>{"janmadarta"}</td>
                    <td>{data.isVerified ? 'Verified' : 'Not Verified'}</td>
                    <td>{data.remarks ? data.remarks: 'Not Viewed Yet'}</td>
                    <td>{
                       data.isVerified ? (
                        <>
                          <button className='verify action-btn' >Download</button>
                       
                        </>
                      ) : (
                        <>
                          <span>Not Verified yet to download</span>
                        </>
                      )}</td>
                
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No data available</td>
                </tr>
              )}
            </tbody>

      </table>
    </div>

    </div>
    </>
  )
}

export default Status;

