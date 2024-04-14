import { useState, useEffect, useRef } from 'react'
import { useLocation } from "react-router";
import Modal from "../../../components/modal";
import { useMutation, useQueryClient } from 'react-query';
import { API } from '../../../functions/API';
import { togglePopup } from '../../../functions/functions';
import { noteType } from '../../../functions/types';
import { useParams, useNavigate } from 'react-router';
import Loader from '../../../components/loader';
import { variantDefault } from '../../../functions/functions';
import { motion } from 'framer-motion';
export function View() {
    const { id } = useParams()
    const { state }: {
        state: noteType
    } = useLocation();
    
    const [wordCounter, setWordCounter] = useState<number>(0)
    const text = useRef<HTMLTextAreaElement | null>(null)
    const title = useRef<HTMLHeadingElement | null>(null)
    const navigate = useNavigate()
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
            navigate(-1);
         },
    })

    useEffect(() => {
        setWordCounter(state?.text.split(' ').length)
    }, [])
    
    return(
        <Modal>
            <motion.div
            variants={variantDefault}
            animate={'animate'}
            initial={'intial'}
            className="view-wrapper">
                <h1
                ref={title}
                suppressContentEditableWarning={true}
                contentEditable
                onKeyUp={() => {
                    if(title.current!.innerText.length > 29) {
                        title.current?.classList.add('invalidText');
                    }else {
                        title.current?.classList.remove('invalidText');
                    }
                }}
                className="m2 view-title">{state?.title || ' '}</h1>
        
                {status === 'loading' ? <Loader /> : 
                    <div className="content-wrapper">
                        <textarea
                        ref={text}
                        defaultValue={state?.text || ' '}
                        className="reset content m6"></textarea>
                    </div>

                }

                <footer className="view-footer">
                    <p className="word-counter">{wordCounter} words</p>
                    <button className="primary-btn" onClick={() => {
                         mutate({
                            method: 'PUT',
                            url: `note/update`,
                            params:{},
                            data: {
                                title: title.current!.innerText || '',
                                text: text.current!.value.trim() || '' ,
                                id: state.ID!,
                            },  
                            headers: {
                                authorization: ''
                            }
                        })
                    }}>Save changes</button>
                </footer>
            </motion.div>
        </Modal>
    )

}