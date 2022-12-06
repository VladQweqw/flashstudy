import React,{useEffect} from 'react'
import anime from 'animejs'
import { Outlet } from 'react-router'
import { useNavigate } from 'react-router'

export default function Notes() {
   const navigate = useNavigate();

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
      <div onClick={() => navigate('add')} className="account-slide slide add-slide" id='add-note'>
         <h1>+</h1>
      </div>

      <Card />
      <Card />
      <Card />
      <Card />
      <Card />


    </section>
   )
}




function Card() {
   
   return(
      <div className="account-slide note-slide slide">
         <h1 className="note-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aperiam veniam maiores totam vel dolores hic voluptate sit, consequuntur laborum iure ullam recusandae porro quae!</h1>

         <p className="note-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem suscipit quas iste tempora inventore ipsum qui est corporis, repellendus neque et doloremque excepturi at illo ut sit odit, consequuntur eaque saepe quod ratione deleniti natus? Accusamus quam dignissimos nam recusandae, sint iste officiis minima corporis odio similique ducimus inventore perspiciatis!
         </p>

         <p className="slide-last-updated">last updated: 3 hours ago</p>

      </div>
   )

}