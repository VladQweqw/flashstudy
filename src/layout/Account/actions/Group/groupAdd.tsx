import { useRef } from 'react'
import Modal from '../../../../components/modal'
import { motion } from 'framer-motion'
import { redirect } from "react-router-dom";
import { slideAnimate, slideInitial, togglePopup } from '../../../../functions/functions'
import useFetch, { ENDPOINT } from '../../../../functions/API'
import Loader from '../../../../components/loader'
import { useNavigate } from 'react-router'

export default function GroupAdd() {
    const navigate = useNavigate();
    const title = useRef<HTMLInputElement | null>(null)
    const description = useRef<HTMLTextAreaElement | null>(null)
    const {data, error, loading, reFetch} = useFetch<{message: string}>()

    if(data?.message === 'group created') {   
        togglePopup('Group created', 'SUCCESS')
        navigate('/account', {state: {reload: true}})
    }
    
    {error != null && togglePopup('Something went wring', 'ERROR')}
    return(
    <Modal>
        <motion.div
      
      initial={slideInitial}
      animate={slideAnimate}
      className="notes-modal modal--wrapper">
        {loading && <Loader />}
    
        {
            !loading && 
            <form className="add-slide-content">

            <input ref={title} type="text" id='add-notes-input' className="input add-slide-input" placeholder='Title' name='Title' />

            <textarea ref={description} className='input textarea add-slide-textarea'id='add-notes-textarea ' placeholder='Description (optional)'></textarea>

            </form>
        }
        
      
         <div className="add-slide-btn-wrapper">
            <button className="add-slide-btn primary-btn"
            onClick={() => reFetch({
                method: 'POST',
                url: ENDPOINT + 'group/create',
                data: {
                    name: title.current!.value || ' ',
                    description: description.current!.value || ' ',
                    isPublic: true,
                    color: '#FFFFFF',
                },
                headers: {}
            })}
            >Create</button>
         </div>
            </motion.div>
        </Modal>
   )
}