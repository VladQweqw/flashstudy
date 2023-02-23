import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router'

import { slideAnimate, slideInitial, togglePopup, singularURLNames } from '../../../functions/functions'
import { cardType, slideCategories, noteType } from '../../../functions/types'
import { API } from '../../../functions/API'
import Modal from '../../../components/modal'
import Loader from '../../../components/loader'

export function CardsEdit() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { category } = useParams();
    const { state }: {
        state: cardType
    } = useLocation();     

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
        
        onError: newSlide => {    
            let cat = singularURLNames(category!)

            queryClient.setQueryData([cat, state.ID!], newSlide);
            togglePopup('Card updated', 'SUCCESS');
    
            queryClient.refetchQueries({
                queryKey: [cat],
            });

            navigate(-1);
        }
       
      })

    if(state == null) {
        navigate('/account')
        return <></>
    }

      return(
    <EditOption type={'slide'}>
        {status === 'loading' ? <Loader /> :
        <>

        <div className="thumbnail-image-wrapper">
            <input ref={imageInput} onChange={(e) => {                  
                  createImagePreview((e.target as HTMLInputElement))
               }} type="file" id="card-upload" hidden/>
            <label htmlFor="card-upload" className='card-upload'>Choose File</label>

            <img ref={image} src="https://images.unsplash.com/photo-1458222960031-58c2a8f3ae50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="slide-thumbnail-image" className="thumbnail-image" />
        </div>

        <form className="add-slide-content">
            <input ref={question} type="text" defaultValue={state.question} id='add-card-input add-slide-input' className="input" placeholder='Title' name='Title' />
            <textarea ref={answer} defaultValue={state.answer} className='input textarea'id='add-card-textarea add-slide-textarea' placeholder='Description (optional)'></textarea>
        </form>

        <div className="add-slide-btn-wrapper">
            <button className="add-slide-btn primary-btn" onClick={() => {
                mutate({
                    url:`slide/update`,
                    method: 'PUT',
                    data: {
                        answer: answer.current!.value,
                        question: question.current!.value,
                        tags: JSON.stringify([]),
                        image: imageInput.current!.files![0] || null,
                        id: state.ID.toString()
                    },
                    headers: {
                        authorization: ''
                    }
                })
            }}>Change</button>
            <button className="remove-slide-btn secondary-btn" onClick={(e) => {
                let element = (e.target as HTMLButtonElement);
                
                if(element.innerText === 'Are you sure?') {
                    mutate({
                        url: `slide/delete?id=${state.ID}`,
                        method:'DELETE',
                        data: null,
                        headers: {
                            authorization: ''
                        }
                    })
                }else {
                    element.innerText = 'Are you sure?'
                }
 
            }}>Delete</button>
        </div>

        </>
        }
    </EditOption>
   )
}

export function NotesEdit() {
    const { state }: {
        state: noteType
    } = useLocation();

    return(
        <EditOption type='note'>

        <form className="add-slide-content">
            <input type="text" defaultValue={state?.title}  id='add-notes-input' className="input add-slide-input" placeholder='Title'  name='Title' />
            <textarea defaultValue={state?.text} className='input textarea add-slide-textarea'id='add-notes-textarea ' placeholder='Description (optional)'></textarea>
        </form>

        <div className="add-slide-btn-wrapper">
            <button className="add-slide-btn primary-btn ">Change</button>
        </div>

        </EditOption>
    )
}

export function ExamsEdit() {
    const { state } = useLocation();
    let daysUntilExam = 0;


    function convertTime(timeInMs: number) {
        let examDate = new Date(
           timeInMs - new Date().getTime()
        ).getTime();
              
        let days = (examDate / (1000 * 60* 60 * 24))
           
        return Math.ceil(days)
     }

    return(
        <EditOption type='exam'>
            <div className="slide-header">
            <input
            onChange={(e: any) => {

               if(e.target.value != '') {
                daysUntilExam = (
                     convertTime(
                        new Date(e.target.value).getTime()
                     )   
                  )                     
               }else {
                daysUntilExam = 0
               }
            }}
            type="date" name="Add exam date" className='exam-date' id="exam-date" />
            <p id="slide-days-left">{
               daysUntilExam < 1 ? 'Today' : `In: ${daysUntilExam} days` 
            }</p>
            </div>

            <form className="add-slide-content">
                <input type="text" id='add-exam-input' className="input add-slide-input" placeholder='Title' name='Title' />

                <textarea className='input textarea add-slide-textarea 'id='add-exam-textarea' placeholder='Description (optional)'></textarea>
            </form>

            <div className="add-slide-btn-wrapper">
            <button className="add-slide-btn primary-btn ">Change</button>
            </div>
        </EditOption>
    )
}

function EditOption(props: {
    children: any,
    type: slideCategories
}) {
    
    
    return(
        <Modal>
        <motion.div
            initial={slideInitial}
            animate={slideAnimate}

            className={`${props.type}-modal modal--wrapper`}>
                
                {props.children}
        </motion.div>
    </Modal>
    )
}