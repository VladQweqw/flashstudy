import {useRef, useState} from 'react'
import Modal from '../../../../components/modal'
import { motion } from 'framer-motion'
import { useParams } from 'react-router'
import { slideAnimate, slideInitial, togglePopup } from '../../../../functions/functions'
import { colors } from '../../../../functions/functions'
import { useQueryClient, useMutation } from 'react-query'
import { API } from '../../../../functions/API'
import Loader from '../../../../components/loader'

export default function CardsAdd() {
   const [colorIndex, setColorIndex] = useState(0)
   const { id } = useParams();

   const question = useRef<HTMLInputElement | null>(null);
   const answer = useRef<HTMLTextAreaElement | null>(null);
   const imageInput = useRef<HTMLInputElement | null>(null);
   const image = useRef<HTMLImageElement | null>(null);

   const queryClient = useQueryClient();

   const {
      status,
      mutate
    } = useMutation({
      mutationFn: API,
      
      onError: () => {
        togglePopup('Something went wring', 'ERROR');
      },
      onSuccess: newSlide => {
        queryClient.setQueryData(['cards', id], newSlide);
        togglePopup('Card created', 'SUCCESS');

        queryClient.refetchQueries({
            queryKey: ['cards'],
        });
      }
    })

   document.querySelectorAll('.color').forEach((color) => {

      color.addEventListener('click', () => {
         document.querySelectorAll('.color').forEach((color) => {
            color.classList.remove('color-select-active')
         })

         color.classList.add('color-select-active')
         
      })
   })

   function createImagePreview(e: HTMLInputElement) {
      if(e.files!.length > 0) {
         const src = URL.createObjectURL(e.files![0]);
         image.current!.src = src;
      }else {
         image.current!.src = 'https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=';
      }
   
   }
   
   return(
        <Modal>
            {status === 'loading' ? <Loader /> :
            <motion.div
         
         initial={slideInitial}
         animate={slideAnimate}
         style={{
            backgroundColor: colors[colorIndex].colorHex
         }} className="slide-modal modal--wrapper">
            <div className="thumbnail-image-wrapper">
               <input ref={imageInput} onChange={(e) => {                  
                  createImagePreview((e.target as HTMLInputElement))
                
                  
               }} type="file" id="card-upload" hidden/>
               <label htmlFor="card-upload" className='card-upload'>Choose File</label>

               <img ref={image} src="https://images.unsplash.com/photo-1458222960031-58c2a8f3ae50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="slide-thumbnail-image" className="thumbnail-image" />
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
                  mutate({
                     url:`slide/create`,
                     method: 'POST',
                     data: {
                        answer: answer.current!.value || 'Untitled',
                        question: question.current!.value || 'Untitled',
                        tags: JSON.stringify([]),
                        image: imageInput.current!.files![0],
                        groupId: id
                     },
                     headers: {
                        authorization: ''
                     }
                  })
               }}>Create</button>
            </div>
            </motion.div>
            }

        </Modal>
   )
}