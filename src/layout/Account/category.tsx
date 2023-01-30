import {useState, useEffect} from 'react'
import { Outlet, useNavigate, useParams } from 'react-router'
import { useQuery } from 'react-query';
import anime from 'animejs'

import { STAGGER_DURATION } from '../../functions/functions';
import { API } from '../../functions/API';
import { cardType, contextMenuType, slideCategories } from '../../functions/types';
import Context from './actions/context';
import NoContent from '../../components/noContent';
import Loader from '../../components/loader';

import { Card, Exam, Note } from './categories';

export default function Category() {
   const {category, id} = useParams();
   const navigate = useNavigate();

   const [currentCategory, setCurrentCategory] = useState<slideCategories>('slide')
   const [isContextMenu, setIsContextMenu] = useState(false);
   const [contextMenuCoords, setContextMenuCoords] = useState<contextMenuType>({x: 0, y: 0, id: null})
   
    useEffect(() => {
      
        if(category === 'cards') {
            setCurrentCategory('slide')
        }else if(category === 'notes') {
            setCurrentCategory('note') 
        }else if(category === 'exams') {
            setCurrentCategory('exam')
        }

    }, [category])
    

    const {
        status,
        data,
    } = useQuery({
        queryKey: [currentCategory, parseInt(id!)],
        queryFn: () => API({
        url:`${currentCategory}?${currentCategory === 'slide' ? 'gid': 'id'}=${id}`,
        method: 'GET',
        data: null,
        headers: {
            authorization: '' 
        }
        })
    })

    useEffect(() => {
        anime({
        targets: '.slide',
        delay: anime.stagger(STAGGER_DURATION),
        translateY:['65px', 0],
        opacity: [0, 1],
        duration:  50,
     })

  }, [data])

    if(status === 'loading') return <Loader />
    if(status === 'error') return <NoContent />

    return(
        <section className="account-slides cards" id='cards'>
        <Outlet />
        {isContextMenu && <Context {...contextMenuCoords} />}
        <div onClick={() => navigate('create')} className="account-slide slide add-slide">
            <h1>+</h1>
        </div>

         {data?.data && data.data.map((item: any, index: number) => {
            return  <Slide 
            item={item}
            setIsContextMenu={setIsContextMenu}
            setContextMenuCoords={setContextMenuCoords}
            key={index}
            type={currentCategory}
            />
        })}

        {currentCategory === 'slide' && 
        <div className="practice-buttons">
            <button onClick={() => navigate('practice')} className="practice-button primary-btn" id='practice-btn'>Practice</button>
            <button onClick={() => navigate('quiz')} className="practice-button primary-btn" id='quiz-btn'>Quiz</button>
        </div>
        }

        </section>
    )
}

function Slide(data: {
    item: cardType,
    setIsContextMenu: (arg0: boolean) => void,
    setContextMenuCoords: any,
    type: slideCategories
 }): JSX.Element {

    if(data.type === 'slide') return  <Card  {...data} />
    if(data.type === 'note')  return  <Note  {...data} />
    if(data.type === 'exam')  return  <Exam  {...data} />
    
    return <h1>err</h1>
}