import React,{useState} from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

export default function Settings() {
   const navigate = useNavigate();
   const [settingsPanel, setSettingsPanel] = useState(<Account />)

   return(
    <motion.div 
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1
    }}
    className="settings-wrapper" onClick={(e) => {
      if((e.target as HTMLElement).classList.contains('settings-wrapper')) {
         navigate(-1)
      }
    }}>
        <motion.div
        initial={{
          translateY: '100%',
          opacity: 0,
        }}
        animate={{
          translateY: '0%',
          opacity: 1,
          
        }}
        className="settings">
            <ul className="settings-navbar">
                <li className="navbar-item" onClick={() => setSettingsPanel(<Account />)}>Account</li>
                <li className="navbar-item" onClick={() => setSettingsPanel(<Aspect />)} >Aspect</li>
            </ul>

            <div className="settings-content">
                {settingsPanel}
            </div>
        </motion.div>
    </motion.div>
   )
}

function Account() {

  return(
    <div className="settings-section account-settings">
      <h1>cal</h1>
    </div>
  )
}

function Aspect() {

  return(
    <div className="settings-section aspect-settings">
      <h1>awd</h1>
    </div>
  )
}