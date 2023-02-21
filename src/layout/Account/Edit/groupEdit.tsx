import { useRef } from 'react'
import { motion } from 'framer-motion'
import { slideAnimate, slideInitial, togglePopup } from '../../../functions/functions'
import { useNavigate } from 'react-router'
import Modal from '../../../components/modal'
import { useSearchParams } from 'react-router-dom'

export default function GroupEdit() {
   const navigate = useNavigate();
   const title = useRef<HTMLInputElement | null>(null)
   const description = useRef<HTMLTextAreaElement | null>(null)

   const [ params ] = useSearchParams();   
   
    return(
    <Modal>
        <motion.div
      
      initial={slideInitial}
      animate={slideAnimate}
      className="notes-modal modal--wrapper">
    
    <form className="add-slide-content">

    <input ref={title} type="text" id='add-notes-input' className="input add-slide-input" placeholder='Title' name='Title' />

    <textarea ref={description} className='input textarea add-slide-textarea'id='add-notes-textarea ' placeholder='Description (optional)'></textarea>

    </form>
            
      
         <div className="add-slide-btn-wrapper">
            <button className="add-slide-btn primary-btn">Change</button>
         </div>
            </motion.div>
        </Modal>
   )
}