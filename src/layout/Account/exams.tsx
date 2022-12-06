import React,{useEffect} from 'react'
import anime from 'animejs'
import { Outlet } from 'react-router'
import { useNavigate } from 'react-router';

export default function Exams() {
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
    <section className="account-slides exams" id='exams'>
      <Outlet />
      
      <div onClick={() => navigate('add')} className="account-slide slide add-slide" id='add-exam'>
         <h1>+</h1>
      </div>

      <Exam />
      <Exam />
      <Exam />
      <Exam />
      <Exam />


    </section>
   )
}




function Exam() {

   return(
      <div className="account-slide exam-slide slide">
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