import { motion } from 'framer-motion'
import Modal from '../../../components/modal';


export default function NotesAdd() {

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
      className="notes-modal modal--wrapper">
         <form className="add-slide-content">

            <input type="text" id='add-notes-input' className="input add-slide-input" placeholder='Title' name='Title' />

            <textarea className='input textarea add-slide-textarea'id='add-notes-textarea ' placeholder='Description (optional)'></textarea>

         </form>
      
         <div className="add-slide-btn-wrapper">
            <button className="add-slide-btn primary-btn ">Create</button>
         </div>
            </motion.div>
        </Modal>
   )
}