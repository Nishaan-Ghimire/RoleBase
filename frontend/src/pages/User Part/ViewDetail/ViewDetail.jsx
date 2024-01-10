import React,{useEffect,useState} from 'react'
import AdminHeader from '../../Admin Part/AdminHeader';
import AdminSidebar from '../../Admin Part/AdminSidebar';
import useAxiosAuth from '../../../service/useAxiosAuth';
import { useParams } from 'react-router-dom';
import './viewDetail.css';
const ViewDetail = () => {
    const [data, setData] = useState();
    const axiosAuth = useAxiosAuth();
    const { bid } = useParams();
    
    
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosAuth.get(`http://localhost:8000/birth-certs/${bid}`);
        setData(response.data);
        console.log(sifarishData)
        // sifarishData.map((data,index)=>{
        //   console.log(data)
        // })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [axiosAuth, bid])

  return (
<>
<AdminHeader/>
    <AdminSidebar/>
   {data ? (
     <div className='DetailPage' key={data._id}>
     <div className="title">
     <span>Details</span>
     </div>

     <div className="Field">
         <span>Full Name:  {data.fullName} </span>
     </div>
     <div className="Field">
         <span>Age : {data.age}</span>
     </div>
     <div className="Field">
         <span>Father Name : {data.fathername} </span>
     </div>
     <div className="Field">
         <span>Grand Father Name: {data.grandfathername}</span>
     </div>
     <div className="Field">
         <span>Rural Municipality : {data.ruralMunicipality}</span>
     </div>
     <div className="Field">
         <span>Verified Status: {data.isVerified?"Verified":"Not Verified"}</span>
     </div>
     <div className="images">
     <div className="FieldImage">
      <span>Front Citizenship</span>
         <img src={`http://localhost:8000/images/${data.issuedBy._id}/${data.fatherCitizenship.front}`} alt="" />
     </div>
     <div className="FieldImage">
     <span>Back Citizenship</span>
         <img src={`http://localhost:8000/images/${data.issuedBy._id}/${data.fatherCitizenship.back}`} alt="front" />
     </div>
     <div className="FieldImage">
     <span>Transaction Slip</span>
         <img src={`http://localhost:8000/images/${data.issuedBy._id}/${data.transactionImage}`} alt="back" />
     </div>
     <br />
    

 </div>
     </div>
   ):(<></>)

   }
       
    </>
  )
}

export default ViewDetail