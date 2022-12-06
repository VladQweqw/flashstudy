import React,{useState} from 'react'
import { useNavigate } from 'react-router'

import { motion } from 'framer-motion'


export default function NotesAdd() {
   const navigate = useNavigate();


   return(
        <motion.div 
        initial={{
         opacity: 0
        }}
         animate={{
            opacity:1
         }}
        onClick={(e) => {
            if( (e.target as HTMLDivElement).classList.contains('add-slide-modal-wrapper')) {
               navigate(-1)
            }
         
        }} className="add-slide-modal-wrapper add-notes-modal-wrapper">
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
            className="add-slide-modal">
               <form className="add-slide-content">

                  <input type="text" id='add-notes-input' className="input add-slide-input" placeholder='Title' name='Title' />

                  <textarea className='input textarea add-slide-textarea'id='add-notes-textarea ' placeholder='Description (optional)'></textarea>

               </form>
            
               <div className="add-slide-btn-wrapper">
                  <button className="add-slide-btn primary-btn ">Create</button>
               </div>
            </motion.div>
        </motion.div>
   )
}