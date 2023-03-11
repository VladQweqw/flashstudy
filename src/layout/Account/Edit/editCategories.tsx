import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
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
        
        onSuccess: newSlide => {    
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
        <button className="add-slide-btn primary-btn" onClick={() => {

                mutate({
                    url:`slide/update?id=${state.ID}`,
                    method: 'PUT',
                    data: {
                        answer: answer.current!.value || state.answer,
                        question: question.current!.value || state.question,
                        tags: JSON.stringify([]),
                        image: imageInput.current!.files![0] || null,
                        
                    },
                    headers: {
                        authorization: ''
                    }
                })
        }}>Change</button>
            
        </div>

        </>
        }
    </EditOption>
   )
}

export function NotesEdit() {
    const { id, slideId } = useParams()
    const { state }: {
        state: noteType
    } = useLocation();
    
    const title = useRef<HTMLInputElement | null>(null)
    const text = useRef<HTMLTextAreaElement | null>(null)

    const queryClient = useQueryClient();
    const {
        mutate,
        status
    } = useMutation({
        mutationFn: API,
        mutationKey: ['note', parseInt(id!)],
        onSuccess: (newSlide) => {

            queryClient.setQueryData(['note', parseInt(id!)], newSlide);
            togglePopup('Changes saved!', 'SUCCESS');
    
            queryClient.refetchQueries({
                queryKey: ['note', parseInt(id!)],
            });
   
   
            togglePopup('Changes saved', 'SUCCESS')
         },
    })

    return(
        <EditOption type='note'>

        {status === 'loading' ? <Loader /> :
            <>
                <form className="add-slide-content">
                    <input ref={title} type="text" defaultValue={state?.title}  id='add-notes-input' className="input add-slide-input" placeholder='Title'  name='Title' />
                    <textarea ref={text} defaultValue={state?.text} className='input textarea add-slide-textarea'id='add-notes-textarea ' placeholder='Description (optional)'></textarea>
                </form>

                <div className="add-slide-btn-wrapper">
                    <button className="remove-slide-btn secondary-btn" onClick={(e) => {
                        let element = (e.target as HTMLButtonElement);
                        
                        if(element.innerText === 'Are you sure?') {
                        mutate({
                            url: `note/delete?id=${slideId}`,
                            method: 'DELETE',
                            data: {},
                            headers: {
                                authorization: ''
                            }
                        })
                        }else {
                            element.innerText = 'Are you sure?'
                        }
        
                    }}>Delete</button>

                    <button className="add-slide-btn primary-btn" onClick={() => {
                        mutate({
                            method: 'PUT',
                            url: `note/update`,
                            data: {
                                title: title.current!.value || '',
                                text: text.current!.value || '' ,
                                id: parseInt(slideId!),
                            },  
                            headers: {
                                authorization: ''
                            }
                        })
                    }}>Change</button>
                </div>
            </>
        }

        </EditOption>
    )
}

export function ExamsEdit() {
    const { state } = useLocation();
    const { id, slideId } = useParams()
    const queryClient = useQueryClient();

    const [daysUntilExam, setDaysUntilExam] = useState(convertTime(new Date(state.examDate).getTime()))

    const name = useRef<HTMLInputElement | null>(null);
    const description = useRef<HTMLTextAreaElement | null>(null);
    const examDate = useRef<HTMLInputElement | null>(null);


    function convertTime(timeInMs: number) {
        let examDate = new Date(
           timeInMs - new Date().getTime()
        ).getTime();
              
        let days = (examDate / (1000 * 60* 60 * 24))
           
        return Math.ceil(days)
    }

    const {
        mutate,
        status
    } = useMutation({
        mutationFn: API,
        mutationKey: ['exam', parseInt(id!)],
        onSuccess: (newSlide) => {

            queryClient.setQueryData(['exam', parseInt(id!)], newSlide);
            togglePopup('Changes saved!', 'SUCCESS');
    
            queryClient.refetchQueries({
                queryKey: ['exam', parseInt(id!)],
            });
   
   
            togglePopup('Changes saved', 'SUCCESS')
         },
    })

    
    return(
        <EditOption type='exam'>

            {status === 'loading' ? <Loader /> :
            <>
            
                <div className="slide-header">
                    <input ref={examDate} defaultValue={state.examDate}
                        onChange={(e: any) => {

                        if(e.target.value != '') {
                            setDaysUntilExam(
                                convertTime(
                                    new Date(e.target.value).getTime()
                                )   
                            )                     
                        }else {
                            setDaysUntilExam(0)
                        }
                        }}
                    type="date" name="Add exam date" className='exam-date' id="exam-date" />
                    <p id="exam-days-left">{
                    daysUntilExam < 1 ? 'Today' : `In: ${daysUntilExam} days` 
                    }</p>
                </div>

                <form className="add-slide-content">
                    <input ref={name} type="text" defaultValue={state.name} id='add-exam-input' className="input add-slide-input" placeholder='Title' name='Title' />

                    <textarea ref={description} defaultValue={state.description} className='input textarea edit-slide-textarea 'id='edit-exam-textarea' placeholder='Description (optional)'></textarea>
                </form>
            </>
            }

            <div className="add-slide-btn-wrapper">
            <button className="remove-slide-btn secondary-btn" onClick={(e) => {
                let element = (e.target as HTMLButtonElement);
                
                if(element.innerText === 'Are you sure?') {
                   mutate({
                     url: `exam/delete?id=${slideId}`,
                     method: 'DELETE',
                     data: {},
                     headers: {
                        authorization: ''
                     }
                   })
                }else {
                    element.innerText = 'Are you sure?'
                }
 
            }}>Delete</button>

            <button className="add-slide-btn primary-btn" onClick={() => {
                mutate({
                    method: 'PUT',
                    url: `exam/update`,
                    data: {
                        description: description.current!.value || " ",
                        name: name.current!.value || " ",
                        examDate: examDate.current!.value || new Date().getTime(),
                        id: parseInt(slideId!),
                    },  
                    headers: {
                        authorization: ''
                    }
                })
            }}>Change</button>
            </div>
        </EditOption>
    )
}

export function EditOption(props: {
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