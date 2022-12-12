import {useState} from 'react'

import { motion } from 'framer-motion'

interface practiceQuestion {
    question: string,
    answer: string,
}

const practiceQuestions = [
    {
        question: 'O kurwa daca iti iei',
        answer: 'sa o ti in locul ei',
    },
    {
        question: 'Ii dau cu pula pe tate si ii place, vai ce ma satisface',
        answer: 'gulie',
    },
    {
        question: '210 production pe beat',
        answer: 'ma drogez, bag splif la vena si dansez',
    },
]

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
    initial={{
        translateY: '100%',
        
    }}
    animate={{
        translateY: '0%'
    }}
    
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