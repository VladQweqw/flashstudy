import { useSearchParams } from 'react-router-dom'
import Modal from '../../../../components/modal';
import { motion } from 'framer-motion'

export default function CardsEdit() {
    const params = useSearchParams();
    

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
        className="slide-modal modal--wrapper">
        <div className="thumbnail-image-wrapper">
        <img src="https://images.unsplash.com/photo-1458222960031-58c2a8f3ae50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="slide-thumbnail-image" className="thumbnail-image" />
        </div>

        <form className="add-slide-content">

        <input type="text" defaultValue={'EDITED'} id='add-card-input add-slide-input' className="input" placeholder='Title' name='Title' />

        <textarea defaultValue={'EDITED'} className='input textarea'id='add-card-textarea add-slide-textarea' placeholder='Description (optional)'></textarea>

        </form>
        <div className="add-slide-btn-wrapper">
        <button className="add-slide-btn primary-btn ">Change</button>
        </div>
        </motion.div>
    </Modal>
   )
}