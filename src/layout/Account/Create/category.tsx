import {useState, useEffect} from 'react'
import { Outlet, useNavigate, useParams } from 'react-router'
import { useQuery } from 'react-query';
import anime from 'animejs'
import { singularURLNames, STAGGER_DURATION } from '../../../functions/functions';
import { API } from '../../../functions/API';
import { slideCategories } from '../../../functions/types';
import NoContent from '../../../components/noContent';
import Loader from '../../../components/loader';

import { Card, Exam, Note } from '../Slides/categories';

export default function Category() {
   const {category, id} = useParams();
   const navigate = useNavigate();
   const [currentCategory, setCurrentCategory] = useState<slideCategories>('card')
   
    useEffect(() => {
        setCurrentCategory(singularURLNames(category!))
    }, [category])
    
    const {
        status,
        data,
    } = useQuery({
        queryKey: [currentCategory, parseInt(id!)],
        queryFn: () => API({
        url:`${currentCategory === 'card' ? 'slide' : currentCategory}?id=${id}`,
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

        <div onClick={() => navigate('create')} className="account-slide slide add-slide">
            <h1>+</h1>
        </div>

         {data?.data && data.data.map((item: any, index: number) => {
            return  <Slide 
            item={item}
            key={index}
            type={currentCategory}
            />
        })}

        {currentCategory === 'card' && 
        <div className="practice-buttons">
            <button onClick={() => navigate('practice')} className="practice-button primary-btn" id='practice-btn'>Practice</button>
            <button onClick={() => navigate('quiz')} className="practice-button primary-btn" id='quiz-btn'>Quiz</button>
        </div>
        }

        </section>
    )
}

function Slide(data: {
    item: any,
    type: slideCategories
 }): JSX.Element {
    document.title = data.type[0].toUpperCase() + data.type.slice(1) + 's'

    if(data.type === 'card') return  <Card  {...data} />
    if(data.type === 'note')  return  <Note  {...data} />
    if(data.type === 'exam')  return  <Exam  {...data} />
    
    return <h1>err</h1>
}