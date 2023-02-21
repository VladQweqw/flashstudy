import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { slideAnimate, slideInitial, togglePopup, singularURLNames } from '../../../functions/functions'
import { useLocation, useParams } from 'react-router'
import { API } from '../../../functions/API'
import { useQueryClient, useMutation } from 'react-query'
import { slideCategories } from '../../../functions/types'

import Modal from '../../../components/modal'
import Loader from '../../../components/loader'

export function CardsUpdate() {
    const { id, category } = useParams(); 
    const { state } = useLocation(); 

    const queryClient = useQueryClient();

    const question = useRef<HTMLInputElement | null>(null);
    const answer = useRef<HTMLTextAreaElement | null>(null);
    const imageInput = useRef<HTMLInputElement | null>(null);
    const image = useRef<HTMLImageElement | null>(null);

    function createImagePreview(e: HTMLInputElement) {
        if(e.files!.length > 0) {
           const src = URL.createObjectURL(e.files![0]);
           image.current!.src = src;
        }else {
           image.current!.src = 'https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=';
        }
     
    }

    const { 
        status,
        mutate
      } = useMutation({
        mutationFn: API,
        
        onError: () => {
          togglePopup('Something went wrong', 'ERROR');
        },
        onSuccess: newSlide => {
          let cat = singularURLNames(category!)

          queryClient.setQueryData([cat, parseInt(id!)], newSlide);
          togglePopup('Card created', 'SUCCESS');
  
          queryClient.refetchQueries({
              queryKey: [cat],
          });
        }
      })

   return(
        <Modal>
            {status === 'loading' ? <Loader /> : 
            <UpdateOption
                type={'slide'}
            >

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

            </UpdateOption>}
        </Modal>
   )
}



function UpdateOption(props: {
    children: any,
    type: slideCategories
}) {
    
    return(
        <motion.div
            initial={slideInitial}
            animate={slideAnimate}
            className={`${props.type}-modal modal--wrapper`}>

            {props.children}    
        </motion.div>
    )

}