import { useRef } from 'react'
import { motion } from 'framer-motion'
import { slideAnimate, slideInitial, togglePopup } from '../../../../functions/functions'
import { useNavigate } from 'react-router'
import Modal from '../../../../components/modal'
import Loader from '../../../../components/loader'
import { groupType } from '../../../../functions/types'

export default function GroupAdd() {
    const navigate = useNavigate();
    const title = useRef<HTMLInputElement | null>(null)
    const description = useRef<HTMLTextAreaElement | null>(null)


    // if(responseData?.message === 'group created') {   
    //     togglePopup('Group created', 'SUCCESS');
    //     navigate('/account')
    // }
    
    // {error != null && togglePopup('Something went wring', 'ERROR')}
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
            <button className="add-slide-btn primary-btn">Create</button>
         </div>
            </motion.div>
        </Modal>
   )
}