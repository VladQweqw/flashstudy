import { useEffect } from 'react'
import anime from 'animejs'
import { useNavigate } from 'react-router'

export default function Error() {
   const navigate = useNavigate();

  useEffect(() => {
   anime.timeline({
      targets: '.error-word',
      translateY: ['100%','0%'],
      opacity:[0, 1],
      delay: anime.stagger(300),
   }).add({
      targets:'.status-message',
      scale:[0, 1],
 
   })
  }, [])
  

   return(
    <div className="error reviews">

      <svg  viewBox="0 0 212 528" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M203.537 168.5C260.324 22.5 13.1344 14 1.99976 0V528C46.5384 521.667 136.284 485.2 138.956 390C142.297 271 146.75 314.5 203.537 168.5Z" fill="#915643" fillOpacity="0.58"/>
        <path id='reviews-left-svg' d="M145.5 204C220.434 69.5751 9.54402 14 3.05176e-05 0V496.5C38.176 490.167 93.7092 499.2 95.9998 404C98.863 285 72.7533 334.5 145.5 204Z" fill="#915643" fillOpacity="0.58"/>
        </svg>
        
        <div className="error-text">
            <div className="error-fullword" >
               <span className="error-word">4</span>
               <span className="error-word">0</span>
               <span className="error-word">4</span>
            </div>

            <h1 className="status-message m2">
               Page not found
            </h1>
            <div className='err-btns'>
               <button onClick={() => navigate(-1)} className="primary-btn">Go back</button>
               <button onClick={() => navigate('/account')} className="secondary-btn">Go home</button>
            </div>
        </div>

        <svg id='reviews-right-svg'  viewBox="0 0 212 528" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.4626 359.5C-48.3242 505.5 198.865 514 210 528V0C165.461 6.33333 75.716 42.8 73.0436 138C69.7032 257 65.2494 213.5 8.4626 359.5Z" fill="#915643" fillOpacity="0.58"/>
        <path d="M66.5 324C-8.43427 458.425 202.456 514 212 528V31.5C173.824 37.8333 118.291 28.8 116 124C113.137 243 139.246 193.5 66.5 324Z" fill="#915643" fillOpacity="0.58"/>
        </svg>

    </div>
   )
}