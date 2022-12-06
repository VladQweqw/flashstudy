import React,{useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router'

import anime from "animejs"

import heroImage1 from '../../assets/images/hero-image-0.png'   
import heroImage2 from '../../assets/images/hero-image-1.png' 
import heroImage3 from '../../assets/images/hero-image-2.png'   
import heroImage4 from '../../assets/images/hero-image-3.png'   

//components
import Feed from './feed'
import Reviews from './reviews'
import Navbar from '../../components/navbar'

const heroImages = ['Easy to manage', 'Remind of you exams','See your progress','Quiz yourself']

export default function Home() {
   const [heroIndex, setHeroIndex] = useState(0)
   const dinamicText = useRef<any>(null)
   const navigate = useNavigate()

   // hero slideshow
   useEffect(() => {
      
      anime({
         targets: '.hero-underline-svg > path',
         strokeDashoffset: [anime.setDashoffset, 0],
         easing: 'linear',
         duration: 400,
         delay: 2000,

      })

      anime({
         targets: '.hero > div',
         duration: 2000,
         delay: anime.stagger(300),
         opacity:[0, 1]
         
      })

      dinamicText.current = anime({
         targets: '#hero-dinamic-text',
         scale:[0,1],
         easing: 'spring(1, 80, 20, 0)'
      })
      

      const intervalId = setInterval(() => {
        
         setHeroIndex((prev) => {
            if(prev > heroImages.length - 2) {
               return 0; 
            }else if(prev < 0) {
               return heroImages.length - 1;
            }

            return prev + 1;
         });
         
      }, 3000)

      return () => clearInterval(intervalId);
   }, [])

   useEffect(() => {
      dinamicText.current.restart()

      document.querySelectorAll('.hero-slideshow-image').forEach((img) => {
         (img as HTMLImageElement).style.transform = `translateY(-${100 * heroIndex}%)`
      })

      document.querySelectorAll('.hero-slideshow-button').forEach((btn) => {
         (btn as HTMLLIElement).classList.remove('hero-slideshow-button-active')
         
      })
      
      document.querySelectorAll('.hero-slideshow-button')[heroIndex].classList.add('hero-slideshow-button-active')
      

   }, [heroIndex])
   

   return(
    <>
      <Navbar />

      <div className="hero">

         <div className="hero-header">
            <h1 id="hero-title" className='m3'>Flash study</h1>
            
            <div>
               <p id="hero-description" className='m2'>Find more materials. 
               <span className='accent accent-font'>Study more efficently. </span> 
               <br />
               Test your abilities.</p>

               <svg className='hero-arrow-svg svg' viewBox="0 0 133 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M64.2021 111.45L79.2479 93.9299L86.8979 115.72L64.2021 111.45ZM42.426 0.755825C87.0413 5.16448 117.382 27.0007 128.003 48.6367C133.322 59.4724 133.779 70.5146 128.09 79.1156C122.421 87.6855 111.045 93.228 94.0263 93.9915L93.847 89.9955C110.193 89.2622 120.069 83.9907 124.754 76.9089C129.417 69.8582 129.327 60.4111 124.412 50.3994C114.565 30.3407 85.6869 9.05012 42.0327 4.73644L42.426 0.755825ZM94.0263 93.9915C60.2617 95.5063 27.6121 84.6179 11.5573 73.8848C7.54495 71.2024 4.41539 68.4298 2.59471 65.7337C0.779597 63.0457 -0.0162296 59.9285 1.82287 57.1868C3.48982 54.7017 6.92202 53.2427 11.4813 52.4884C16.1605 51.7144 22.55 51.5984 30.833 52.2835L30.5032 56.2699C22.3796 55.598 16.356 55.7364 12.1342 56.4348C7.79251 57.1531 5.83587 58.3847 5.14474 59.415C4.62578 60.1887 4.50266 61.4116 5.90967 63.4951C7.31113 65.5705 9.95312 68.0008 13.7804 70.5595C29.084 80.7903 60.8819 91.4744 93.847 89.9955L94.0263 93.9915ZM30.833 52.2835C60.0128 54.6971 81.8998 63.3325 92.1137 73.9352C97.265 79.2827 99.6694 85.3999 98.0022 91.5322C96.3638 97.5585 90.9583 102.934 82.0643 107.284L80.3069 103.691C88.7463 99.5634 92.9417 94.8987 94.1423 90.4828C95.314 86.1731 93.7955 81.4466 89.2329 76.7103C80.0189 67.1455 59.3137 58.653 30.5032 56.2699L30.833 52.2835Z" fill="#D09683"/>
               </svg>
            </div>

         </div>

         <div className="hero-left">
            <p className='secondary-text'>Why ?</p>
            <h1 id='hero-dinamic-text' ref={dinamicText}>{heroImages[heroIndex]}</h1>
         
            <svg className='hero-underline-svg svg' viewBox="0 0 260 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M133.136 47.9628C128.127 20.9876 69.1365 42.9628 102.636 29.4628C136.471 15.828 321.181 17.5578 235.026 13.7644C148.871 9.97101 -91.6022 22.8719 41.1365 8.96279C147.327 -2.16449 228.131 3.52487 248 2.96289" stroke="#D09683" strokeWidth="4"/>
            </svg>

         </div>

         <div className="hero-middle">

            <div className="hero-slideshow">
               <img src={heroImage1} alt="hero-slideshow-image-1" className="hero-slideshow-image" />
               <img src={heroImage2} alt="hero-slideshow-image-2" className="hero-slideshow-image" />
               <img src={heroImage3} alt="hero-slideshow-image-3" className="hero-slideshow-image" />
               <img src={heroImage4} alt="hero-slideshow-image-3" className="hero-slideshow-image" />
            </div>

            <ul className="hero-slideshow-buttons">
               <li className="hero-slideshow-button hero-slideshow-button-active"></li>
               <li className="hero-slideshow-button "></li>
               <li className="hero-slideshow-button "></li>
               <li className="hero-slideshow-button"></li>
            </ul>

         </div>

         <div className="hero-right">
            <h1 className='primary-text' >Give it a try!</h1>
         
         <button className="primary-btn" onClick={() => navigate('/form')} title='Join now' type='button'>Join now</button>

         </div>

         <div className='svg-test'>
         <svg className='hero-wave-svg'  fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M858.475 16.1804C590.369 -18.4957 175.188 10.535 1.10986/ 29.3848V100H1920V8.71698C1890.28 7.37739 1793.54 8.20028 1644.3 22.2085C1457.75 39.7188 1193.61 59.5255 858.475 16.1804Z" fill="#D09683"/>
         <path d="M1061.53 56.9775C1329.63 39.1792 1744.81 54.0799 1918.89 63.7551V100H0V53.1468C29.7161 52.4592 126.458 52.8816 275.699 60.0716C462.251 69.0592 726.394 79.2255 1061.53 56.9775Z" fill="#915643" fillOpacity="0.58"/>
         </svg>
         </div>

      </div>

    <Feed />
    <Reviews />
      
    </>
   )
}