import { useQuery } from "react-query"
import { API } from "../../functions/API"
import Loader from "../../components/loader";
import { groupElementType } from "../../functions/types";
import { formatDate } from "../../functions/functions";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion'

export default function Feed() {
    let COUNT = 8;

    const {
        status,
        data
    } = useQuery({
        queryFn: () => API({
            method: 'GET',
            url: `popularGroups`,
            params: {count:COUNT},
            data: {},
            headers: {
                authorization: ''
            }
        }),
        queryKey: ['feed']
    })



    if(status === 'loading') return <Loader />

   return(
    <div className="feed section-spacing">

        <div className="feed-header">

            <header className="feed-titles">
                <h1 className="primary-title m1">Discover</h1>
                <p className="secondary-text m3">Explore the latest uploaded by the community</p> 
            </header>   

            <SearchComponent />
        </div>

        <div className="feed-content">
            {data?.data && data?.data.map((item: groupElementType, index: number) => {
                return <FeedItem data={item} key={index} />
             
            })}

            <span className="see-all"><p className="m4">See all</p></span>
        </div>
    </div>
   )
}

function SearchResult(data: {
    item: groupElementType,
}) {
    const navigate = useNavigate()
    const { item } = data;

    const child = {
        animate: {
            translateY: '0%',
            opacity: 1,
                transition: {
                    duration: .3,
                    staggerChildren: .2,
                }
        },
        exit: {
            translateY: '-100%',
            opacity: 0,
        },
        initial: {
            translateY: '-100%',
            opacity: 0,
        }
    }

    return(
            <motion.div
            variants={child}
            className="search-result" onClick={() => {
                navigate(`/account/view/${item.ID}`)
               }}>
                <h3 className="m4">{item.name}</h3>
                <span className="like-slide">
                    {item.likes} <i className="fa-solid fa-heart"></i>
                </span>
            </motion.div>
    )
}

function SearchComponent() {
    const searchInput = useRef<HTMLInputElement | null>(null)
    
    const {
        status,
        data,
        refetch
    } = useQuery({
        queryFn: () => API({
            method: 'GET',
            url: `search`,
            params: {value:searchInput.current!.value || ''},
            data: {},
            headers: {
                authorization: ''
            }
        }),
        enabled: false,
        queryKey: ['feed', searchInput.current!?.value || 0]
    })
    
    return(
        <div className="search-feed-wrapper">
            <div className="search-feed">
                <input type="search" ref={searchInput} name="search-feed" className='search-feed m4' placeholder='Search something' id="search-feed" />

                <span className='search-icon-wrapper' onClick={() => {
                    refetch();
                }}>
                    <i className="fa-solid fa-magnifying-glass" id='search-icon'></i>     
                </span>   
            </div>    
            <motion.div
                animate={'animate'}
                initial={'initial'}
                exit={'exit'}
                variants={{}}
            className="search-results">
                {status === 'error' && <h1 className="m3">Error</h1>}
                
                    <AnimatePresence>
                    {
                        searchInput?.current!?.value &&
                        data?.data && data.data.map((item: groupElementType, index: number) => {
                            return <SearchResult item={item}  key={index} />
                        })
                    }
                    </AnimatePresence>
                    
                    {data?.data.length === 0 && 
                    <motion.div
                        className="search-result">
                        <h3 className="m4 secondary-text">Nothing found</h3>
                    </motion.div>
                    }
                    
            </motion.div>
        </div>
    )

}

function FeedItem(item: {
    data: groupElementType
}) {
    const navigate = useNavigate();
    const { data } = item;
    let liked = data.isLiked || false;        

    return(
        <div className="feed-item" onClick={() => {
            navigate(`/account/view/${data.ID}`)
           }} >
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
                <h1 className="slide-title m3">{data.name}</h1>
                <p className="slide-description m4">{data.description}</p>
            </div>

            <footer className="feed-item-footer">
                <span className="created m6 tag">{formatDate(new Date(data.UpdatedAt!)).dmhmy()}</span>
            </footer>
            
        </div>
    )

}
