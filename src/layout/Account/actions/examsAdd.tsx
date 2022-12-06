import React,{useState} from 'react'
import { useNavigate } from 'react-router'

import { motion } from 'framer-motion'


export default function ExamsAdd() {
   const navigate = useNavigate();
   const [daysUntilExam, setDaysUntilExam] = useState(0)

   function convertTime(timeInMs: number) {
      let examDate = new Date(
         timeInMs - new Date().getTime()
      ).getTime();
            
      let days = (examDate / (1000 * 60* 60 * 24))
         
      return Math.ceil(days)
   }

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
         
        }} className="add-slide-modal-wrapper add-exams-modal-wrapper">
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
               <div className="slide-header">
                  <input
                  onChange={(e: any) => {

                     if(e.target.value != '') {
                        setDaysUntilExam(
                           convertTime(
                              new Date(e.target.value).getTime()
                           )   
                        )                     
                     }else {
                        setDaysUntilExam(0)
                     }
                    
                       
                     

                  }}
                  type="date" name="Add exam date" className='exam-date' id="exam-date" />
                  <p id="slide-days-left">{
                     daysUntilExam < 1 ? 'Today' : `In: ${daysUntilExam} days` 
                  }</p>
               </div>

               <form className="add-slide-content">
                  <input type="text" id='add-exam-input' className="input add-slide-input" placeholder='Title' name='Title' />

                  <textarea className='input textarea add-slide-textarea 'id='add-exam-textarea' placeholder='Description (optional)'></textarea>

               </form>
               <div className="add-slide-btn-wrapper">
                  <button className="add-slide-btn primary-btn ">Create</button>
               </div>
            </motion.div>
        </motion.div>
   )
}