import { useMutation, useQueryClient } from 'react-query'
import { useLocation, useParams } from 'react-router'
import { useRef, useState, useEffect } from 'react'
import { EditOption } from './editCategories'
import { togglePopup, ColorVariants, changeColor } from '../../../functions/functions'
import { useNavigate } from 'react-router'
import { API } from '../../../functions/API'

import Loader from '../../../components/loader'
import ModalSVGS from '../../../components/modalSvgs'

export default function GroupEdit() {
   const title = useRef<HTMLInputElement | null>(null)
   const description = useRef<HTMLTextAreaElement | null>(null);
   const { state } = useLocation() 
   const { id } = useParams()
   const [colorIndex, setColorIndex] = useState(0)
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   useEffect(() => {
      if(state.item.color) {
         changeColor(ColorVariants.indexOf(state.item.color), state.item.color) 
      }
   }, [])
   
   
   const {
      mutate,
      status
   } = useMutation({
      mutationFn: API,
      mutationKey: ['account', parseInt(id!)],
      onSuccess: (newSlide) => {

         queryClient.setQueryData(['account'], newSlide);
         togglePopup('Changes saved!', 'SUCCESS');
 
         queryClient.refetchQueries({
             queryKey: ['account'],
         });
         
         togglePopup('Changes saved', 'SUCCESS')

         navigate(-1);
      },
      onError: () => {
         togglePopup('DEFAULT', 'ERROR')
      }
   })
   
      

    return <EditOption type='group'>

    {status === 'loading' ? <Loader /> : 
      <>
         <form className="add-slide-content">
            <div className="input-wrapper">
               <input 
               ref={title} 
               type="text" 
               defaultValue={state.item.name || ''} 
               onBlur={(e) => {
                    if(!(e.target as HTMLInputElement).value) {
                      document.querySelector('.place-holder')?.classList.remove('placeholder-active')
                    }

                  }} onClick={() => {
                    document.querySelector('.place-holder')?.classList.add('placeholder-active')
                  
                  }}  
                  id='edit-group-input' 
                  className="input add-slide-input" 
                   name='Title' />

               <p className="place-holder placeholder-active">New Folder...</p>
            </div>

            <textarea ref={description} defaultValue={state.item.description || ''} className='input textarea add-slide-textarea'id='add-group-textarea ' placeholder='Description (optional)'></textarea>
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
            
      </>
    }

    <div className="add-slide-btn-wrapper">
         <button className="remove-slide-btn secondary-btn" onClick={(e) => {
                let element = (e.target as HTMLButtonElement);
                
                if(element.innerText === 'Are you sure?') {
                   mutate({
                     url: `group/delete`,
                     params: {id:id},
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

        <button className="add-slide-btn primary-btn " onClick={() => {
         mutate({
            method: 'PUT',
            url: 'group/update',
            params:{},
            data: {
               color: ColorVariants[colorIndex],
               description: description.current!.value || 'Untitled',
               name: title.current!.value || 'Untitled',
               id: parseInt(id!),
               isPublic: true,
            },
            headers: {}            
         })
        }}>Change</button>
    </div>

    <ModalSVGS />

    </EditOption>
}