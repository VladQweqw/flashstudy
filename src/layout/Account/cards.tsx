import {useState, useEffect} from 'react'

import anime from 'animejs'
import { Outlet, useNavigate } from 'react-router'
import Context from './actions/context';
import useFetch, { ENDPOINT } from '../../functions/useGetAPI';
import Loader from '../../components/loader';
import { useSearchParams } from 'react-router-dom';
import { groupType } from '../../functions/types';
import { STAGGER_DURATION } from '../../functions/functions';
export default function Cards() {
   const navigate = useNavigate();
   const [isContextMenu, setIsContextMenu] = useState(false);
   const [contextMenuCoords, setContextMenuCoords] = useState<{x: number, y: number, id: number | null}>({x: 0, y: 0, id: null})
   const [params] = useSearchParams();
   
   const { data, loading, error, reFetch} = useFetch<groupType>(); 

   useEffect(() => {
   
      if(params.get('refresh'))  reFetch({
         method:'GET',
         url: ENDPOINT + `slide?gid=${params.get('id')}`,
         data: null,
         headers: {}
      })
      
   }, [params.get('refresh')])

   useEffect(() => {
      reFetch({
         method:'GET',
         url: ENDPOINT + `slide?gid=${params.get('id')}`,
         data: null,
         headers: {}
      })

         anime({
         targets: '.slide',
         delay: anime.stagger(STAGGER_DURATION),
         translateY:['65px', 0],
         opacity: [0, 1],
         duration:  50,
      })

   }, [])
   
   useEffect(() => {
      anime({
         targets: '.slide',
         delay: anime.stagger(STAGGER_DURATION),
         translateY:['65px', 0],
         opacity: [0, 1],
         duration:  STAGGER_DURATION,
      })


   }, [data?.data])
      
   if(loading) return <Loader />
   return(
    <section className="account-slides cards" id='cards'>
      <Outlet />
      {isContextMenu && <Context {...contextMenuCoords} />}
      <div onClick={() => navigate('/account/cards/add', {
         state: {
            groupId: params.get('id')
         }
      })} className="account-slide slide add-slide" id='add-card'>
         <h1>+</h1>
      </div>

      {data?.data.length && data.data.map((item: any, index: number) => {
         return  <Card setIsContextMenu={setIsContextMenu} isContextMenu={isContextMenu} setContextMenuCoords={setContextMenuCoords} />
      })}

      <div className="practice-buttons">
         <button onClick={() => navigate('practice')} className="practice-button primary-btn" id='practice-btn'>Practice</button>
         <button onClick={() => navigate('quiz')} className="practice-button primary-btn" id='quiz-btn'>Quiz</button>
      </div>

    </section>
   )
}




function Card(data: any) {
   const {setIsContextMenu, setContextMenuCoords} = data;

   return(
          <div onClick={() => setIsContextMenu(false)} onContextMenu={(e) => {
            setIsContextMenu(true)

            let x = e.pageX - (e.target as HTMLDivElement).offsetLeft
            let y = e.pageY - (e.target as HTMLDivElement).offsetTop

            setContextMenuCoords({x, y, id: 2}) // change

          }} className="account-slide slide card-slide">

         <div className="slide-text">
            <h1 className="slide-title">Lorem ipsum dolor awdaw  </h1>
            <p className="slide-description">
               Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem, eveniet reprehenderit. Quibusdam perspiciatis cawdwdad wdwaa d a dwa     wad
            </p>
            <p className="slide-last-updated">last edited: 3 hours ago</p>
         </div>

         <div className="slide-thumbnail">
            <div className="card-image-overlay"></div>

            <img src="https://images.unsplash.com/photo-1507917570388-d661984ea008?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80" className='slide-thumbnail-image' alt="slide-thumbnail" />
         </div>

      </div>
   )

}