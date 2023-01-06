import {useState} from 'react'
import { practiceQuestion } from '../../../functions/types';
import { motion } from 'framer-motion'
import { practiceQuestions } from '../../../functions/functions';
import { slowSlideAniamte, slowSlideInitial } from '../../../functions/functions';

export default function Practice() {
    const [slideIndex, setSlideIndex] = useState(0);

    function prev() {

        if(slideIndex <= 0) {
            return setSlideIndex(practiceQuestions.length -1);
        }

        setSlideIndex((slideIdx) => slideIdx - 1);
    }

    function next() {

        if(slideIndex > practiceQuestions.length - 2) {
            return setSlideIndex(0);
        }
        
        setSlideIndex((slideIdx) => slideIdx + 1);
    }

   return(
    <motion.div
    initial={slowSlideInitial}
    animate={slowSlideAniamte}
    
    className="practice">

        <div className="cards">
            {practiceQuestions.map((practiceQuestion: practiceQuestion, index: number) => {
                return <Question data={practiceQuestion} translateIndex={slideIndex} key={index} />
            })}
        </div>

        <div className="practice-controls">
            <span onClick={() => prev()} className="practice-prev practice-control">
                <i className="fa-solid fa-arrow-left"></i>
            </span>
           
            <span onClick={() => next()} className="practice-next practice-control">
                <i className="fa-solid fa-arrow-right"></i>
            </span>
    
        </div>
        
    </motion.div>
   )
}

const Question = (props:{
    data:  practiceQuestion,
    translateIndex: number,
    key: number
}): JSX.Element => {
    const [seeAnswer, setSeeAnswer] = useState<boolean>(false)
        
    const {question, answer} = props.data;
    
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
                    <h1 id="practice-question" className='practice-question'>{question}</h1>
                </div>

                <div className="practice-card-back practice-card-side">
                    <h3 className="card-title">Answer:</h3>

                    <h1 id="practice-question" className='practice-question'>{answer}</h1>
                </div>

            </div>

        </div>
    )

}