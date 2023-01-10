import {useEffect, useRef, useState} from 'react'
import anime from 'animejs'
import { Outlet } from 'react-router'
import { useNavigate } from 'react-router'
import Context from './actions/context';

export default function Notes() {
   const navigate = useNavigate();
   const [isContextMenu, setIsContextMenu] = useState(false);
   const [contextMenuCoords, setContextMenuCoords] = useState<{x: number, y: number, id: number | null}>({x: 0, y: 0, id: null})

   useEffect(() => {
      
      anime({
         targets: '.slide',
         delay: anime.stagger(100),
         translateY:['50px', 0],
         opacity: [0, 1],
         duration:  50,
      })

   }, [])

   return(
    <section className="account-slides notes" id='notes'>
      <Outlet />
      {isContextMenu && <Context {...contextMenuCoords} />}
      
      <div onClick={() => navigate('add')} className="account-slide slide add-slide" id='add-note'>
         <h1>+</h1>
      </div>

      <Note setIsContextMenu={setIsContextMenu} isContextMenu={isContextMenu} setContextMenuCoords={setContextMenuCoords} />
      <Note setIsContextMenu={setIsContextMenu} isContextMenu={isContextMenu} setContextMenuCoords={setContextMenuCoords} />
      <Note setIsContextMenu={setIsContextMenu} isContextMenu={isContextMenu} setContextMenuCoords={setContextMenuCoords} />
      <Note setIsContextMenu={setIsContextMenu} isContextMenu={isContextMenu} setContextMenuCoords={setContextMenuCoords} />


    </section>
   )
}




function Note(data: any) {
   const {setIsContextMenu, setContextMenuCoords} = data;
   
   return(
      <div
      onClick={() => setIsContextMenu(false)} onContextMenu={(e) => {
         setIsContextMenu(true)

         let x = e.pageX - (e.target as HTMLDivElement).offsetLeft
         let y = e.pageY - (e.target as HTMLDivElement).offsetTop

         setContextMenuCoords({x, y, id: 2}) // change

       }}
      className="account-slide note-slide slide">
         <h1 className="note-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aperiam veniam maiores totam vel dolores hic voluptate sit, consequuntur laborum iure ullam recusandae porro quae!</h1>

         <p className="note-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem suscipit quas iste tempora inventore ipsum qui est corporis, repellendus neque et doloremque excepturi at illo ut sit odit, consequuntur eaque saepe quod ratione deleniti natus? Accusamus quam dignissimos nam recusandae, sint iste officiis minima corporis odio similique ducimus inventore perspiciatis!
         </p>

         <p className="slide-last-updated">last updated: 3 hours ago</p>

      </div>
   )

}