import  { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import Modal from './modal';
import { saveToLocal, getFromLocal, setDarkMode } from '../functions/functions';


export default function Settings() {
   const [settingsPanel, setSettingsPanel] = useState(<Account />)

    document.querySelectorAll('.navbar-item').forEach((item) => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.navbar-item').forEach((e) => {
          e.classList.remove('navbar-item-active')
        })
        item.classList.add('navbar-item-active')

      })
   })

   return(
    <Modal>
        <motion.div
        initial={{
          translateY: '100%',
          scale: 0,

       }}
       animate={{
          translateY: '0%',
          scale: 1,
          transition: {
             duration: .4
          }
       }}
        className="settings">
            <ul className="settings-navbar">
                <li className="navbar-item navbar-item-active" onClick={() => setSettingsPanel(<Account />)}>Account</li>
                <li className="navbar-item" onClick={() => setSettingsPanel(<Aspect />)} >Aspect</li>
            </ul>

            <div className="settings-content">
                {settingsPanel}
            </div>
        </motion.div>
    </Modal>
   )
}

function Account() {
  
  return(
    <>
      <div className="settings-container">
        <h2 className="settings-title">Name</h2>

      </div>
     

    </>
  )
}

function Aspect() {
  const [isDarkMode, setIsDarkMode] = useState(false)  
  
  useEffect(() => {
    let theme = getFromLocal('darkMode');
    
    if(theme !== false && theme !== true) {
      setIsDarkMode(true)
    }else {
      setIsDarkMode(
        getFromLocal('darkMode')
      )
    }

  }, [])
  

  return(      
      <>
      <div className="settings-container">
        <h2 className="settings-title">Theme</h2>

        <div className="cl-toggle-switch">
          <p> {isDarkMode ? 'Dark': 'Light'} </p>
        <label className="cl-switch">
          <input checked={isDarkMode} onChange={(e) => {

            setDarkMode(
              !isDarkMode ? 'DARK' : 'LIGHT'
            )

            setIsDarkMode(!isDarkMode)
            saveToLocal('darkMode', !isDarkMode)
          }} type="checkbox" />
          <span></span>
        </label>
        </div>

      </div>
     

    </>
  )
}