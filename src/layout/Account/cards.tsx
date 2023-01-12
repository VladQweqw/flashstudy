import {useState, useEffect, useRef} from 'react'

import anime from 'animejs'
import { Outlet, useNavigate } from 'react-router'
import Context from './actions/context';
import useFetch, { ENDPOINT } from '../../functions/API';
import Loader from '../../components/loader';

export default function Cards() {
   const navigate = useNavigate();
   const [isContextMenu, setIsContextMenu] = useState(false);
   const [contextMenuCoords, setContextMenuCoords] = useState<{x: number, y: number, id: number | null}>({x: 0, y: 0, id: null})

   // const { data, loading, error} = useFetch<any>('slide?gid=1', 'GET');
   // console.log(data, error);
 

   useEffect(() => {
      anime({
         targets: '.slide',
         delay: anime.stagger(100),
         translateY:['65px', 0],
         opacity: [0, 1],
         duration:  50,
      })

   }, [])
   
   // return <Loader />
   // if(error) return <h1>err</h1>
   // if(loading) return <Loader />
   return(
    <section className="account-slides cards" id='cards'>
      <Outlet />
      {isContextMenu && <Context {...contextMenuCoords} />}
      <div onClick={() => navigate('/account/cards/add')} className="account-slide slide add-slide" id='add-card'>
         <h1>+</h1>
      </div>

      <Card setIsContextMenu={setIsContextMenu} isContextMenu={isContextMenu} setContextMenuCoords={setContextMenuCoords} />

      <Card setIsContextMenu={setIsContextMenu} isContextMenu={isContextMenu} setContextMenuCoords={setContextMenuCoords} />
      <Card setIsContextMenu={setIsContextMenu} isContextMenu={isContextMenu} setContextMenuCoords={setContextMenuCoords} />
      <Card setIsContextMenu={setIsContextMenu} isContextMenu={isContextMenu} setContextMenuCoords={setContextMenuCoords} />
      
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