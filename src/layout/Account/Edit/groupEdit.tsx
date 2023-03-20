import { useMutation, useQueryClient } from 'react-query'
import { useLocation, useParams } from 'react-router'
import { useRef, useState, useEffect } from 'react'
import { EditOption } from './editCategories'
import { togglePopup, ColorVariants, changeColor } from '../../../functions/functions'
import { API } from '../../../functions/API'
import Loader from '../../../components/loader'

export default function GroupEdit() {
   const title = useRef<HTMLInputElement | null>(null)
   const description = useRef<HTMLTextAreaElement | null>(null);
   const { state } = useLocation() 
   const { id } = useParams()
   const [colorIndex, setColorIndex] = useState(0)

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
                     url: `group/delete?id=${id}`,
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

    </EditOption>
}