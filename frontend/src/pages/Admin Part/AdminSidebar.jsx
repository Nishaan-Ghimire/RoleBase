import React from 'react'
import { BsFillGearFill, BsPersonCircle,BsInfoCircle,BsFileEarmarkArrowUp   }
 from 'react-icons/bs'
import './AdminDashboard.css'
import {Video} from 'react-feather'


function AdminSidebar() {
  return (
    <>
 
    <aside id='sidebar' className="sidebar-responsive">
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
                {/* <BsCart3 className='icson_header' />  */}
                <a href="/admin">
                <div className="flex items-center">
                <BsPersonCircle className='icon_header' />
                <div className="ml-2">Admin</div>
                </div>
                {/* <BsPersonCircle className='icon_header'/><div className="title ml-2">Admin</div> */}
                </a>
                
        </div>

      </div>

    
    <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
                <a href="/admin" className='sidebarListside'>
                    <BsFileEarmarkArrowUp    className='icon' /> <div className="ml-2">Application Requests</div>
                    
                </a>

          
        </li>
        <li className='sidebar-list-item'>
                <a href="/admin-status" className='sidebarListside'>
                    <BsInfoCircle className='icon' /> <div className="ml-2">Status</div>
                    {/* IoInformationCircleOutline */}
                </a>
        </li>
       
    </ul>
    


    </aside>
    </>
  )
}

export default AdminSidebar
