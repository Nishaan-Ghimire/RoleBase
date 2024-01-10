import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsPersonCircle,BsInfoCircle, BsBoxArrowRight }
 from 'react-icons/bs'
 import { useNavigate } from 'react-router-dom';
//  import { Link } from 'react-router-dom'
 import { Link } from 'react-router-dom'
//  const { basename } = React.useContext(SomeContext);
// 
import {User, Video} from 'react-feather';
import useAuth from '../../context/useAuth';

 function Sidebar({openSidebarToggle, OpenSidebar}) {
  const Navigate = useNavigate();
  const { clearAuthData } = useAuth();

    



// function Sidebar() {
  return (
    <aside id='sidebar' className="sidebar-responsive">
     {/* <aside id='sidebar' className={"sidebar-responsive"}> */}
       <div className='sidebar-title'>
         <div className='sidebar-brand'>
                 <Link to={"/user-home"} className="errorlink">
                 <div className="flex items-center">
                 <BsPersonCircle className='icon_header'/>

                 <div className="title ml-2 text-lg">User</div>

                 </div>
                 </Link>   
         </div>
         {/* <span className='icon close_icon'>X</span> */}
       </div>

   
     <ul className='sidebar-list'>
         <li className='sidebar-list-item'>
                 <Link to="/user-home" className='sidebarListside'>
                 <div className="flex items-center">
                     <BsGrid1X2Fill className='icon' /> <div className="title ml-2 text-base">Apply Sifarish</div>
                   </div>
                 </Link>
         </li>
         <li className='sidebar-list-item'>
                 <Link to="/user-status" className='sidebarListside'>
                   <div className="flex items-center">
                     <BsInfoCircle className='icon' /> <div className="title ml-2 mt-1 text-base">Status</div>
                     </div>
                 </Link>
         </li>
         <li className='sidebar-list-item'>
                 <Link to="/receive-call" className='sidebarListside'>
                    <Video/><div className="title ml-2 text-base">Receive Call</div>
                 </Link>
         </li>
         

                 <Link to="/user-profile" className='sidebarListside'>
                    <User/><div className=" ml-2">User Profile</div>
                 </Link>
                 </li>
                 <li className='sidebar-list-item'>


                 <button onClick={clearAuthData} className='sidebarListside'>

                   <div className="flex items-center">
                     <BsBoxArrowRight className='icon' /> <div className="ml-2">Logout</div>
                     </div>
                 </button>

         </li>
     </ul> 
     

{/* <h1>Hello side bar</h1> */}
    </aside>
  )
}


export default Sidebar;
