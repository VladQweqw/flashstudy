import React,{} from 'react'
import { useNavigate, useLocation } from 'react-router'

export default function SideNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    
   return(
    <>
        <div className="logo" onClick={() => navigate('/account')}>
            <h1>FS</h1>
        </div>
    
        <div className="side-navbar">
           <span
           onClick={() => navigate('/account/stats')}
           className="stats-icon side-navbar-item" id='stats'>
                <i className="fa-solid fa-chart-simple"></i>           
            </span>
           
           <span
           onClick={() => navigate('/settings', {state: {background: location}})}
           className="settings-icon side-navbar-item" id='settings'>
            <i className="fa-solid fa-gear"></i>
           </span>
        </div>

    </>
   )
}