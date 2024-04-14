import {useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import { slowSlideAniamte, slowSlideInitial } from '../../functions/functions';
import { useParams } from 'react-router';
import { cardType } from '../../functions/types';
import Loader from '../../components/loader';
import { useQuery } from 'react-query';
import { API, ENDPOINT } from '../../functions/API';
import NoContent from '../../components/noContent';

export default function Practice() {
    document.title = 'Practice'
    const [slideIndex, setSlideIndex] = useState(0);    
    const { id } = useParams();

    const {
        status,
        data,
    } = useQuery({
        queryFn: () => API({
            method: 'GET',
            url: `slide`,
            params: {id:id},
            data: null,
            headers: {
                authorization: ''
            }
        }),
        queryKey: ['card', parseInt(id!)]
    })

    function prev() {
        if(slideIndex <= 0) {
            return setSlideIndex(data!.data.length - 1);
        }

        setSlideIndex((slideIdx) => slideIdx - 1);
    }

    function next() {

        if(slideIndex > data!.data.length - 2) {
            return setSlideIndex(0);
        }
        
        setSlideIndex((slideIdx) => slideIdx + 1);
    }
    
   if(status === 'loading') return <Loader />
   if(status === 'error') return <NoContent />
   return(
    <motion.div
    initial={slowSlideInitial}
    animate={slowSlideAniamte}
    
    className="practice">

        <div className="cards">
            {data?.data && data.data.map((practiceQuestion: cardType, index: number) => {
                return <Question data={practiceQuestion} translateIndex={slideIndex} key={index} />
            })}
        </div>

        <div className="practice-controls">
            <span onClick={() => prev()} className="practice-prev practice-control">
                <i className="fa-solid fa-arrow-left"></i>
            </span>
            <span>
                <p>Click on the card to see the answer.</p>
            </span>
            <span onClick={() => next()} className="practice-next practice-control">
                <i className="fa-solid fa-arrow-right"></i>
            </span>
    
        </div>
        
    </motion.div>
   )
}

const Question = (props:{
    data:  cardType,
    translateIndex: number,
    key: number
}): JSX.Element => {
    const [seeAnswer, setSeeAnswer] = useState<boolean>(false)
        
    console.log(props.data.image);
    
    return(
        <div 
        style={{
            transform: `
            translateX(
                calc(-${100 * props.translateIndex}% - ${props.translateIndex}rem)
            )`
        }}
        className="card-wrapper" >

            <div className={`${seeAnswer ? "practice-card flipped-card": "practice-card"}`} onClick={() => {
                setSeeAnswer(!seeAnswer)
            }}>

                <div className="practice-card-front practice-card-side">
                    <h3 className="card-title">Question {props.translateIndex + 1}:</h3>
                    <h1 id="practice-question" className='practice-question'>{props.data.question}</h1>
                  
                </div>

                <div className="practice-card-back practice-card-side">
                    <h3 className="card-title">Answer:</h3>
                    <h1 id="practice-question" className='practice-question'>{props.data.answer}</h1>
                    {props.data.image && 
                        <img className='answer-image' src={`${ENDPOINT}/${props.data.image}`} alt="practice-image" />
                    }
                </div>

            </div>

        </div>
    )

}