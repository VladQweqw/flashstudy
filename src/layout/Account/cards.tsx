import React,{useEffect} from 'react'

import anime from 'animejs'
import { Outlet, useNavigate } from 'react-router'

export default function Cards() {
   const navigate = useNavigate();

   useEffect(() => {
      
      anime({
         targets: '.slide',
         delay: anime.stagger(100),
         translateY:['65px', 0],
         opacity: [0, 1],
         duration:  50,
      })

   }, [])

   return(
    <section className="account-slides cards" id='cards'>
      <Outlet />
      
      <div onClick={() => navigate('/account/cards/add')} className="account-slide slide add-slide" id='add-card'>
         <h1>+</h1>
      </div>

      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
        <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />

      <div className="practice-buttons">
         <button onClick={() => navigate('practice')} className="practice-button primary-btn" id='practice-btn'>Practice</button>
         <button onClick={() => navigate('quiz')} className="practice-button primary-btn" id='quiz-btn'>Quiz</button>
      </div>

    </section>
   )
}




function Card() {

   return(
      <div className="account-slide slide card-slide">
         <span className='slide-options'>
            <i className="fa-solid fa-ellipsis-vertical"></i>
         </span>

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