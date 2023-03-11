import { useMutation, useQueryClient } from 'react-query'
import { useLocation, useParams } from 'react-router'
import { useRef } from 'react'

import { EditOption } from './editCategories'
import { togglePopup } from '../../../functions/functions'
import { API } from '../../../functions/API'

import Loader from '../../../components/loader'

export default function GroupEdit() {
   const title = useRef<HTMLInputElement | null>(null)
   const description = useRef<HTMLTextAreaElement | null>(null);
   const { state } = useLocation() 
   const { id } = useParams()

   const queryClient = useQueryClient();

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

    return <EditOption type='note'>

    {status === 'loading' ? <Loader /> : 
      <form className="add-slide-content">
         <input ref={title} type="text" defaultValue={state.item.name || ''}  id='edit-group-input' className="input add-slide-input" placeholder='Title'  name='Title' />

         <textarea ref={description} defaultValue={state.item.description || ''} className='input textarea add-slide-textarea'id='add-group-textarea ' placeholder='Description (optional)'></textarea>
      </form>
    
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
               color: '#FFFFFF',
               description: description.current!.value || 'Untitled',
               name: title.current!.value || 'Untitled',
               id: parseInt(id!),
               isPublic: true,
            },
            headers: {}            
         })
        }}>Change</button>
    </div>

    </EditOption>
}