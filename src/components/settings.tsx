import  { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import Modal from './modal';
import { saveToLocal, getFromLocal, setDarkMode } from '../functions/functions';
import { setBackground, backgroundImages } from '../functions/functions';


export default function Settings() {
   const [settingsPanel, setSettingsPanel] = useState(<Account />)

   useEffect(() => {
    document.querySelectorAll('.navbar-item').forEach((item) => {

      item.addEventListener('click', () => {
        document.querySelectorAll('.navbar-item').forEach((e) => {
          e.classList.remove('navbar-item-active')
        })

        item.classList.add('navbar-item-active')
      })
   })
   }, [])
   

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

    document.querySelectorAll('.background-grid-image').forEach((item, index) => {

      item.addEventListener('click', () => {
        document.querySelectorAll('.background-grid-image').forEach((e) => {
          e.classList.remove('background-grid-image-active')
        })

        item.classList.add('background-grid-image-active')
        setBackground(index)
      })
   })

  }, [])

  return(      
      <>
      <Setting>
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
      </Setting>
      
      <Setting>
        <h2 className="settings-title">Background</h2>
        <div className="background-grid">

        <div onClick={() => {
              setBackground(0)
            }}  className="default background-grid-image background-grid-image-active">
            <p>Default</p>
          </div>

        <div className="background-grid-image custom">
          <input defaultValue={getFromLocal('customBackground') || ''} type="text" placeholder='Custom URL' id='custom-background-id' />
          <button id="apply-custom-background" onClick={() => {
            let inpValue = (document.getElementById('custom-background-id') as HTMLInputElement).value
            if(inpValue === '') return alert('Add a valid URL')
            saveToLocal('customBackground', inpValue)
            saveToLocal('backgroundId', 1)

            backgroundImages[1] = inpValue
            setBackground(1)

          }} className='primary-btn'>Apply</button>
        </div>

          {backgroundImages.map((image, index) => {
            if(image === 'DEFAULT' || image === '') return;
            return <img onClick={() => setBackground(index)} className='background-grid-image' src={image} alt="image" key={index} />
          })}
        </div>
      </Setting>

    </>
  )
}

function Setting(props: any) {
  
  return(
    <div className="settings-container">        
        {props.children}
    </div>
  )

}