import { useQuery } from "react-query"
import { API } from "../../functions/API"
import Loader from "../../components/loader";
import { groupElementType } from "../../functions/types";
import { formatDate } from "../../functions/functions";

export default function Feed() {
    let COUNT = 8;

    const {
        status,
        data
    } = useQuery({
        queryFn: () => API({
            method: 'GET',
            url: `popularGroups?count=${COUNT}`,
            data: {},
            headers: {
                authorization: ''
            }
        }),
        queryKey: ['hash', COUNT]
    })

    if(status === 'loading') return <Loader />

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
            {data.data && data.data.map((item: groupElementType, index: number) => {
                return <>
                <FeedItem data={item} key={index} />
                <FeedItem data={item} key={index} />
                </>
            })}

            <span className="see-all"><p className="m4">See all</p></span>
        </div>
    </div>
   )
}


function FeedItem(item: {
    data: groupElementType
}) {
    const { data } = item;
    let liked = data.isLiked || false;    

    return(
        <div className="feed-item">
            <span className="like-slide" onClick={() => {
                liked = !liked
            }}>
                {data.likes} {liked ? 
                <i className="fa-solid fa-heart"></i>
                :
                <i className="fa-regular fa-heart"></i>
                }
            </span>

            <div className="text-wrapper">
                <h1 className="slide-title m3">{data.name}awdddddddddddddddddddddddddddd</h1>
                <p className="slide-description m4">{data.description} lorem200</p>
            </div>

            <footer className="feed-item-footer">
                <span className="created m6 tag">{formatDate(new Date(data.UpdatedAt!)).dmhmy()}</span>
            </footer>
            
        </div>
    )

}