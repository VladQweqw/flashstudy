import {useState, useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import anime from 'animejs'

import Context from './actions/context';
import { STAGGER_DURATION } from '../../functions/functions';
import NoContent from '../../components/noContent';
import Loader from '../../components/loader';
import { API } from '../../functions/API';

export default function Cards() {
   const navigate = useNavigate();
   const [isContextMenu, setIsContextMenu] = useState(false);
   const [contextMenuCoords, setContextMenuCoords] = useState<{x: number, y: number, id: number | null}>({x: 0, y: 0, id: null})
   const { id } = useParams();

   const {
      status,
      data,
   } = useQuery({
      queryKey: ['account', 'cards', parseInt(id!)],
      queryFn: () => API({
         url:`slide?gid=${id}`,
         method: 'GET',
         data: null,
         headers: {
            authorization: ''
         }
      })
   })
   
   useEffect(() => {
         anime({
         targets: '.slide',
         delay: anime.stagger(STAGGER_DURATION),
         translateY:['65px', 0],
         opacity: [0, 1],
         duration:  50,
      })

   }, [])
   
   if(status === 'loading') return <Loader />
   if(status === 'error') return <NoContent />


   return(
    <section className="account-slides cards" id='cards'>
      <Outlet />
      {isContextMenu && <Context {...contextMenuCoords} />}
      <div onClick={() => navigate('create')} className="account-slide slide add-slide" id='add-card'>
         <h1>+</h1>
      </div>

      {data?.data.length && data.data.map((item: any, index: number) => {
         return  <Card 
         data = {[...item, setIsContextMenu, setContextMenuCoords]}
        
         key={index}
         />
      })}

      <div className="practice-buttons">
         <button onClick={() => navigate('practice')} className="practice-button primary-btn" id='practice-btn'>Practice</button>
         <button onClick={() => navigate('quiz')} className="practice-button primary-btn" id='quiz-btn'>Quiz</button>
      </div>

    </section>
   )
}




function Card(data: any) {
   const {setIsContextMenu, setContextMenuCoords, item } = data;
   
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