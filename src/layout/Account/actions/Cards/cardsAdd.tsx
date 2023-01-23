import {useRef, useState} from 'react'
import Modal from '../../../../components/modal'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router'
import { slideAnimate, slideInitial } from '../../../../functions/functions'
import useFetch, { ENDPOINT } from '../../../../functions/useGetAPI'
import { colors } from '../../../../functions/functions'

export default function CardsAdd() {
   const [colorIndex, setColorIndex] = useState(0)
   const { reFetch } = useFetch<any>();
   
   const { state } = useLocation();

   const question = useRef<HTMLInputElement | null>(null);
   const answer = useRef<HTMLTextAreaElement | null>(null);


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
         
         initial={slideInitial}
         animate={slideAnimate}
         style={{
            backgroundColor: colors[colorIndex].colorHex
         }} className="slide-modal modal--wrapper">
            <div className="thumbnail-image-wrapper">
               <img src="https://images.unsplash.com/photo-1458222960031-58c2a8f3ae50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="slide-thumbnail-image" className="thumbnail-image" />
            </div>

            <form className="add-slide-content">

               <input ref={question} type="text" id='add-card-input add-slide-input' className="input" placeholder='Title' name='Title' />

               <textarea ref={answer} className='input textarea'id='add-card-textarea add-slide-textarea' placeholder='Description (optional)'></textarea>

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
               <button className="add-slide-btn primary-btn " onClick={() => {
                  console.log(state?.groupId);
                  
                  reFetch({
                     method: 'POST',
                     url: ENDPOINT + 'slide/create',
                     data: {
                        question: question.current!.value || 'Untitled',
                        answer: answer.current!.value || 'Untitled',
                        tags: JSON.stringify([]),
                        image:null,
                        groupId:state?.groupId,
                     },
                     headers: {}
                 })
               }}>Create</button>
            </div>
            </motion.div>
        </Modal>
   )
}