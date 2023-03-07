import { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { saveToLocal, getFromLocal, setDarkMode, togglePopup } from '../functions/functions';
import { setBackground, SETTINGS_IMAGES } from '../functions/functions';
import { slideInitial, slideAnimate } from '../functions/functions';

import Modal from './modal';



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

   slideAnimate.transition.duration = .2
   }, [])
     
   return(
    <Modal>
        <motion.div
        initial={slideInitial}
        animate={slideAnimate}
        className="settings">
            <ul className="settings-navbar">
                <li className="navbar-item navbar-item-active m4" onClick={() => setSettingsPanel(<Account />)}>Account</li>
                <li className="navbar-item m4" onClick={() => setSettingsPanel(<Aspect />)} >Aspect</li>
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
        <h2 className="settings-title m4">Name</h2>
        <form className='change-username-form'>
          <input type="text" name='change_username' id='change-uid' className="input m4" placeholder='New Username' />
          <button className="primary-btn">Change</button>
        </form>
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
      <Setting>
        <h2 className="settings-title m4">Theme</h2>
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
        <h2 className="settings-title m4">Background</h2>
        <div className="background-grid">
            <div onClick={() => {
                setBackground('DEFAULT')
              }}  className="image-wrapper">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAYFBMVEXDw8MAAABwcHDHx8eKioqkpKS8vLzGxsatra3KysqQkJCenp6AgIB3d3dra2u3t7dZWVlMTEyysrIsLCxTU1NDQ0OUlJQhISEyMjJlZWUMDAw9PT2Dg4N0dHQYGBhGRkaaAXj3AAACVklEQVR4nO3a63KiQBBAYbATxxYQbxtNdjd5/7dMIFwEGbaA1Fo05/tpNFVzZJgBCQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICFEdFJROTRQ5jKxbvVRLF79CCmkW043XbeEeTpBxo8zXs2ZA2i9RSRiQbPUw5l90wDUw2cqIyIYamBHpP9Lho+GEMNNM7P8IfB/8BOg2qbcNaB/8BQg2qt3ww8J5hpkA2kkAwcj50GUdVgN3AymGkQpPW+1zMXfFeHdhror7LBuvt9GsXHzpHaaVAdCC/dw9FddnnYNU0MNXDp4WuUp6j7bCAv3jXDUIPAabo5eia9K46SS9ffDDX44nxbA7kWM2V/f5gYa+CTnwyKVeMuwjIaSL15CMNj+72LaODWt7fNTotsUG8dcq+t2bCEBpq0bqC2dhA2G4ho/cLN1VT3TtJkA00u57R8xQVvdw2ujdlgsYGusnGWEfRwl6B1aWmwQbEQ/v4elf7pSBCGt7cdDTYoF8K/2XftNp0JGqcEew3qhTD7rt27p8FHPRvMNbhZCN/Wge49CcIwqSJYa9BYCD+07yfpxmcsNQgax/6qJ0H4Xn7EWAM99426pfwhwlYDz0LoU1xGm2rgXQh9vu+smWoQXAY2uJhr0LMQ+uR31gw1GPVs1lZMNUj/PeIOqaUGchrV4Cp2GujrqATZZbSVBr274n5bNdJANuOJjQY8ozl6GtRm3sD9yDPb824QuHjqo/ureOYJ8p8TZKJHDwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOB/+wQBph2Iu8J1cQAAAABJRU5ErkJggg==" alt="settings-image-1" className='settings-image' />
            </div>
            <div onClick={() => {

            }} className="image-wrapper custom-image-wrapper">
              <h1 className="m4">Add custom</h1>
              <input type="text" placeholder='Url' className='custom-image-upload' />
              <button className="primary-btn">Add</button>
            </div>
           
            {SETTINGS_IMAGES.images.map((image, index) => {
              return <div onClick={() => {
                setBackground(index)
              }} className="image-wrapper">
              <img src={image} key={index} alt={`settings-image-${index + 1}`} className="settings-image" />
            </div>
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