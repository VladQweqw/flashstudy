import React,{} from 'react'


export default function Reviews() {

   return(
    <div className="reviews section-spacing">
        
        <header className="reviews-titles">
            <h1 className="primary-title m1">Why to choose us</h1>
            <p className="secondary-text m3">Some thoughts from few of our users</p> 
        </header>   

        <svg  viewBox="0 0 212 528" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M203.537 168.5C260.324 22.5 13.1344 14 1.99976 0V528C46.5384 521.667 136.284 485.2 138.956 390C142.297 271 146.75 314.5 203.537 168.5Z" fill="#915643" fillOpacity="0.58"/>
        <path id='reviews-left-svg' d="M145.5 204C220.434 69.5751 9.54402 14 3.05176e-05 0V496.5C38.176 490.167 93.7092 499.2 95.9998 404C98.863 285 72.7533 334.5 145.5 204Z" fill="#915643" fillOpacity="0.58"/>
        </svg>

        <div className="reviews-wrapper">

            <div className="review ">
                <div className="review-header">
                    <div className="user">
                        <img src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="review-user-image" className="review-user-image" />   
                        <p className="review-user-name m3">Marques</p>
                    </div>   
                    
                    <div className="rating">
                        <span className='rating-score m3'>5/5</span>
                        <i className="fas fa-star"></i>    
                    </div>      
                </div>

                <div className="review-text">
                    <p className='m4'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eos nisi hic cum, veritatis vitae, rem dolorem iure dignissimos ipsum laboriosam ratione quaerat totam saepe iusto in cupiditate natus, odit soluta sunt corporis molestias impedit possimus. Ullam repudiandae quis dicta. Officia impedit, consequatur rerum dolores dolorum tenetur? Praesentium, modi quae?
                    </p>
                </div>
            </div>
            
            <div className="review ">
                <div className="review-header">
                    <div className="user">
                        <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="review-user-image" className="review-user-image" />   
                        <p className="review-user-name m3">David</p>
                    </div>   
                    
                    <div className="rating">
                        <span className='rating-score m3'>4/5</span>
                        <i className="fas fa-star"></i>    
                    </div>      
                </div>

                <div className="review-text">
                    <p className='m4'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eos nisi hic  orem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eos nisi hic consectetur adipisicing elit. Aliquam eos nisi hic consectetur adipisicing elit. Aliquam eos nisi hic
                    </p>
                </div>
            </div>

            <div className="review ">
                <div className="review-header">
                    <div className="user">
                        <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="review-user-image" className="review-user-image" />   
                        <p className="review-user-name m3">Andrew</p>
                    </div>   
                    
                    <div className="rating">
                        <span className='rating-score m3'>5/5</span>
                        <i className="fas fa-star"></i>    
                    </div>      
                </div>

                <div className="review-text">
                    <p className='m4'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eos nisi hic cum, veritatis vitae, rem dolorem iure dignissimos ipsum laboriosam ratione quaerat totam saepe iusto in cupiditate natus, odit soluta sunt corporis molestias impedit possimus. Ullam repudiandae quis dicta. Officia imped
                    </p>
                </div>
            </div>

            <div className="review ">
                <div className="review-header">
                    <div className="user">
                        <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="review-user-image" className="review-user-image" />   
                        <p className="review-user-name m3">Anna</p>
                    </div>   
                    
                    <div className="rating">
                        <span className='rating-score m3'>5/5</span>
                        <i className="fas fa-star"></i>    
                    </div>      
                </div>

                <div className="review-text">
                    <p className='m4'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eos nisi hic cum, veritatis vitae, rem dolorem iure dignissimos ipsum laboriosam ratione quaerat totam saepe iusto in cupiditate natus, odit soluta sunt corporis molestias impedit possimus. Ullam repudiandae quis dicta. Officia impedit, consequatur rerum dolores dolorum tenetur? Praesentium, modi quae? aboriosam ratione quaerat totam saepe iusto in cupiditate natus, odit soluta sunt corporis molestias impedit possimus. Ullam repudiandae quis dicta. Officia impedit, consequatur rerum dolores dolorum tenetur? Praesentium, modi quae? 
                    </p>
                </div>
            </div>


        </div>

        <svg id='reviews-right-svg'  viewBox="0 0 212 528" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.4626 359.5C-48.3242 505.5 198.865 514 210 528V0C165.461 6.33333 75.716 42.8 73.0436 138C69.7032 257 65.2494 213.5 8.4626 359.5Z" fill="#915643" fillOpacity="0.58"/>
        <path d="M66.5 324C-8.43427 458.425 202.456 514 212 528V31.5C173.824 37.8333 118.291 28.8 116 124C113.137 243 139.246 193.5 66.5 324Z" fill="#915643" fillOpacity="0.58"/>
        </svg>
    </div>
   )
}