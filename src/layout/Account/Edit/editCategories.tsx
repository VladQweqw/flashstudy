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
    const { category, id } = useParams();
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
            <div className="overlay"></div>

            <input ref={imageInput} onChange={(e) => {                  
                  createImagePreview((e.target as HTMLInputElement))
               }} type="file" id="card-upload" hidden/>
            <label htmlFor="card-upload" className='card-upload'>Choose File</label>

            <img ref={image} onError={(e) => {
                (e.target as HTMLImageElement).src ='https://images.unsplash.com/photo-1458222960031-58c2a8f3ae50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"'
            }} src={`http://trphost.go.ro:8081/${state.image}`} alt="slide-thumbnail-image" className="thumbnail-image" />
        </div>

        <form className="add-slide-content">
            <div className="input-wrapper">
                        <input ref={question} type="text" defaultValue={state.question} id='add-card-input add-slide-input' className="input add-slide-input" name='Title' onBlur={(e) => {
                    if(!(e.target as HTMLInputElement).value) {
                      document.querySelector('.place-holder')?.classList.remove('placeholder-active')
                    }

                  }} onClick={() => {
                    document.querySelector('.place-holder')?.classList.add('placeholder-active')
                  
                  }} />
                        <p className="place-holder placeholder-active">New Card...</p>

                    </div>

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
                const fd = new FormData();

                fd.append('answer', answer.current!.value || 'Untitled')
                fd.append('question', question.current!.value || 'Untitled')
                fd.append('tags', JSON.stringify([]))
                fd.append('image', imageInput.current!.files![0])
                fd.append('id', state.ID.toString() || id!?.toString())


                mutate({
                    url:`slide/update?id=${state.ID}`,
                    method: 'PUT',
                    data: fd,
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
                    <div className="input-wrapper">
                        <input ref={title} type="text" defaultValue={state?.title}  id='add-notes-input' className="input add-slide-input" onBlur={(e) => {
                            if(!(e.target as HTMLInputElement).value) {
                            document.querySelector('.place-holder')?.classList.remove('placeholder-active')
                            }

                        }} onClick={() => {
                            document.querySelector('.place-holder')?.classList.add('placeholder-active')
                        
                        }} name='Title' />

                        <p className="place-holder placeholder-active">New Note...</p>
                    </div>


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
                    <div className="input-wrapper">
                        <input ref={name} type="text" defaultValue={state.name} id='add-exam-input' className="input add-slide-input" name='Title' onBlur={(e) => {
                            if(!(e.target as HTMLInputElement).value) {
                            document.querySelector('.place-holder')?.classList.remove('placeholder-active')
                            }

                        }} onClick={() => {
                            document.querySelector('.place-holder')?.classList.add('placeholder-active')
                        
                        }} />

                        <p className="place-holder placeholder-active">New Exam...</p>
                    </div>

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