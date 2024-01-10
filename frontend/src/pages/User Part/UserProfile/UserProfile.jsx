import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css'
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import useAxiosAuth from '../../../service/useAxiosAuth';
const UserProfile = () => {
  const [userProfileData, setUserProfileData] = useState('');
  const axiosAuth = useAxiosAuth();
  const navigate = useNavigate();
  const handleChangePassword = ()=>{
   navigate('/change-password')
  }
  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log(userProfileData)
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          // Redirect to login or fetch a new access token
          navigate('/login');
          return;
        }

         // Include the access token in the Authorization header
      const response = await axiosAuth.get('http://localhost:8000/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });


        // const response = await axiosAuth.get('http://localhost:8000/users/me');
        setUserProfileData(response.data);
        console.log("Here",response.data.user)
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <Header />
      <Sidebar />

      <div className='user-profile'>
        {/* Check if userProfileData and userProfileData.user are defined */}
        {userProfileData && userProfileData.user ? (
          <>
            <div className="userProfilePicImage">
              <img src="/images/profile.jpg" alt="profile" />
            </div>
            <div className="userDesc">
              <div className="name">
                <span>Username: {userProfileData.user.userName || 'Null'}</span>
              </div>
              <div className="email">
                <span>Email: {userProfileData.user.email || 'Null'}</span>
              </div>
            
              <div className="createdSifarish">
                <div className="title">
                  <span>Applied Birth Certificates</span>
                  {userProfileData.user.birthCertificates ? (
                    userProfileData.user.birthCertificates.map((value) => (
                      <div key={value._id} className="sifarishUserName">
                        {/* Check if value.fullName is defined */}
                        <div className="top">
                        <div className="field">
                          <span>Full Name: {value.fullName || 'Null'}</span>
                        </div>
                        {/* Check if value.fatherName is defined */}
                        <div className="field">
                          <span>Father Name: {value.fatherName || 'Null'}</span>
                        </div>
                        </div>
                        <div className="middle">

                        {/* Check if value.grandFatherName is defined */}
                        <div className="field">
                          <span>Grand Father Name: {value.grandFatherName || 'Null'}</span>
                        </div>
                        {/* Check if value.ruralMunicipality is defined */}
                        <div className="field">
                          <span>Rural Municipality: {value.ruralMunicipality || 'Null'}</span>
                        </div>
                        </div>
                       <div className="button">
                       <div className="field">
                          <span>Status: {value.isVerified?' Verified ':' Not Verified '}</span>
                        </div>
                       </div>
                      </div>
                    ))
                  ) : (
                    <span>Loading Failed</span>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <span>Loading user profile...</span>
        )}
      </div>
    </>


  );
}

export default UserProfile;
