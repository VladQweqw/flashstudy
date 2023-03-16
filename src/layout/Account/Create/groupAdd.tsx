import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { slideAnimate, slideInitial, togglePopup } from '../../../functions/functions'
import { useNavigate } from 'react-router'
import Modal from '../../../components/modal'
import Loader from '../../../components/loader'
import { useMutation } from 'react-query'
import { API } from '../../../functions/API'
import { useQueryClient } from 'react-query'
import { ColorVariants, changeColor } from '../../../functions/functions'
import { S } from 'chart.js/dist/chunks/helpers.core'

export default function GroupAdd() {
  const navigate = useNavigate();
  const title = useRef<HTMLInputElement | null>(null)
  const description = useRef<HTMLTextAreaElement | null>(null)
  const [colorIndex, setColorIndex] = useState(0)
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
        className="note-modal modal--wrapper" id='group-add'>
    
          {status === 'loading' ? <Loader /> : 
           <form className="add-slide-content">
              <input ref={title} type="text"  id='add-group-input' className="input add-slide-input" placeholder='Title'  name='Title' />
              <textarea ref={description} className='input textarea add-slide-textarea'id='add-group-textarea ' placeholder='Description (optional)'></textarea>
            </form>
          }

          <div className="color-select">
                  {ColorVariants.map((color: string, index: number) => {
                     
                     return <span
                     
                     onClick={(e) => {
                        changeColor(index, color);
                        setColorIndex(index);

                        (e.target as HTMLSpanElement).classList.add('color-select-active')    
                    }}
                     key={index} className={`${index === 0 ? "color color-select-active" : "color"}`} style={{
                        backgroundColor: color
                     }}></span>
                  })}
          </div>

          <div className="add-slide-btn-wrapper">
              <button className="add-slide-btn primary-btn" onClick={() => {
             
                mutate({
                  url: 'group/create',
                  method: 'POST',
                  data: {
                    color: ColorVariants[colorIndex],
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