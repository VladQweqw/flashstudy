import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import { groupType, groupElementType } from '../../../functions/types';
import { formatDate, STAGGER_DURATION } from '../../../functions/functions';
import anime from 'animejs'
import Loader from '../../../components/loader';
import { API } from '../../../functions/API';
import { Outlet } from 'react-router';

import { useQuery } from 'react-query';
import NoContent from '../../../components/noContent';

export default function Groups() {
   const navigate = useNavigate();

   const {
      status,
      data,
   } = useQuery({
      queryKey: ['account'],
      queryFn: () => API({
         method: 'GET',
         url: 'group',
         data: null,
         headers: {
            authorization: '',
         }
      }),
   })

   useEffect(() => {
        anime({
           targets: '.slide',
           delay: anime.stagger(STAGGER_DURATION),
           translateY:['65px', 0],
           opacity: [0, 1],
           duration:  50,
        })
                
     }, [data])

   if(status === 'error') return <NoContent />
   if(status === 'loading') return <Loader />

   return(
    <section className="account-slides groups"  id='groups'>
      <Outlet />

    <div
    onClick={() => navigate('create')}
    className="account-slide slide add-slide" id='add-group'>
       <h1>+</h1>
    </div>

      {
         data?.message === 'success' && data.data.map((item: groupElementType, index: number) => {
            
            return <Group 
            key={index} 
            navigate={navigate} 
            data={item} 
            />
         })
      }

    </section>
   )
}

function Group({
   data,
   navigate,
}: {
   data: groupElementType,
   navigate: any,
}) {     
   
   
    return(
           <div onClickCapture={() => {
            navigate(`cards/${data.ID}`)
           }} onClick={() => navigate('edit') } className="account-slide slide group group-slide">
 
             <h1 className="slide-title">{data?.name} </h1>
             <p className="slide-description">{data?.description}</p>
             
             <p className="slide-last-updated">Last edited: {
               formatDate(new Date(data.UpdatedAt || '')).dmhmy()
             }</p>
       </div>
    )
 
 }