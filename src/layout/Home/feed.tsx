import React,{} from 'react'


export default function Feed() {

   return(
    <div className="feed section-spacing">
        <div className="feed-header">

            <header className="feed-titles">
                <h1 className="primary-title m3">Discover</h1>
                <p className="secondary-text m2">Explore the latest uploaded by the community</p> 
            </header>   

            <div className="search-feed-wrapper">
                <input type="search" name="search-feed" className='search-feed' placeholder='Look for something' id="search-feed" />

                <span className='search-icon-wrapper'>
                    <i className="fa-solid fa-magnifying-glass" id='search-icon'></i>     
                </span>       
                </div>

        </div>

        <div className="feed-content">
            <div className="feed-row">
                <div className="feed-item"></div>
                <div className="feed-item"></div>
                <div className="feed-item"></div>
                <div className="feed-item"></div>
            </div>

            <div className="feed-row">
                <div className="feed-item"></div>
                <div className="feed-item"></div>
                <div className="feed-item"></div>
                <div className="feed-item"></div>
            </div>
        </div>
    </div>
   )
}