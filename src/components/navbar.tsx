import React,{} from 'react'

import { useNavigate } from 'react-router'
import Logo from '../assets/images/logo.svg'

export default function Navbar() {
    const navigate = useNavigate()
        
    return(
    <div className="navbar" >
        <div onClick={() => navigate('/')} className="brand">
            <img src={Logo} alt="logo" className='logo' />
        </div>

        <nav className="nav">
            <button className="join-now-btn secondary-btn" onClick={() => navigate('/form')}>Join now</button>
        </nav>
    </div>
   )
}