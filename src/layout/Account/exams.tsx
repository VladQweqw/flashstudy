import {useEffect, useState} from 'react'
import anime from 'animejs'
import { Outlet } from 'react-router'
import { useNavigate } from 'react-router';
import Context from './actions/context';
import { STAGGER_DURATION } from '../../functions/functions';

export default function Exams() {
const navigate = useNavigate();
const [isContextMenu, setIsContextMenu] = useState(false);
const [contextMenuCoords, setContextMenuCoords] = useState<{x: number, y: number, id: number | null}>({x: 0, y: 0, id: null})

   useEffect(() => { 
      anime({
         targets: '.slide',
         delay: anime.stagger(100),
         translateY:['50px', 0],
         opacity: [0, 1],
         duration:  STAGGER_DURATION,
      })
   }, [])

   return(
    <section className="account-slides exams" id='exams'>
      <Outlet />
      {isContextMenu && <Context {...contextMenuCoords} />}
      
      <div onClick={() => navigate('create')} className="account-slide slide add-slide" id='add-exam'>
         <h1>+</h1>
      </div>

      <Exam data={[setIsContextMenu, setContextMenuCoords]} />
      <Exam data={[setIsContextMenu, setContextMenuCoords]} />
      <Exam data={[setIsContextMenu, setContextMenuCoords]} />
      <Exam data={[setIsContextMenu, setContextMenuCoords]} />

    </section>
   )
}




function Exam(data: any) {
   const {setIsContextMenu, setContextMenuCoords} = data;

   return(
      <div  onClick={() => setIsContextMenu(false)} onContextMenu={(e) => {
         setIsContextMenu(true)

         let x = e.pageX - (e.target as HTMLDivElement).offsetLeft
         let y = e.pageY - (e.target as HTMLDivElement).offsetTop

         setContextMenuCoords({x, y, id: 2}) // change

       }} className="account-slide exam-slide slide">
            <div className="slide-text">
               <h1 className="slide-title">Test matea awd awd awd </h1>
               <p className="slide-description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi voluptatum libero praesentium. Necessitatibus, hic commodi.</p>

               <p className="slide-last-updated">last updated: 3 hours ago</p>
            </div>
            <div className="slide-right">
               <h1 className="exam-days-number">32</h1>
               <p className="exam-days-number-bottom" >days left</p>
            </div>
      </div>
   )

}