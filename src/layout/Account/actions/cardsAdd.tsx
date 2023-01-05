import {useState} from 'react'
import Modal from '../../../components/modal'
import { motion } from 'framer-motion'

const colors = [
   {
      colorName: 'Gray',
      colorHex: '#1C1C1C',
   },
   {
      colorName: 'Yellow',
      colorHex: '#E8DC87',
   },
   {
      colorName: 'Green',
      colorHex: '#81DE9B',
   },
   {
      colorName: 'Purple',
      colorHex: '#C287E8',
   },
   {
      colorName: 'Blue',
      colorHex: '#92CDDF',
   },
   {
      colorName: 'Orange',
      colorHex: '#E8BF48',
   },
   {
      colorName: 'Mint',
      colorHex: '#92E0B3',
   },
   {
      colorName: 'Dark blue',
      colorHex: '#2C7185',
   },
   {
      colorName: 'Pink',
      colorHex: '#7858A6',
   },
   {
      colorName: 'Earth',
      colorHex: '#704F4F',
   },
    {
      colorName: 'Clay',
      colorHex: '#A13333',
   },
]

export default function CardsAdd() {
   const [colorIndex, setColorIndex] = useState(0)
   document.querySelectorAll('.color').forEach((color) => {

      color.addEventListener('click', () => {
         document.querySelectorAll('.color').forEach((color) => {
            color.classList.remove('color-select-active')
         })

         color.classList.add('color-select-active')
         
      })
   })

   return(
        <Modal>
            <motion.div
         
         initial={{
            translateY: '100%',
            opacity: 0,
            scale: 0,

         }}
         animate={{
            translateY: '0%',
            scale: 1,
            opacity:1,
            transition: {
               duration: .2
            }
         }}
         style={{
            backgroundColor: colors[colorIndex].colorHex
         }} className="slide-modal modal--wrapper">
            <div className="thumbnail-image-wrapper">
               <img src="https://images.unsplash.com/photo-1458222960031-58c2a8f3ae50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="slide-thumbnail-image" className="thumbnail-image" />
            </div>

            <form className="add-slide-content">

               <input type="text" id='add-card-input add-slide-input' className="input" placeholder='Title' name='Title' />

               <textarea className='input textarea'id='add-card-textarea add-slide-textarea' placeholder='Description (optional)'></textarea>

            </form>
            <div className="color-select">
                  {/* {colors.map((color, index: number) => {
                     
                     return <span
                     title={color.colorName}
                     onClick={() => setColorIndex(index)}
                     key={index} className="color" style={{
                        backgroundColor: color.colorHex
                     }}></span>
                  })} */}
               </div>

            <div className="add-slide-btn-wrapper">
               <button className="add-slide-btn primary-btn ">Create</button>
            </div>
            </motion.div>
        </Modal>
   )
}