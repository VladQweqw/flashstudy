import React,{} from 'react'


export default function Navbar() {

   return(
    <div className="navbar" >
        <div className="brand">
            <h1 id='logo'>FS</h1>
        </div>

        <nav className="nav">
            <button className="join-now-btn secondary-btn">Join now</button>
        </nav>
    </div>
   )
}