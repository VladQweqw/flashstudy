import { useRef } from 'react'
import { motion } from 'framer-motion'
import { checkLengts, slideAnimate, slideInitial, togglePopup } from '../../../functions/functions'
import { useNavigate } from 'react-router'
import Modal from '../../../components/modal'
import Loader from '../../../components/loader'
import { useMutation } from 'react-query'
import { API } from '../../../functions/API'
import { useQueryClient } from 'react-query'

export default function GroupAdd() {
  const navigate = useNavigate();
  const title = useRef<HTMLInputElement | null>(null)
  const description = useRef<HTMLTextAreaElement | null>(null)

  const queryClient = useQueryClient();

    const {
      status,
      mutate
    } = useMutation({
      mutationFn: API,
      
      onError: () => {
        togglePopup('Something went wring', 'ERROR');
      },
      onSuccess: newGroup => {
        queryClient.setQueryData(['groups'], newGroup);
        togglePopup('Group created', 'SUCCESS');
        navigate('/account')
        queryClient.refetchQueries({
            queryKey: ['account']
        });
      }
    })


    return(
    <Modal>
        <motion.div
        initial={slideInitial}
        animate={slideAnimate}
        className="note-modal modal--wrapper">
    
          {status === 'loading' ? <Loader /> : 
           <form className="add-slide-content">
              <input ref={title} type="text"  id='add-group-input' className="input add-slide-input" placeholder='Title'  name='Title' />
              <textarea ref={description} className='input textarea add-slide-textarea'id='add-group-textarea ' placeholder='Description (optional)'></textarea>
            </form>
          }
        
          <div className="add-slide-btn-wrapper">
              <button className="add-slide-btn primary-btn" onClick={() => {
             
                mutate({
                  url: 'group/create',
                  method: 'POST',
                  data: {
                    color: '#FFFFFF',
                    description: description.current!.value || 'Untitled',
                    isPublic: true,
                    name: title.current!.value || 'Untitled'
                  },
                  headers: {
                    authorization: ''
                  }
                })
              }}>Create</button>
          </div>
            </motion.div>
        </Modal>
   )
}