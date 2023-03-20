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
        className="group-modal modal--wrapper" id='group-add'>
    
          {status === 'loading' ? <Loader /> : 
           <>
              <form className="add-slide-content">
                <div className="input-wrapper">
                  <input ref={title} type="text" onBlur={(e) => {
                    if(!(e.target as HTMLInputElement).value) {
                      document.querySelector('.place-holder')?.classList.remove('placeholder-active')
                    }

                  }} onClick={() => {
                    document.querySelector('.place-holder')?.classList.add('placeholder-active')
                  
                  }} id='add-group-input' className="input add-slide-input" name='Title' />
                  <p className="place-holder">New Folder...</p>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="add-group-textarea" className='m4 label'>More details?</label>
                  <textarea ref={description} className='input textarea add-slide-textarea'id='add-group-textarea' placeholder='Description (optional)'></textarea>
                </div>

            </form>
           
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
           </>
          }

         

            
            {/* LEFT SIDE */}
            <svg width="149" height="199" className='modal-svg modal-svg-left' viewBox="0 0 149 199" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M56.5 80.8903C18.9 65.01 7 28.4522 0 0V199H149C147.5 192.383 125.5 177.661 112.5 161.284C97.3851 142.243 103.5 100.741 56.5 80.8903Z" fill="#D09683"/>
              <path d="M33 100.798C2.71812 90.9829 5.63758 93.586 0 76V199H120C118.792 194.91 77.4698 194.739 67 184.617C54.8269 172.848 70.8523 113.068 33 100.798Z" fill="#915643" fillOpacity="0.58"/>
            </svg>

            {/* RIGHT SIDE */}

            <svg width="116" height="155" className='modal-svg modal-svg-right' viewBox="0 0 116 155" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M80 63.5897C111.424 58.6833 110.55 22.1613 116 0V155H0C1.16779 149.846 20.6163 135.258 34.5 126.683C53 115.256 45 69.0545 80 63.5897Z" fill="#D09683"/>
              <path d="M90.3496 95.8235C113.818 88.0829 111.631 74.8687 116 61L116 155H23C23.9362 151.775 24.8859 151.983 33 144C42.4341 134.719 61.0142 105.499 90.3496 95.8235Z" fill="#915643" fillOpacity="0.58"/>
            </svg>

              
            </motion.div>
        </Modal>
   )
}