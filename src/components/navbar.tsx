import React,{} from 'react'

import { useNavigate } from 'react-router'

export default function Navbar() {
    const navigate = useNavigate()


    return(
    <div className="navbar" >
        <div onClick={() => navigate('/')} className="brand">
            <h1 id='logo'>FS</h1>
        </div>

        <nav className="nav">
            <button className="join-now-btn secondary-btn">Join now</button>
        </nav>
    </div>
   )
}