import React,{} from 'react'


export default function Feed() {

   return(
    <div className="feed section-spacing">
        <div className="feed-header">

            <header className="feed-titles">
                <h1 className="primary-title m1">Discover</h1>
                <p className="secondary-text m3">Explore the latest uploaded by the community</p> 
            </header>   

            <div className="search-feed-wrapper">
                <input type="search" name="search-feed" className='search-feed' placeholder='Look for something' id="search-feed" />

                <span className='search-icon-wrapper'>
                    <i className="fa-solid fa-magnifying-glass" id='search-icon'></i>     
                </span>       
                </div>

        </div>

        <div className="feed-content">
            <h1 className="m1">Cal marian</h1>
            <h2 className="m2">Cal marian</h2>
            <h3 className="m3">Cal marian</h3>
            <h4 className="m4">Cal marian</h4>
            <h5 className="m5">Cal marian</h5>
            <h6 className="m6">Cal marian</h6>

        </div>
    </div>
   )
}